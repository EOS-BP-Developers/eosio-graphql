import { templateParams } from "../templates";

export const account_controls = `
type AccountControls {
    controlled_account: String
    controlled_permission: String
    controlling_account: String
    createdAt: String
}

extend type Query {
    account_controls(
        ${templateParams}
    ): [AccountControls]
}
`;
