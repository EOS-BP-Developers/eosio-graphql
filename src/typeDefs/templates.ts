export const templateActionQuery = `
        limit: Int,
        sort: Int,
        trx_id: String,
        block_num: Int,
        block_id: String,
        lte_block_num: Int,
        gte_block_num: Int,
        skip: Int,
`;

export const authorization = `
type Authorization {
    actor: String
    permission: String
}`;

export const templateAction = `
        trx_id: String!
        block_num: Int!
        block_id: String!
        account: String!
        name: String!
        authorization: [Authorization]
`;
