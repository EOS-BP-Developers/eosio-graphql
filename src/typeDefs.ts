import { gql } from "apollo-server";

const eosio = `

type Account {
    name: String!
    block_num: Int!
    stake_quantity: Float!
    stake_net_quantity: Float!
    stake_cpu_quantity: Float!
}

type Eosio {
    account(
        name: String!,
        block_num: Int,
    ): Account
}

type Query {
    eosio: Eosio
}
`;

const actionQuery = `
    trx_id: String,
    block_num: Int,
    block_id: String,
    lte_block_num: Int,
    gte_block_num: Int,
    skip: Int,
    limit: Int,
`;

const authorization = `
type Authorization {
    actor: String
    permission: String
}`;

const action = `
    trx_id: String!
    block_num: Int!
    block_id: String!
    account: String!
    name: String!
    authorization: [Authorization]
`;

const eosforumtest = `
type PostData {
    account: String!
    post_uuid: String!
    title: String!
    content: String!
    reply_to_account: String
    reply_to_post_uuid: String
    certify: Int
    json_metadata: String
}

type UnpostData {
    poster: String!
    post_uuid: String!
}

type VoteData {
    voter: String!
    proposition: String!
    proposition_hash: String
    vote_value: String!
}

type Post {
    ${action}
    data: PostData!
}

type Unpost {
    ${action}
    data: UnpostData!
}

type Vote {
    ${action}
    data: VoteData!
}

type Eosforumtest {
    post(
        post_uuid: String,
        account: String,
        title: String,
        content: String,
        reply_to_account: String,
        reply_to_post_uuid: String,
        ${actionQuery}
    ): [Post]

    unpost(
        poster: String,
        post_uuid: String,
        ${actionQuery}
    ): [Unpost]

    vote(
        voter: String,
        proposition: String,
        proposition_hash: String,
        vote_value: String,
        ${actionQuery}
    ): [Vote]
}

extend type Query {
    eosforumtest: Eosforumtest
}
`;

// The GraphQL schema in string form
export const typeDefs = gql`
    schema {
        query: Query
    }
    ${authorization}
    ${eosio}
    ${eosforumtest}
`;
