import * as gql from "graphql";
import { user } from "./Types.gql";
import { ctx } from "../index.d";
import {
  getAllClient,
  getAllTeacher,
  getUser,
} from "../Controller/User.controller";

export default {
  getUser: {
    type: user,
    resolve: (_, __, ctx: ctx) => getUser(ctx.req.cookies.token),
  },
  getAllClient: {
    type: new gql.GraphQLList(user),
    resolve: (_, __, ctx: ctx) => getAllClient(ctx.req.cookies.token),
  },
  getAllTeacher: {
    type: new gql.GraphQLList(user),
    resolve: (_, __, ctx: ctx) => getAllTeacher(ctx.req.cookies.token),
  },
};
