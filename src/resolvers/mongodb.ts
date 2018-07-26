import { MongoClient } from "mongodb";

export let client: MongoClient | null = null;

// Intialize MongoDB Client
(async () => {
    if (!client) {
        client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
    }
})();
