import { gql } from "apollo-server";
import { authorization } from "./templates";
import { mongodb } from "./mongodb";
import { getAbiSchema } from "./abi";

export function defaultBuildSchema({
  scalarSchema = "",
  typeSchema = "",
  querySchema = "",
}) {
  // The GraphQL schema in string form
  return gql`
      ${scalarSchema}

      schema {
          query: Query
      }

      ${typeSchema}

      type Query {
          ${querySchema}
      }
  `;
}

export function getTypeDefs({
  abiDir = "",
  buildSchema = defaultBuildSchema,
}) {
  const {
    abiActions,
    abiQueries,
    abiTypeDefs,
    abiTypeDefsData,
  } = getAbiSchema({ abiDir });
  return buildSchema({
    scalarSchema: `
      scalar JSON
    `,
    typeSchema: `
      ${authorization}
      ${mongodb}

      ${abiActions}
      ${abiTypeDefs}
      ${abiTypeDefsData}
    `,
    querySchema: `
      name: String
      version: JSON
      license: String
      author: String
      homepage: String
      contributors: [String]
      ${abiQueries}
    `,
  });
}
