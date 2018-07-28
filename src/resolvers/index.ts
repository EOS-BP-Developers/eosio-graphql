import * as fs from "fs";
import * as path from "path";
import { abis } from "../abi";

// Parse package.json
const pckg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf8"));

// The resolvers
export const resolvers: any = {
    Query: {
        // EOSIO GraphQL Metadata
        name: () => pckg.name,
        version: () => pckg.version,
        license: () => pckg.license,
        homepage: () => pckg.homepage,
        author: () => pckg.author,
        contributors: () => pckg.contributors,
    },
};
