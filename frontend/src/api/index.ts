import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export const URL = "https://api.tanwishlife.com";
export const client = new ApolloClient({
  uri: URL + "/gql",
  cache: new InMemoryCache(),
  credentials: "include",
  typeDefs: gql`
    type Classes_ids {
      id: ID
    }
  `,
});
