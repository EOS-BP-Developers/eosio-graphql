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
`;

export const templateParamsAction = `
        accounts: [String],
        names: [String],
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

export const templateTypesAction = `
    trx_id: String!
    account: String!
    name: String!
    authorization: [Authorization]
    ${templateTypes}
`;
