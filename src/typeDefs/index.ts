import { gql } from "apollo-server";
import { eosio } from "./eosio";
import { eosforumdapp } from "./eosforumdapp";
import { eosforumtest } from "./eosforumtest";
import { authorization } from "./templates";

// The GraphQL schema in string form
export const typeDefs = gql`
    schema {
        query: Query
    }
    type Query {
        name: String
        version: String
        license: String
        author: String
        homepage: String
        contributors: [String]
    }
    ${authorization}
    ${eosio}
    ${eosforumdapp}
    ${eosforumtest}
`;
