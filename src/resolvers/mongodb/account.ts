import { client } from "../../utils/mongoClient";
import { getAccount } from "eosio-mongodb-queries";

export const account = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }

    console.log(JSON.stringify({query: "mongodb.account", options}));
    const result = await getAccount(client, options.name, options);
    return result;
};
