import { client } from "./mongodb";
import { getActions } from "eosio-mongodb-queries";

export const eosforumtest = {
    post: async (options: {
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
        const result = await getActions(client, Object.assign(options, {
            accounts,
            names,
            data,
            limit,
        }));
        return await result.toArray();
    },
    unpost: async (options: {
        poster?: string,
        post_uuid?: string,

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
        const names = ["unpost"];
        const limit = options.limit || 25; // default 25

        // Optional Data Filters
        const data = [];
        if (options.poster) { data.push({"data.poster": options.poster }); }
        if (options.post_uuid) { data.push({"data.post_uuid": options.post_uuid }); }

        // Get Actions
        const result = await getActions(client, Object.assign(options, {
            accounts,
            names,
            data,
            limit,
        }));
        return await result.toArray();
    },
    vote: async (options: {
        voter?: string,
        proposition?: string,
        proposition_hash?: string,
        vote_value?: string,

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
        const names = ["vote"];
        const limit = options.limit || 25; // default 25

        // Optional Data Filters
        const data = [];
        if (options.voter) { data.push({"data.voter": options.voter }); }
        if (options.proposition) { data.push({"data.proposition": options.proposition }); }
        if (options.proposition_hash) { data.push({"data.proposition_hash": options.proposition_hash }); }
        if (options.vote_value) { data.push({"data.vote_value": options.vote_value }); }

        // Get Actions
        const result = await getActions(client, Object.assign(options, {
            accounts,
            names,
            data,
            limit,
        }));
        return await result.toArray();
    },
};
