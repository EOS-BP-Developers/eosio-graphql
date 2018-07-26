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

## Examples

Query an account by `block_num` to get the exact `stake_quanity` at that given referen block number.

![demo](https://user-images.githubusercontent.com/550895/43239894-ff5601ea-9061-11e8-93c3-69c2202e1bba.png)

Query all posts based on an exact `title` match.

![image](https://user-images.githubusercontent.com/550895/43239961-50c16042-9062-11e8-8440-70c410ccbcf4.png)