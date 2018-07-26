export const eosio = `
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

extend type Query {
    eosio: Eosio
}
`;
