import { client } from "../utils/mongoClient";
import { getAccount, getBlocks } from "eosio-mongodb-queries";

export const mongodbResolvers: any = {};

mongodbResolvers.account = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }
    const result = await getAccount(client, options.name, options);
    return result;
};

mongodbResolvers.blocks = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }
    const result = await getBlocks(client, options);
    return await result.toArray();
};
