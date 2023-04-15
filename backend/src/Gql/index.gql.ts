import * as gql from "graphql";
import { ctx } from "../index.d";
import user from "./User.q";
import userM from "./User.m";
import classesQ from "./Clsesses.q";
export default {
  schema: new gql.GraphQLSchema({
    query: new gql.GraphQLObjectType({
      name: "Query",
      fields: {
        ...user,
        ...classesQ,
      },
    }),
    mutation: new gql.GraphQLObjectType({
      name: "Mutation",
      fields: {
        ...userM,
      },
    }),
  }),
};
