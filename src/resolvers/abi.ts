import { getActions } from "eosio-mongodb-queries";
import { client } from "../utils/mongoClient";
import { abis } from "../abi";
import { isString } from "util";

export const abiResolvers: any = {};

for (const name of Object.keys(abis)) {
    const nameQuery = name.replace(".", "");
    const resolver: any = {};

    for (const action of Object.keys(abis[name])) {
        resolver[action] = async (options: any) => {
            if (!client) { throw new Error("MongoClient is not initialized"); }

            // Set required parameters
            options.account = options.account || [name];
            options.name = options.name || [action];

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
                    case "account":
                    case "name":
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
            // Handle Regex queries
            if (options.match && isString(options.match)) { options.match = JSON.parse(options.match); }

            const now = Date.now();
            const cursor = await getActions(client, options);
            const result = await cursor.toArray();
            const elapsed = Date.now() - now;
            console.log(JSON.stringify({elapsed, query: `abi.${name}.${action}`, options}));
            return result;
        };
    }
    abiResolvers[nameQuery] = () => resolver;
}
