export const count = `
type Count {
    account_controls: Int
    accounts: Int
    actions: Int
    blocks: Int
    pub_keys: Int
    transactions: Int
}

extend type Query {
    count: Count
}
`;
