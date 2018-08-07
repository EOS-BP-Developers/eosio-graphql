# EOSIO GraphQL API

[![Build Status](https://travis-ci.org/EOS-BP-Developers/eosio-graphql.svg?branch=master)](https://travis-ci.org/EOS-BP-Developers/eosio-graphql)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/EOS-BP-Developers/eosio-graphql/master/LICENSE)

Deploy a GraphQL API + MongoDB for the EOSIO blockchain.

## Install

```bash
$ git clone https://github.com/EOS-BP-Developers/eosio-graphql.git
$ cd eosio-graphql
$ npm install
```

## Quickstart

```javascript
$ npm start
🚀 Server ready at http://localhost:4000/graphql
```

## Programmatic use

```js
import { eosGraphQLGateway, gql } from 'eosio-graphql'
import { getMongoClient } from "./mongoClient";

(async () => {

  const {
    startService,
    server, // optional
    service, // optional
  } = eosGraphQLGateway({
    mongoClient: await getMongoClient(),
    host: 'localhost', // optional
    port: 4000, // optional
    buildSchema: ({ // optional
      scalarSchema,
      typeSchema,
      querySchema,
    }) => gql`
      ${scalarSchema}
      # my scalars
      schema {
        query: Query
      }
      ${typeSchema}
      # my types
      type Query {
        ${querySchema}
        # my queries
      }
    `,
    buildResolvers(resolvers) {  // optional
      return Object.assign(resolvers, { /* my resolvers */ });
    },
    abiDir = './my-abi-files/',  // optional
  });

  server.use(/* ... */);  // optional

  service.use(/* ... */);  // optional

  startService();

})();
```

## Contributors

This is made with ♥ by:

- [EOS Nation](https://eosnation.io) (`eosnationftw`)

> Voting on the EOSIO mainnet helps build more awesome tools for the EOS community.


## GraphQL examples

### `eosio.token` transfer

Find most recent 50 transfers from `chainceout11` using the `KARMA` token contract.

```gql
query {
  eosiotoken {
    transfer (
      limit: 50,
      from: "chainceout11"
      contracts: ["therealkarma"],
      sort: {block_num: -1}
    ) {
      data {
        from
        to
        quantity
        memo
      }
    }
  }
}
```

### `eosio` blocks

Find the most recent irreversible blocks.

```
query {
  blocks(sort: { block_num: -1 }, match: { irreversible: true }) {
    block_num
    irreversible
    block {
      producer
    }
  }
}
```

### `eosio` account

Query an account by `name` & `block_num` to get the exact `stake_quanity` at that given referen block number.

```gql
query {
  account(name:"eosnationftw", block_num:6000000) {
    name
    block_num
    stake_quantity
    stake_net_quantity
    stake_cpu_quantity
  }
}
```

### `eosio.forum` post

Query all posts based on an exact `title` match.

```gql
query {
  eosforumtest {
    post(title: "SYSTEM_UPGRADE") {
      block_num
      data {
        account
        post_uuid
        title
        content
      }
    }
  }
}
```

### `eosio.forum` vote

Query all votes based on a particular `proposition`.

```gql
query {
  eosforumtest {
    vote(proposition: "http://ballista/eosconstitution.io/public/proposals/4/articles/61#comment-1") {
      block_num
      data {
        voter
        proposition
        proposition_hash
        vote_value
      }
    }
  }
}
```

