import { getActions } from "eosio-mongodb-queries";
import { client } from "../utils/mongoClient";
import { abis } from "../abi";

export const abiResolvers: any = {};

for (const name of Object.keys(abis)) {
    const nameQuery = name.replace(".", "");
    const resolver: any = {};

    for (const action of Object.keys(abis[name])) {
        resolver[action] = async (options: any) => {
            if (!client) { throw new Error("MongoClient is not initialized"); }

            // Set required parameters
            options.accounts = options.accounts || [name];
            options.names = options.names || [action];

            // Optional parameters
            if (!options.match) {
                const match: any = {};
                for (const key of Object.keys(options)) {
                    switch (key) {
                    case "block_id":
                    case "block_num":
                    case "trx_id":
                    case "skip":
                    case "limit":
                    case "sort":
                    case "accounts":
                    case "names":
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
            console.log(JSON.stringify({query: `abi.${name}.${action}`, options}));
            const actions = await getActions(client, options);
            return await actions.toArray();
        };
    }
    abiResolvers[nameQuery] = () => resolver;
}
