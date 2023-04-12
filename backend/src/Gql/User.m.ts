import {
  Delete_user,
  Login_admin,
  Login_client,
  Login_teacher,
  Update_user,
  make_admin,
  make_client,
  make_teacher,
} from "../Controller/User.controller";
import { User } from "../DB/User.db";
import { encode } from "../Util/JWT.token";
import { ctx } from "../index.d";
import { user } from "./Types.gql";
import * as gql from "graphql";
export default {
  Add_admin: {
    type: user,
    args: {
      name: {
        type: gql.GraphQLString,
      },
      profile_pic: {
        type: gql.GraphQLString,
      },
      password: {
        type: gql.GraphQLString,
      },
      email: {
        type: gql.GraphQLString,
      },
      constantNo: {
        type: gql.GraphQLString,
      },
      age: {
        type: gql.GraphQLInt,
      },
      gender: {
        type: gql.GraphQLString,
      },
    },
    resolve: async (_, args, ctx: ctx) => {
      const data = await make_admin(args);
      ctx.res.cookie("token", encode({ id: data.id }), {
        expires: new Date(new Date().setDate(new Date().getDate() + 30)),
      });
      return data;
    },
  },
  Login_admin: {
    type: user,
    args: {
      password: {
        type: gql.GraphQLString,
      },
      email: {
        type: gql.GraphQLString,
      },
    },
    resolve: async (_, args, ctx: ctx) => {
      const data: any = await Login_admin(args);

      ctx.res.cookie("token", encode({ id: data.id }), {
        expires: new Date(new Date().setDate(new Date().getDate() + 30)),
      });
      return data;
    },
  },
  Add_teacher: {
    type: user,
    args: {
      name: {
        type: gql.GraphQLString,
      },
      profile_pic: {
        type: gql.GraphQLString,
      },
      password: {
        type: gql.GraphQLString,
      },
      email: {
        type: gql.GraphQLString,
      },
      constantNo: {
        type: gql.GraphQLString,
      },
      age: {
        type: gql.GraphQLInt,
      },
      gender: {
        type: gql.GraphQLString,
      },
    },
    resolve: async (_, args, ctx: ctx) => {
      const data = await make_teacher(args);
      ctx.res.cookie("token", encode({ id: data.id }), {
        expires: new Date(new Date().setDate(new Date().getDate() + 30)),
      });
      return data;
    },
  },
  Login_teacher: {
    type: user,
    args: {
      password: {
        type: gql.GraphQLString,
      },
      email: {
        type: gql.GraphQLString,
      },
    },
    resolve: async (_, args, ctx: ctx) => {
      const data: any = await Login_teacher(args);

      ctx.res.cookie("token", encode({ id: data.id }), {
        expires: new Date(new Date().setDate(new Date().getDate() + 30)),
      });
      return data;
    },
  },
  Add_client: {
    type: user,
    args: {
      name: {
        type: gql.GraphQLString,
      },
      profile_pic: {
        type: gql.GraphQLString,
      },
      password: {
        type: gql.GraphQLString,
      },
      email: {
        type: gql.GraphQLString,
      },
      constantNo: {
        type: gql.GraphQLString,
      },
      age: {
        type: gql.GraphQLInt,
      },
      gender: {
        type: gql.GraphQLString,
      },
    },
    resolve: async (_, args, ctx: ctx) => {
      const data = await make_client(args);
      ctx.res.cookie("token", encode({ id: data.id }), {
        expires: new Date(new Date().setDate(new Date().getDate() + 30)),
      });
      return data;
    },
  },
  Login_client: {
    type: user,
    args: {
      password: {
        type: gql.GraphQLString,
      },
      email: {
        type: gql.GraphQLString,
      },
    },
    resolve: async (_, args, ctx: ctx) => {
      const data: any = await Login_client(args);

      ctx.res.cookie("token", encode({ id: data.id }), {
        expires: new Date(new Date().setDate(new Date().getDate() + 30)),
      });
      return data;
    },
  },
  update_user: {
    type: user,
    args: {
      name: {
        type: gql.GraphQLString,
      },
      profile_pic: {
        type: gql.GraphQLString,
      },
      age: {
        type: gql.GraphQLInt,
      },
      gender: {
        type: gql.GraphQLString,
      },
      is_active: {
        type: gql.GraphQLBoolean,
      },
    },
    resolve: async (_, args, ctx: ctx) => {
      const data: any = await Update_user(ctx.req.cookies.token, args);
      return data;
    },
  },
  delete_user: {
    type: user,
    resolve: async (_, args, ctx: ctx) => {
      const data: any = await Delete_user(ctx.req.cookies.token);
      return data;
    },
  },
};
