import * as fs from "fs";
import * as path from "path";
import { getActions } from "eosio-mongodb-queries";
import { client } from "./mongodb";
import { abis } from "../abi";

// Parse package.json
const pckg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf8"));

const Query: any = {
    // EOSIO GraphQL Metadata
    name: () => pckg.name,
    version: () => pckg.version,
    license: () => pckg.license,
    homepage: () => pckg.homepage,
    author: () => pckg.author,
    contributors: () => pckg.contributors,
};

for (const name of Object.keys(abis)) {
  const nameQuery = name.replace(".", "");
  const resolver: any = {};

  for (const action of Object.keys(abis[name])) {
      resolver[action] = async (options: any) => {
          if (!client) { throw new Error("MongoClient is not initialized"); }
          const match: any = {};
          for (const key of Object.keys(options)) {
              switch (key) {
              case "block_id":
              case "block_num":
              case "trx_id":
              case "skip":
              case "limit":
              case "sort":
              case "contracts":
              case "actions":
              case "lte_block_num":
              case "gte_block_num":
                  break;
              default:
                  match["data." + key] = options[key];
              }
          }
          // TO-DO => Implement Options
          const actions = await getActions(client, {
              accounts: options.contracts || [name],
              names: options.actions || [action],
              block_id: options.block_id,
              block_num: options.block_num,
              trx_id: options.trx_id,
              skip: options.skip,
              sort: options.sort || {block_num: -1},
              limit: options.limit || 25,
              lte_block_num: options.lte_block_num,
              gte_block_num: options.gte_block_num,
              match,
          });
          return await actions.toArray();
      };
  }
  Query[nameQuery] = () => resolver;
}

// The resolvers
export const resolvers: any = {
    Query,
};
