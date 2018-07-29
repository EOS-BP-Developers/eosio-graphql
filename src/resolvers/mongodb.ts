import { client } from "../utils/mongoClient";
import { flattenObject } from "../utils";
import { getAccount, getBlocks, getActions } from "eosio-mongodb-queries";

export const mongodbResolvers: any = {};

mongodbResolvers.account = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }

    console.log(JSON.stringify({query: "mongodb.account", options}));
    const result = await getAccount(client, options.name, options);
    return result;
};

mongodbResolvers.blocks = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }
    if (options.match && options.match.block) { options.match = flattenObject(options.match); }

    console.log(JSON.stringify({query: "mongodb.blocks", options}));
    const result = await getBlocks(client, options);
    return await result.toArray();
};

mongodbResolvers.actions = async (_: any, options: any) => {
    if (!client) { throw new Error("MongoClient is not initialized"); }
    if (options.match && options.match.data) { options.match = flattenObject(options.match); }

    console.log(JSON.stringify({query: "mongodb.actions", options}));
    const result = await getActions(client, options);
    return await result.toArray();
};
