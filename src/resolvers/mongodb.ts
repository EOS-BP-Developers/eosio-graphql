import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../../config";

export let client: MongoClient | null = null;

// Intialize MongoDB Client
(async () => {
    if (!client) {
        client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
    }
})();
