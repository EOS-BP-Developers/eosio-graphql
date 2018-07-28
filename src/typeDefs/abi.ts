import { templateActionQuery, templateAction } from "./templates";
import { toTitleCase } from "../utils";
import { abis } from "../abi";

// Dynamically load ABI's
export let abiTypeDefs = "";
export let abiQueries = "";
export let abiActions = "";

for (const name of Object.keys(abis)) {
    // Name of Smart Contract
    const nameType = name.split(".").map((n) => toTitleCase(n)).join("");
    const nameQuery = name.replace(".", "");
    abiQueries += `\n${nameQuery}: ${nameType}`;
    abiActions += `\ntype ${nameType} {`;

    for (const action of Object.keys(abis[name])) {
        // Smart Contract + Action Name
        abiTypeDefs += `\ntype ${nameType}${toTitleCase(action)} {`;
        abiActions += `\n     ${action}(`;

        for (const field of Object.keys(abis[name][action])) {
          // Field Name + Data Type
          const type = abis[name][action][field];
          abiTypeDefs += `\n    ${field}: ${type},`;
          abiActions += `\n        ${field}: ${type},`;
        }
        abiActions += templateActionQuery;
        abiActions += `\n    ): ${nameType}${toTitleCase(action)}\n`;
        abiTypeDefs += "\n}\n";
    }
    abiActions += "}\n";
}
