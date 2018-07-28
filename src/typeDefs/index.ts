import { gql } from "apollo-server";
import { authorization } from "./templates";
import { abiActions, abiQueries, abiTypeDefs } from "./abi";

// The GraphQL schema in string form
export const typeDefs = gql`
    schema {
        query: Query
    }

    ${abiActions}
    ${abiTypeDefs}
    ${authorization}

    type Query {
        name: String
        version: String
        license: String
        author: String
        homepage: String
        contributors: [String]
        ${abiQueries}
    }
`;
