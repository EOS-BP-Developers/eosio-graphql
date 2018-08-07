import { MongoClient } from "mongodb";
import { getBlocks } from "eosio-mongodb-queries";
import { flattenObject } from "../../utils";
import { isString } from "util";

const getBlocksResolver = ({
  mongoClient
}: {
  mongoClient: MongoClient
}) => async (_: any, options: any) => {
    // Handles simple block match
    if (options.match && options.match.block) { options.match = flattenObject(options.match); }
    // Handle Regex queries
    if (options.match && isString(options.match)) { options.match = JSON.parse(options.match); }

    const now = Date.now();
    const cursor = await getBlocks(mongoClient, options);
    const result = await cursor.toArray();
    const elapsed = Date.now() - now;
    console.log(JSON.stringify({elapsed, query: "mongodb.blocks", options}));
    return result;
};

export default getBlocksResolver;
