import { templateActionQuery, templateAction } from "./templates";
import { toTitleCase } from "../utils";
import { abis } from "../abi";

// Dynamically load ABI's
export let abiTypeDefs = "";
export let abiTypeDefsData = "";
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
        abiActions += `\n     ${action}(`;

        for (const field of Object.keys(abis[name][action])) {
          // Field Name + Data Type
          const type = abis[name][action][field];
          abiActions += `\n        ${field}: ${type},`;
        }
        abiActions += templateActionQuery;
        abiActions += `    ): [${nameType}${toTitleCase(action)}]\n`;
    }
    abiActions += "}\n";
}

// abiTypeDefsData
for (const name of Object.keys(abis)) {
    const nameType = name.split(".").map((n) => toTitleCase(n)).join("");
    // Actions
    for (const action of Object.keys(abis[name])) {
        abiTypeDefsData += `\ntype ${nameType}${toTitleCase(action)}Data {`;
        // Fields
        for (const field of Object.keys(abis[name][action])) {
          const type = abis[name][action][field];
          abiTypeDefsData += `\n    ${field}: ${type},`;
        }
        abiTypeDefsData += "\n}\n";
    }
}

// abiTypeDefs
for (const name of Object.keys(abis)) {
    const nameType = name.split(".").map((n) => toTitleCase(n)).join("");
    // Actions
    for (const action of Object.keys(abis[name])) {
        abiTypeDefs += `\ntype ${nameType}${toTitleCase(action)} {`;
        abiTypeDefs += templateAction;
        abiTypeDefs += `    data: ${nameType}${toTitleCase(action)}Data`;
        abiTypeDefs += "\n}\n";
    }
}
