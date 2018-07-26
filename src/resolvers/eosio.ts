import { client } from "./mongodb";
import { getAccount } from "eosio-mongodb-queries";

export const eosio = {
    account: async (options: {
        name: string,
        block_num?: number,
    }) => {
        if (!client) { throw new Error("MongoClient is not initialized"); }

        const result = await getAccount(client, options.name, options);
        return result;
    },
};
