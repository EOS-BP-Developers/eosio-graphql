import { MongoClient } from "mongodb";
import { getActions } from "eosio-mongodb-queries";
import { getAbis } from "../abi";
import { isString } from "util";

export function getAbiResolvers({
  abiDir = "",
  mongoClient,
}: {
  abiDir: string,
  mongoClient: MongoClient,
}) {
  const abiResolvers: any = {};
  const abis: any = getAbis({ userDir: abiDir });

  for (const account of Object.keys(abis)) {
    const query = account.replace(".", "");
    const resolver: any = {};

    for (const name of Object.keys(abis[account])) {
      resolver[name] = async (options: any) => {
        // Optional parameters
        if (!options.match) {
          const match: any = {};
          for (const key of Object.keys(options)) {
            switch (key) {
            case "block_id":
            case "block_num":
            case "irreversible":
            case "trx_id":
            case "skip":
            case "limit":
            case "sort":
            case "lte_block_num":
            case "gte_block_num":
            case "match":
              break;
            default:
              match["data." + key] = options[key];
            }
          }
          options.match = match;
        }

        // Set required parameters
        options.account = account;
        options.name = name;

        // Handle Regex queries
        if (options.match && isString(options.match)) { options.match = JSON.parse(options.match); }

        const now = Date.now();
        const cursor = await getActions(mongoClient, options);
        const result = await cursor.toArray();
        const elapsed = Date.now() - now;
        console.log(JSON.stringify({elapsed, query: `abi.${account}.${name}`, options}));
        return result;
      };
    }
    abiResolvers[query] = () => resolver;
  }
}
