export const account = `
type Account {
    name: String!
    block_num: Int!
    stake_quantity: Float!
    stake_net_quantity: Float!
    stake_cpu_quantity: Float!
}

extend type Query {
    account(
        name: String!,
        lte_block_num: Int
    ): Account
}
`;
