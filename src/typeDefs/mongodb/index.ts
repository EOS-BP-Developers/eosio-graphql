import { account } from "./account";
import { blocks } from "./blocks";
import { actions } from "./actions";
import { account_controls } from "./account_controls";

export const mongodb = `
${account}
${blocks}
${actions}
${account_controls}
`;
