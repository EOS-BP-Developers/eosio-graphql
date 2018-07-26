import { action, actionQuery } from "./templates";

export const eosforumtest = `
type PostData2 {
    poster: String
    post_uuid: String
    content: String
    reply_to_poster: String
    reply_to_post_uuid: String
    certify: Int
    json_metadata: String
}

type ProposeData2 {
    proposer: String
    proposal_name: String
    title: String
    proposal_json: String
}

type UnproposeData2 {
    proposer: String
    proposal_name: String
}

type ProposalData2 {
    proposal_name: String
    title: String
    proposal_json: String
}

type UnpostData2 {
    poster: String
    post_uuid: String
}

type StatusData2 {
    account: String
    content: String
}

type StatusrowData2 {
    account: String
    content: String
    updated_at: String
}

type VoteData2 {
    voter: String
    proposer: String
    proposal_name: String
    proposal_hash: String
    vote: Int
    vote_json: String
}

type Post2 {
    ${action}
    data: PostData2!
}

type Unpost2 {
    ${action}
    data: UnpostData2!
}

type Propose2 {
    ${action}
    data: ProposeData2!
}

type Unpropose2 {
    ${action}
    data: UnproposeData2!
}

type Vote2 {
    ${action}
    data: VoteData2!
}

type Status2 {
    ${action}
    data: StatusData2!
}

type Eosforumtest {
    post(
        poster: String,
        post_uuid: String,
        content: String,
        reply_to_poster: String,
        reply_to_post_uuid: String,
        ${actionQuery}
    ): [Post2]

    unpost(
        poster: String,
        post_uuid: String,
        ${actionQuery}
    ): [Unpost2]

    propose(
        proposal_name: String,
        title: String,
        ${actionQuery}
    ): [Propose2]

    unpropose(
        proposer: String,
        proposal_name: String,
        ${actionQuery}
    ): [Propose2]

    vote(
        voter: String,
        proposition: String,
        proposition_hash: String,
        vote_value: String,
        ${actionQuery}
    ): [Vote2]
}

extend type Query {
    eosforumtest: Eosforumtest
}
`;
