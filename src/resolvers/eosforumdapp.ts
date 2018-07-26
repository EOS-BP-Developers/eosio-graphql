import { client } from "./mongodb";
import { getActions } from "eosio-mongodb-queries";

export const eosforumdapp = {
    post: async (options: {
        poster?: string,
        post_uuid?: string,
        content?: string,
        reply_to_poster?: string,
        reply_to_post_uuid?: string,
    } = {}) => {
        if (!client) { throw new Error("MongoClient is not initialized"); }

        // Optional Data Filters
        const data = [];
        if (options.post_uuid) { data.push({"data.post_uuid": options.post_uuid }); }
        if (options.poster) { data.push({"data.poster": options.poster }); }
        if (options.content) { data.push({"data.content": options.content }); }
        if (options.reply_to_poster) { data.push({"data.reply_to_poster": options.reply_to_poster }); }
        if (options.reply_to_post_uuid) { data.push({"data.reply_to_post_uuid": options.reply_to_post_uuid }); }

        // Get Actions
        const result = await getActions(client, Object.assign(options, {
            accounts: ["eosforumdapp"],
            names: ["post"],
            data,
        }));
        return await result.toArray();
    },
    unpost: async (options: {
        poster?: string,
        post_uuid?: string,
    } = {}) => {
        if (!client) { throw new Error("MongoClient is not initialized"); }

        // Optional Data Filters
        const data = [];
        if (options.poster) { data.push({"data.poster": options.poster }); }
        if (options.post_uuid) { data.push({"data.post_uuid": options.post_uuid }); }

        // Get Actions
        const result = await getActions(client, Object.assign(options, {
            accounts: ["eosforumdapp"],
            names: ["unpost"],
            data,
        }));
        return await result.toArray();
    },
    propose: async (options: {
        proposer?: string,
        proposal_name?: string,
        title?: string,
    } = {}) => {
        if (!client) { throw new Error("MongoClient is not initialized"); }

        // Optional Data Filters
        const data = [];
        if (options.proposer) { data.push({"data.proposer": options.proposer }); }
        if (options.proposal_name) { data.push({"data.proposal_name": options.proposal_name }); }
        if (options.title) { data.push({"data.title": options.title }); }

        // Get Actions
        const result = await getActions(client, Object.assign(options, {
            accounts: ["eosforumdapp"],
            names: ["propose"],
            data,
        }));
        return await result.toArray();
    },
    unpropose: async (options: {
        proposer?: string,
        proposal_name?: string,
    } = {}) => {
        if (!client) { throw new Error("MongoClient is not initialized"); }

        // Optional Data Filters
        const data = [];
        if (options.proposer) { data.push({"data.proposer": options.proposer }); }
        if (options.proposal_name) { data.push({"data.proposal_name": options.proposal_name }); }

        // Get Actions
        const result = await getActions(client, Object.assign(options, {
            accounts: ["eosforumdapp"],
            names: ["unpropose"],
            data,
        }));
        return await result.toArray();
    },
    vote: async (options: {
        voter?: string,
        proposer?: string,
        proposal_name?: string,
        proposal_hash?: string,
        vote?: number,
    } = {}) => {
        if (!client) { throw new Error("MongoClient is not initialized"); }

        // Optional Data Filters
        const data = [];
        if (options.voter) { data.push({"data.voter": options.voter }); }
        if (options.proposer) { data.push({"data.proposer": options.proposer }); }
        if (options.proposal_name) { data.push({"data.proposal_name": options.proposal_name }); }
        if (options.proposal_hash) { data.push({"data.proposal_hash": options.proposal_hash }); }
        if (options.vote) { data.push({"data.vote": options.vote }); }

        // Get Actions
        const result = await getActions(client, Object.assign(options, {
            accounts: ["eosforumdapp"],
            names: ["vote"],
            data,
        }));
        return await result.toArray();
    },
    status: async (options: {
        poster?: string,
        post_uuid?: string,
    } = {}) => {
        if (!client) { throw new Error("MongoClient is not initialized"); }

        // Optional Data Filters
        const data = [];
        if (options.poster) { data.push({"data.poster": options.poster }); }
        if (options.post_uuid) { data.push({"data.post_uuid": options.post_uuid }); }

        // Get Actions
        const result = await getActions(client, Object.assign(options, {
            accounts: ["eosforumdapp"],
            names: ["status"],
            data,
        }));
        return await result.toArray();
    },
};
