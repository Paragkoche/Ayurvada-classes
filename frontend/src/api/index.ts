import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export const URL = "https://143.110.250.181:8085";
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
