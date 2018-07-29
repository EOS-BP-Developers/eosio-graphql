import { templateParams, templateTypes } from "./templates";

export const mongodb = `
type Account {
    name: String!
    block_num: Int!
    stake_quantity: Float!
    stake_net_quantity: Float!
    stake_cpu_quantity: Float!
}

type Block {
    timestamp: String
    producer: String
    confirmed: Int
    previous: String
    transaction_mroot: String
    action_mroot: String
    schedule_version: Int
    new_producers: [JSON]
    header_extensions: [JSON]
    producer_signature: String
    transactions: [JSON]
    block_extensions: [JSON]
}

type Blocks {
    block_id: String
    block: Block
    block_num: Int
    irreversible: Boolean
    in_current_chain: Boolean
    validated: Boolean
}


extend type Query {
    account( name: String!, block_num: Int ): Account
    blocks(
        ${templateParams}
    ): [Blocks]
}
`;
