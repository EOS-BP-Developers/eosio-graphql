import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config";

export async function getMongoClient() {
  // Intialize MongoDB Client
  const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
  return client;
}
