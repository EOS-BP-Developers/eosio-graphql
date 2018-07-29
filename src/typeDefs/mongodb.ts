import { templateParams, templateTypes } from "./templates";

export const mongodb = `
type Account {
    name: String!
    block_num: Int!
    stake_quantity: Float!
    stake_net_quantity: Float!
    stake_cpu_quantity: Float!
}

type Blocks {
    ${templateTypes}
}

extend type Query {
    account( name: String!, block_num: Int ): Account
    blocks(
        ${templateParams}
    ): [Blocks]
}
`;
