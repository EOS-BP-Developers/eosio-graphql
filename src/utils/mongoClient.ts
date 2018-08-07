import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config";

export let client: MongoClient | null = null;

export async function getMongoClient() {
  // Intialize MongoDB Client
  const client: MongoClient = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
  return client
}
