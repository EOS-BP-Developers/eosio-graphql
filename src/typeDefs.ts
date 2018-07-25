import { gql } from "apollo-server";

const eosio = `
# eosio account
type Account {
    name: String!
    block_num: Int!
    stake_quantity: Float!
    stake_net_quantity: Float!
    stake_cpu_quantity: Float!
}

type Query {
    # eosio
    account(
        name: String!,
        lte_block_num: Int,
        gte_block_num: Int,
    ): Account
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

const eosioForum = `
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

# eosio.forum post
type Post {
    ${action}
    data: PostData!
}

extend type Query {
    # eosio.forum
    posts(
        post_uuid: String,
        account: String,
        title: String,
        content: String,
        reply_to_account: String,
        reply_to_post_uuid: String,
        ${actionQuery}
    ): [Post]
}
`;

// The GraphQL schema in string form
export const typeDefs = gql`
    schema {
        query: Query
    }
    ${authorization}
    ${eosio}
    ${eosioForum}
`;
