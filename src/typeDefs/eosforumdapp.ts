import { action, actionQuery } from "./templates";

export const eosforumdapp = `
type PostData {
    poster: String
    post_uuid: String
    content: String
    reply_to_poster: String
    reply_to_post_uuid: String
    certify: Int
    json_metadata: String
}

type ProposeData {
    proposer: String
    proposal_name: String
    title: String
    proposal_json: String
}

type UnproposeData {
    proposer: String
    proposal_name: String
}

type ProposalData {
    proposal_name: String
    title: String
    proposal_json: String
}

type UnpostData {
    poster: String
    post_uuid: String
}

type StatusData {
    account: String
    content: String
}

type StatusrowData {
    account: String
    content: String
    updated_at: String
}

type VoteData {
    voter: String
    proposer: String
    proposal_name: String
    proposal_name_hash: String
    vote: Int
    vote_json: String
}

type Post {
    ${action}
    data: PostData!
}

type Unpost {
    ${action}
    data: UnpostData!
}

type Propose {
    ${action}
    data: ProposeData!
}

type Unpropose {
    ${action}
    data: UnproposeData!
}

type Vote {
    ${action}
    data: VoteData!
}

type Status {
    ${action}
    data: StatusData!
}

type Eosforumdapp {
    post(
        poster: String,
        post_uuid: String,
        content: String,
        reply_to_poster: String,
        reply_to_post_uuid: String,
        ${actionQuery}
    ): [Post]

    unpost(
        poster: String,
        post_uuid: String,
        ${actionQuery}
    ): [Unpost]

    propose(
        proposal_name: String,
        title: String,
        ${actionQuery}
    ): [Propose]

    unpropose(
        proposer: String,
        proposal_name: String,
        ${actionQuery}
    ): [Propose]

    vote(
        voter: String,
        proposition: String,
        proposition_hash: String,
        vote_value: String,
        ${actionQuery}
    ): [Vote]

    status(
        account: String,
        content: String,
        ${actionQuery}
    ): [Vote]
}

extend type Query {
    eosforumdapp: Eosforumdapp
}
`;
