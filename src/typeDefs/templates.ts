export const templateParams = `
        limit: Int,
        skip: Int,
        sort: Int,
        block_num: Int,
        block_id: String,
        lte_block_num: Int,
        gte_block_num: Int,
`;

export const templateParamsAction = `
        contracts: [String],
        actions: [String],
        trx_id: String,
        ${templateParams}
`;

export const authorization = `
type Authorization {
    actor: String
    permission: String
}`;

export const templateTypes = `
    block_num: Int!
    block_id: String!
    authorization: [Authorization]
`;

export const templateTypesAction = `
    trx_id: String!
    account: String!
    name: String!
    ${templateTypes}
`;
