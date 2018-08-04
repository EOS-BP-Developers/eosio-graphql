import { templateParamsBlocks } from "../templates";

export const actions = `
type Actions {
    action_num: Int
    trx_id: String
    cfa: Boolean
    account: String
    name: String
    authorization: [Authorization]
    data: JSON
    """
    $graphLookup => transactions
    """
    irreversible: Boolean
    transaction_header: JSON
    signing_keys: JSON
    signatures: JSON
    block_num: Int
    block_id: String
}

extend type Query {
    actions(
        trx_id: String,
        account: [String],
        name: [String],
        ${templateParamsBlocks}
    ): [Actions]
}
`;
