import { getActions } from "eosio-mongodb-queries";
import { client } from "./mongodb";
import { abis } from "../abi";
import { resolvers } from "./";

for (const name of Object.keys(abis)) {
  const nameQuery = name.replace(".", "");
  const resolver: any = {};

  for (const action of Object.keys(abis[name])) {
      resolver[action] = async (options: any) => {
          if (!client) { throw new Error("MongoClient is not initialized"); }
          const match = [];
          for (const key of Object.keys(options)) {
              switch (key) {
              case "block_id":
              case "block_num":
              case "trx_id":
              case "skip":
              case "limit":
              case "sort":
              case "lte_block_num":
              case "gte_block_num":
                  break;
              default:
                  const entry: any = {};
                  entry["data." + key] = options[key];
                  match.push(entry);
              }
          }
          // TO-DO => Implement Options
          const actions = await getActions(client, {
              accounts: [name],
              names: [action],
              block_id: options.block_id,
              block_num: options.block_num,
              trx_id: options.trx_id,
              skip: options.skip,
              sort: options.sort || -1,
              limit: options.limit || 25,
              lte_block_num: options.lte_block_num,
              gte_block_num: options.gte_block_num,
              match,
          });
          return await actions.toArray();
      };
  }
  resolvers.Query[nameQuery] = () => resolver;
}
