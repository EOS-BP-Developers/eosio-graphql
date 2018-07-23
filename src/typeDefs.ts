import { gql } from "apollo-server";

const account = `
# Account Details
type Account {
    accountName: String,
    weight: Float,
    ref_block_num: Int,
    stake_net_quantity: Float,
    stake_cpu_quantity: Float,
}
`;

// The GraphQL schema in string form
export const typeDefs = gql`
    ${account}

    # Query
    type Query {
        # Account Details
        account(name: String): Account
    }
`;
