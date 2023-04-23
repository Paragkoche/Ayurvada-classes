import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export const URL = "http://localhost:8085";
export const client = new ApolloClient({
  uri: URL + "/gql",
  cache: new InMemoryCache(),
  credentials: "include",
});
