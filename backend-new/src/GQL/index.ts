import * as gql from "graphql";
import Query from "./Query";
import mutation from "./mutation";
export default new gql.GraphQLSchema({
  query: Query,
  mutation: mutation,
});
