# EOSIO GraphQL API

[![Build Status](https://travis-ci.org/EOS-Nation/eosio-graphql.svg?branch=master)](https://travis-ci.org/EOS-Nation/eosio-graphql)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/EOS-Nation/eosio-graphql/master/LICENSE)

Deploy a GraphQL API + MongoDB for the EOSIO blockchain.

> Vote for [EOS Nation](https://eosnation.io) (eosnationftw) to help build more awesome tools for the EOS community.

## Install

```bash
$ git clone https://github.com/EOS-Nation/eosio-graphql.git
$ cd eosio-graphql
$ npm install
```

## Quickstart

```javascript
$ npm start
🚀 Server ready at http://localhost:4000/graphql
```

## GraphQL examples

- [`eosio` account](#eosio-account)
- [`eosio.forum` post](#eosioforum-post)
- [`eosio.forum` vote](#eosioforum-vote)

Explore & learn the query data schema by expanding the `schema` tab.

![image](https://user-images.githubusercontent.com/550895/43240455-93620602-9064-11e8-8eaa-60e5e6baa342.png)

### `eosio` account

Query an account by `name` & `block_num` to get the exact `stake_quanity` at that given referen block number.

```gql
query {
  eosio {
    account(name:"eosnationftw", block_num:6000000) {
      name
      block_num
      stake_quantity
      stake_net_quantity
      stake_cpu_quantity
    }
  }
}
```

![image](https://user-images.githubusercontent.com/550895/43240376-34ddee70-9064-11e8-83a3-8ebf6129933e.png)

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

![image](https://user-images.githubusercontent.com/550895/43240254-926f5ea8-9063-11e8-8e02-5348424e1c86.png)

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

![image](https://user-images.githubusercontent.com/550895/43240281-abc32128-9063-11e8-8d57-a73f1fd71a86.png)
