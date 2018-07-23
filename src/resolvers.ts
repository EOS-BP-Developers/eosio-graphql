import { MongoClient } from "mongodb";
import { getAccount } from "eosio-mongodb-queries";

let client: MongoClient | null = null;

// The resolvers
export const resolvers: any = {
    Query: {
        account: async (_: any, options: any) => {
            if (!client) { throw new Error("MongoClient is not initialized"); }
            const result = await getAccount(client, options.name);
            return result;
        },
    },
};

// Intialize MongoDB Client
(async () => {
    if (!client) {
        client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
    }
})();
