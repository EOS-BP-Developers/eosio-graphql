import { templateParamsBlocks } from "../templates";

export const blocks = `
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
    blocks(
        ${templateParamsBlocks}
    ): [Blocks]
}
`;
