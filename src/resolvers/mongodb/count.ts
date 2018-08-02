import { client } from "../../utils/mongoClient";
// import { flattenObject } from "../../utils";
import * as queries from "eosio-mongodb-queries";
// import { isString } from "util";

export const count = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }
    const now = Date.now();
    const account_controls = await queries.count(client, "account_controls");
    const accounts = await queries.count(client, "accounts");
    const actions = await queries.count(client, "actions");
    const blocks = await queries.count(client, "blocks");
    const pub_keys = await queries.count(client, "pub_keys");
    const transactions = await queries.count(client, "transactions");

    const elapsed = Date.now() - now;
    console.log(JSON.stringify({elapsed, query: "mongodb.count", options}));
    return {
        account_controls,
        accounts,
        actions,
        blocks,
        pub_keys,
        transactions,
    };
};
