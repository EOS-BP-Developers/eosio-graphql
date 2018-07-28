/**
 * Convert EOSIO Type to GraphQL Type
 *
 * @param {string} type EOSIO Type
 * @returns {string} GraphQL Type
 * @example
 * convertType("uint32") //= Int
 * convertType("account_name") //= String
 */
export function convertType(type: string): "String" | "Int" {
  switch (type) {
    case "name": return "String";
    case "checksum256": return "String";
    case "uint16": return "Int";
    default: return "String";
  }
}

/**
 * Convert to TitleCase
 *
 * @param {string} str String to convert to TitleCase
 * @returns {string} TitleCased
 * @example
 * toTitleCase(foobar) //=> Foobar
 */
export function toTitleCase(str: string) {
  return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}
