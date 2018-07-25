import { MongoClient } from "mongodb";
import { getAccount, getActions } from "eosio-mongodb-queries";

let client: MongoClient | null = null;

// The resolvers
export const resolvers: any = {
    Query: {
        account: async (_: any, options: {
            name: string,
            lte_block_num?: number,
            gte_block_num?: number,
        }) => {
            if (!client) { throw new Error("MongoClient is not initialized"); }

            const result = await getAccount(client, options.name, options);
            return result;
        },
        posts: async (_: any, options: {
            post_uuid?: string,
            account?: string,
            title?: string,
            content?: string,
            reply_to_account?: string,
            reply_to_post_uuid?: string,

            // Standard Filters
            skip?: number,
            limit?: number,
            trx_id?: string,
            block_num?: number,
            block_id?: string,
            lte_block_num?: number,
            gte_block_num?: number,
        } = {}) => {
            if (!client) { throw new Error("MongoClient is not initialized"); }

            // Default Parameters
            const accounts = ["eosforumtest"];
            const names = ["post"];
            const limit = options.limit || 25; // default 25

            // Optional Data Filters
            const data = [];
            if (options.post_uuid) { data.push({"data.post_uuid": options.post_uuid }); }
            if (options.account) { data.push({"data.account": options.account }); }
            if (options.title) { data.push({"data.title": options.title }); }
            if (options.content) { data.push({"data.content": options.content }); }
            if (options.reply_to_account) { data.push({"data.reply_to_account": options.reply_to_account }); }
            if (options.reply_to_post_uuid) { data.push({"data.reply_to_post_uuid": options.reply_to_post_uuid }); }

            // Get Actions
            const result = await getActions(client, {
                accounts,
                names,
                data,
                limit,
                skip: options.skip,
                trx_id: options.trx_id,
                block_num: options.block_num,
                block_id: options.block_id,
                lte_block_num: options.lte_block_num,
                gte_block_num: options.gte_block_num,
            });
            return await result.toArray();
        },
    },
};

// Intialize MongoDB Client
(async () => {
    if (!client) {
        client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
    }
})();
