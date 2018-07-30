import { client } from "../../utils/mongoClient";
import { flattenObject } from "../../utils";
import { getBlocks } from "eosio-mongodb-queries";

export const blocks = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }
    if (options.match && options.match.block) { options.match = flattenObject(options.match); }

    console.log(JSON.stringify({query: "mongodb.blocks", options}));
    const result = await getBlocks(client, options);
    return await result.toArray();
};
