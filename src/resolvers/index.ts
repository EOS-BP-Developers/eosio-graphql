import * as fs from "fs";
import * as path from "path";
import { eosio } from "./eosio";
import { eosforumtest } from "./eosforumtest";

// Parse package.json
const pckg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf8"));
const { license, author, contributors, version } = pckg;

// The resolvers
export const resolvers: any = {
    Query: {
        // Metadata
        version: () => version,
        license: () => license,
        author: () => author,
        contributors: () => contributors,

        // Smart Contracts
        eosio: () => eosio,
        eosforumtest: () => eosforumtest,
    },
};
