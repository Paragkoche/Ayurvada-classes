import {
  access_classes,
  get_classes_all,
  get_classes_client,
  get_videos,
} from "../Controller/Classes.controller";
import { classes, video } from "./Types.gql";
import { ctx } from "../index.d";
import * as gql from "graphql";

export default {
  getClasses: {
    type: new gql.GraphQLList(classes),
    resolve: (_, __, ctx: ctx) => get_classes_client(ctx.req.cookies.token),
  },
  getallClasses: {
    type: new gql.GraphQLList(classes),
    resolve: (_, __, ctx: ctx) => get_classes_all(ctx.req.cookies.token),
  },
  getVideo: {
    type: video,
    ages: {
      id: {
        type: gql.GraphQLID,
      },
    },
    resolve: (_, args, ctx: ctx) => get_videos(ctx.req.cookies.token, args.id),
  },
  pay_to_classes: {
    type: classes,
    ages: {
      id: {
        type: gql.GraphQLID,
      },
    },
    resolve: (_, args, ctx: ctx) =>
      access_classes(ctx.req.cookies.token, args.id),
  },
};
