import { client } from "../../utils/mongoClient";
import { flattenObject } from "../../utils";
import { getBlocks } from "eosio-mongodb-queries";
import { isString } from "util";

export const blocks = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }
    // Handles simple block match
    if (options.match && options.match.block) { options.match = flattenObject(options.match); }
    // Handle Regex queries
    if (options.match && isString(options.match)) { options.match = JSON.parse(options.match); }

    const now = Date.now();
    const cursor = await getBlocks(client, options);
    const result = await cursor.toArray();
    const elapsed = Date.now() - now;
    console.log(JSON.stringify({elapsed, query: "mongodb.blocks", options}));
    return result;
};
