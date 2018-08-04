export const templateParams = `
        limit: Int,
        skip: Int,
        sort: JSON,
        match: JSON,
`;

export const templateParamsBlocks = `
        ${templateParams}
        block_num: Int,
        block_id: String,
        lte_block_num: Int,
        gte_block_num: Int,
        irreversible: Boolean,
`;

export const templateParamsAction = `
        trx_id: String,
        ${templateParamsBlocks}
`;

export const authorization = `
type Authorization {
    actor: String
    permission: String
}`;

export const templateTypes = `
    block_num: Int!
    block_id: String!
`;

export const templateTypesTransaction = `
    irreversible: Boolean
    transaction_header: JSON
    signing_keys: JSON
    signatures: JSON
    block_num: Int
    block_id: String
`;

export const templateTypesAction = `
    action_num: Int!
    trx_id: String!
    cfa: Boolean!
    account: String!
    name: String!
    authorization: [Authorization]
    ${templateTypesTransaction}
`;
