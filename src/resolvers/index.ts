import * as fs from "fs";
import * as path from "path";
import { eosio } from "./eosio";
import { eosforumdapp } from "./eosforumdapp";
import { eosforumtest } from "./eosforumtest";

// Parse package.json
const pckg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf8"));
const { name, license, author, homepage, contributors, version } = pckg;

// The resolvers
export const resolvers: any = {
    Query: {
        // EOSIO GraphQL Metadata
        name: () => name,
        version: () => version,
        license: () => license,
        homepage: () => homepage,
        author: () => author,
        contributors: () => contributors,

        // Smart Contracts
        eosio: () => eosio,
        eosforumdapp: () => eosforumdapp,
        eosforumtest: () => eosforumtest,
    },
};
