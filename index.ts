import express from "express";
import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server";
import { getTypeDefs, defaultBuildSchema } from "./src/typeDefs/index";
import { getResolvers, defaultBuildResolvers } from "./src/resolvers/index";

export function eosGraphQLGateway(config: any = {}) {
  const {
    host = "localhost",
    port = 4000,
    mongoClient,
    buildSchema = defaultBuildSchema,
    buildResolvers = defaultBuildResolvers,
    abiDir = "",
  } = config;
  const server = new ApolloServer({
    typeDefs: getTypeDefs({
      abiDir,
      buildSchema,
    }),
    resolvers: getResolvers({
      abiDir,
      buildResolvers,
      mongoClient,
    }),
  });
  const app = express();

  function startService() {
    server.applyMiddleware({ app });

    app.listen({ host, port }, () =>
      console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`),
    );
  }

  return {
    server,
    gql,
    service: app,
    startService,
  };
}
