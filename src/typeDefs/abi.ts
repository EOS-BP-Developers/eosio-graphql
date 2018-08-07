import { templateParamsAction, templateTypesAction } from "./templates";
import { toTitleCase } from "../utils";
import { getAbis } from "../abi";

export function getAbiSchema({ abiDir = "" }) {
  // Dynamically load ABI's
  let abiTypeDefs = "";
  let abiTypeDefsData = "";
  let abiQueries = "";
  let abiActions = "";
  const abis: any = getAbis({ userDir: abiDir });

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
      abiActions += templateParamsAction;
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
      abiTypeDefs += templateTypesAction;
      abiTypeDefs += `    data: ${nameType}${toTitleCase(action)}Data`;
      abiTypeDefs += "\n}\n";
    }
  }
  return {
    abiTypeDefs,
    abiTypeDefsData,
    abiQueries,
    abiActions,
  };
}
