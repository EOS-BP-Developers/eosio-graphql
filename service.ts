import { eosGraphQLGateway } from "./";
import { getMongoClient } from "./src/utils/mongoClient";

(async () => {

  eosGraphQLGateway({
    mongoClient: await getMongoClient(),
  }).startService();

})();
