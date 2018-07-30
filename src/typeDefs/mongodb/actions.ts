import { templateParamsAction } from "../templates";

export const actions = `
type Actions {
    block_num: Int
    block_id: String
    action_num: Int
    trx_id: String
    cfa: Boolean
    account: String
    name: String
    authorization: [Authorization]
    data: JSON
}

extend type Query {
    actions(
        ${templateParamsAction}
    ): [Actions]
}
`;
