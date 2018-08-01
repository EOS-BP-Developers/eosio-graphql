import * as fs from "fs";
import * as path from "path";
import GraphQLJSON from "graphql-type-json";
import { abiResolvers } from "./abi";
import * as mongodbResolvers from "./mongodb";

// Parse package.json
const pckg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf8"));
const mongodbPckg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "node_modules", "eosio-mongodb-queries", "package.json"), "utf8"));

const version = { "eosio-graphql": pckg.version, "eosio-mongodb-queries": mongodbPckg.version };

// EOSIO GraphQL App Metadata
export const Query: any = {
    name: () => pckg.name,
    version: () => version,
    license: () => pckg.license,
    homepage: () => pckg.homepage,
    author: () => pckg.author,
    contributors: () => pckg.contributors,
};

// Load ABI resolvers
Object.assign(Query, abiResolvers);

// Load MongoDB resolvers
Object.assign(Query, mongodbResolvers);

// Final resolvers
export const resolvers: any = {
    Query,
    JSON: GraphQLJSON,
};
