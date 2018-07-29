import * as fs from "fs";
import * as path from "path";
import GraphQLJSON from "graphql-type-json";
import { abiResolvers } from "./abi";
import { mongodbResolvers } from "./mongodb";

// Parse package.json
const pckg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf8"));

// EOSIO GraphQL App Metadata
export const Query: any = {
    name: () => pckg.name,
    version: () => pckg.version,
    license: () => pckg.license,
    homepage: () => pckg.homepage,
    author: () => pckg.author,
    contributors: () => pckg.contributors,
};

// Load ABI resolvers
for (const abiResolver of Object.keys(abiResolvers)) {
    Query[abiResolver] = abiResolvers[abiResolver];
}

// Load MongoDB resolvers
for (const mongodbResolver of Object.keys(mongodbResolvers)) {
    Query[mongodbResolver] = mongodbResolvers[mongodbResolver];
}

// Final resolvers
export const resolvers: any = {
    Query,
    JSON: GraphQLJSON,
};
