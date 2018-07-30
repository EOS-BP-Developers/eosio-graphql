import { client } from "../../utils/mongoClient";
import { flattenObject } from "../../utils";
import { getActions } from "eosio-mongodb-queries";

export const actions = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }
    if (options.match && options.match.data) { options.match = flattenObject(options.match); }

    console.log(JSON.stringify({query: "mongodb.actions", options}));
    const result = await getActions(client, options);
    return await result.toArray();
};
