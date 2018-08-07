import { MongoClient } from "mongodb";
import { getActions } from "eosio-mongodb-queries";
import { flattenObject } from "../../utils";
import { isString } from "util";

const getActionsResolver = ({
  mongoClient
}: {
  mongoClient: MongoClient
}) => async (_: any, options: any) => {
    // Handles simple data match
    if (options.match && options.match.data) { options.match = flattenObject(options.match); }
    // Handle Regex queries
    if (options.match && isString(options.match)) { options.match = JSON.parse(options.match); }

    const now = Date.now();
    const cursor = await getActions(mongoClient, options);
    const result = await cursor.toArray();
    const elapsed = Date.now() - now;
    console.log(JSON.stringify({elapsed, query: "mongodb.actions", options}));
    return result;
};

export default getActionsResolver;
