import { MongoClient } from "mongodb";
import getAccountResolver from "./account";
import getActionsResolver from "./actions";
import getBlocksResolver from "./blocks";
import getCountResolver from "./count";

export function getMongodbResolvers({
  mongoClient,
}: {
  mongoClient: MongoClient
}) {
  if (!mongoClient) { throw new Error("MongoClient is not initialized"); }
  return {
    account: getAccountResolver({ mongoClient }),
    actions: getActionsResolver({ mongoClient }),
    blocks: getBlocksResolver({ mongoClient }),
    count: getCountResolver({ mongoClient }),
  }
}
