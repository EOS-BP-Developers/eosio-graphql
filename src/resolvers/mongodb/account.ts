import { client } from "../../utils/mongoClient";
import { getAccount } from "eosio-mongodb-queries";

export const account = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }

    const now = Date.now();
    const result = await getAccount(client, options.name, options);
    const elapsed = Date.now() - now;
    console.log(JSON.stringify({elapsed, query: "mongodb.account", options}));
    return result;
};
