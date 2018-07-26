import { action, actionQuery } from "./templates";

export const eosforumtest = `
type PostData {
    account: String!
    post_uuid: String!
    title: String!
    content: String!
    reply_to_account: String
    reply_to_post_uuid: String
    certify: Int
    json_metadata: String
}

type UnpostData {
    poster: String!
    post_uuid: String!
}

type VoteData {
    voter: String!
    proposition: String!
    proposition_hash: String
    vote_value: String!
}

type Post {
    ${action}
    data: PostData!
}

type Unpost {
    ${action}
    data: UnpostData!
}

type Vote {
    ${action}
    data: VoteData!
}

type Eosforumtest {
    post(
        post_uuid: String,
        account: String,
        title: String,
        content: String,
        reply_to_account: String,
        reply_to_post_uuid: String,
        ${actionQuery}
    ): [Post]

    unpost(
        poster: String,
        post_uuid: String,
        ${actionQuery}
    ): [Unpost]

    vote(
        voter: String,
        proposition: String,
        proposition_hash: String,
        vote_value: String,
        ${actionQuery}
    ): [Vote]
}

extend type Query {
    eosforumtest: Eosforumtest
}
`;
