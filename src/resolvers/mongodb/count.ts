import { MongoClient } from "mongodb";
import * as queries from "eosio-mongodb-queries";
// import { flattenObject } from "../../utils";
// import { isString } from "util";

const getCountResolver = ({
  mongoClient
}: {
  mongoClient: MongoClient
}) => async (_: any, options: any) => {
    const now = Date.now();
    const account_controls = await queries.count(mongoClient, "account_controls");
    const accounts = await queries.count(mongoClient, "accounts");
    const actions = await queries.count(mongoClient, "actions");
    const blocks = await queries.count(mongoClient, "blocks");
    const pub_keys = await queries.count(mongoClient, "pub_keys");
    const transactions = await queries.count(mongoClient, "transactions");

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

export default getCountResolver;
