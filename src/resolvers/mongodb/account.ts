import { MongoClient } from "mongodb";
import { getAccount } from "eosio-mongodb-queries";

const getAccountResolver = ({
  mongoClient,
}: {
  mongoClient: MongoClient,
}) => async (_: any, options: any) => {
    const now = Date.now();
    const result = await getAccount(mongoClient, options.name, options);
    const elapsed = Date.now() - now;
    console.log(JSON.stringify({elapsed, query: "mongodb.account", options}));
    return result;
};

export default getAccountResolver;
