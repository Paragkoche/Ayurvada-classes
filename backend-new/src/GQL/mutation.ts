import * as types from "./Types";
import { Request, Response } from "express";
import * as gql from "graphql";
import DB from "../DB";
import { decode, encode } from "../Util/jwt";
import fs from "fs";
import { decode as pass_decode, encode as pass_encode } from "../Util/Password";
interface ctx {
  req: Request;
  res: Response;
}
export default new gql.GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    make_client: {
      type: types.UserType,
      args: {
        name: { type: gql.GraphQLString },
        email: { type: gql.GraphQLString },
        age: { type: gql.GraphQLString },
        gender: { type: types.Gender_Enum },
        password: { type: gql.GraphQLString },
      },

      resolve: async (_, ags, ctx: ctx) => {
        ags.password = await pass_encode(ags.password);
        const user = await DB.user.create({
          data: {
            // ...ags,

            is_active: true,
            role: "client",
            ...ags,
          },
        });
        // console.log(ctx.req.cookies.token);

        if (!ctx.req.cookies.token)
          ctx.res.cookie("token", encode({ id: user.id }));
        return user;
      },
    },
    make_admin: {
      type: types.UserType,
      args: {
        name: { type: gql.GraphQLString },
        email: { type: gql.GraphQLString },
        age: { type: gql.GraphQLString },
        gender: { type: types.Gender_Enum },
        password: { type: gql.GraphQLString },
      },
      resolve: async (_, ags, ctx: ctx) => {
        ags.password = await pass_encode(ags.password);
        const user = await DB.user.create({
          data: {
            is_active: true,
            role: "admin",
            ...ags,
          },
        });
        ctx.res.cookie("token", encode({ id: user.id }));
        return user;
      },
    },
    make_teacher: {
      type: types.UserType,
      args: {
        name: { type: gql.GraphQLString },
        email: { type: gql.GraphQLString },
        age: { type: gql.GraphQLString },
        gender: { type: types.Gender_Enum },
        password: { type: gql.GraphQLString },
      },
      resolve: async (_, ags, ctx: ctx) => {
        ags.password = await pass_encode(ags.password);
        const user = await DB.user.create({
          data: {
            is_active: true,
            role: "admin",
            ...ags,
          },
        });
        ctx.res.cookie("token", encode({ id: user.id }));
        return user;
      },
    },
    make_classes: {
      type: types.Classes,
      args: {
        photo: {
          type: gql.GraphQLString,
        },
        name: {
          type: gql.GraphQLString,
        },
        pay: {
          type: gql.GraphQLString,
        },
        endOn: {
          type: gql.GraphQLString,
        },
      },
      resolve: async (__, ags, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);
        const user = await DB.user.findUnique({
          where: {
            id: id.id,
          },
        });
        if (!user) return Error("first login");
        if (user.role == "client") return Error("your client");
        return DB.classes.create({
          data: {
            makeby: {
              connect: {
                id: user.id,
              },
            },
            endOn: new Date(ags.endOn).toString(),
            ...ags,
          },
        });
      },
    },
    make_video: {
      type: types.video,
      args: {
        classID: {
          type: gql.GraphQLID,
        },
        title: {
          type: gql.GraphQLString,
        },
        photo: {
          type: gql.GraphQLString,
        },
        disc: {
          type: gql.GraphQLString,
        },
        isZoomMeet: {
          type: gql.GraphQLBoolean,
        },
        isLiveNow: {
          type: gql.GraphQLBoolean,
        },
        link: {
          type: gql.GraphQLString,
        },
      },
      resolve: async (__, ags, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);
        if (!id) return new Error("user not found");

        const user = await DB.user.findUnique({
          where: {
            id: id.id,
          },
        });
        // console.log(user);

        if (!user) return Error("first login");
        if (user.role == "client") return Error("your client");
        const classes = await DB.classes.findUnique({
          where: {
            id: ags.classID,
          },
        });
        // console.log(classes);
        ags.classID = undefined;
        if (!classes) return Error("Classes Not found");
        const time = new Date(Date.now());
        const next48 = time.setDate(time.getDate() + 2);
        const video = await DB.video.create({
          data: {
            is48h: new Date(next48),
            ...ags,
          },
        });
        const cll = await DB.classes.update({
          where: {
            id: classes.id,
          },
          data: {
            lecher: {
              connect: {
                id: video.id,
              },
            },
          },
        });
        return video;
      },
    },
    login: {
      type: types.UserType,
      args: {
        email: { type: gql.GraphQLString },
        password: { type: gql.GraphQLString },
      },
      resolve: async (_, ags, ctx: ctx) => {
        const user = await DB.user.findUnique({
          where: {
            email: ags.email,
          },
        });
        if (!user) return new Error("email invalid");
        let is_pass_correct = await pass_decode(ags.password, user.password);
        if (!is_pass_correct) return new Error("password invalid");
        ctx.res.cookie("token", encode({ id: user.id }));
        return user;
      },
    },
    connect_class: {
      type: types.Classes,
      args: {
        id: {
          type: gql.GraphQLID,
        },
      },
      resolve: async (_, ages, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);
        const user = await DB.user.findUnique({
          where: {
            id: id.id,
          },
        });
        if (!user) return Error("first login");
        if (user.role !== "client") return Error("your not client");
        const classes = await DB.classes.findUnique({
          where: {
            id: ages.id,
          },
        });
        if (!classes) return Error("Classes Not found");
        return await DB.classes.update({
          where: {
            id: classes.id,
          },
          data: {
            PayUser: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      },
    },
    delete_client: {
      type: types.UserType,
      args: {
        id: { type: gql.GraphQLID },
      },
      resolve: async (_, ags, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);

        if (!id) return new Error("Login first");
        const admin = await DB.user.findUnique({
          where: {
            id: id.id,
          },
        });
        if (admin?.role !== "admin") return new Error("Your not admin");
        const user = await DB.user.findUnique({
          where: {
            id: ags.id,
          },
        });
        if (!user) return new Error("USER not fount");
        if (user.role !== "client") return new Error("client not fount");
        const delete_client = DB.user.delete({
          where: {
            id: user.id,
          },
        });
        return delete_client;
      },
    },
    delete_Teacher: {
      type: types.UserType,
      args: {
        id: { type: gql.GraphQLID },
      },
      resolve: async (_, ags, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);

        if (!id) return new Error("Login first");
        const admin = await DB.user.findUnique({
          where: {
            id: id.id,
          },
        });
        if (admin?.role !== "admin") return new Error("Your not admin");
        const user = await DB.user.findUnique({
          where: {
            id: ags.id,
          },
        });
        if (!user) return new Error("USER not fount");
        if (user.role !== "teacher") return new Error("client not fount");

        const delete_client = DB.user.delete({
          where: {
            id: user.id,
          },
        });
        return delete_client;
      },
    },
    update_user: {
      type: types.UserType,
      args: {
        name: { type: gql.GraphQLString },
        id: { type: gql.GraphQLString },
        email: { type: gql.GraphQLString },
        age: { type: gql.GraphQLString },
        gender: { type: types.Gender_Enum },
        password: { type: gql.GraphQLString },
      },
      resolve: async (_, ags, ctx: ctx) => {
        // console.log(ags);

        if (ags.password !== "" && ags.password)
          ags.password = await pass_encode(ags.password);

        // console.log(ags);

        const user = await DB.user.update({
          where: {
            id: ags.id,
          },
          data: {
            // ...ags,

            is_active: true,
            role: "client",
            ...ags,
          },
        });
        // console.log(ctx.req.cookies.token);

        if (!ctx.req.cookies.token)
          ctx.res.cookie("token", encode({ id: user.id }));
        return user;
      },
    },
    delete_video: {
      type: types.video,
      args: {
        id: { type: gql.GraphQLID },
      },
      resolve: async (_, ags, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);

        if (!id) return new Error("Login first");
        const admin = await DB.user.findUnique({
          where: {
            id: id.id,
          },
        });
        if (admin?.role !== "admin") return new Error("Your not admin");

        const video = await DB.video.delete({
          where: {
            id: ags.id,
          },
        });
        if (!video) return new Error("video not delete");
        // console.log("." + video.link);

        fs.unlink("." + video.link || "", (err) => {
          if (err) new Error(err.message);
        });
        return video;
      },
    },
    update_video: {
      type: types.video,
      args: {
        id: { type: gql.GraphQLID },
        title: {
          type: gql.GraphQLString,
        },
        photo: {
          type: gql.GraphQLString,
        },
        disc: {
          type: gql.GraphQLString,
        },
      },
      resolve: async (_, ags, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);

        if (!id) return new Error("Login first");
        const admin = await DB.user.findUnique({
          where: {
            id: id.id,
          },
        });
        if (admin?.role !== "admin") return new Error("Your not admin");
        return DB.video.update({
          where: {
            id: ags.id,
          },
          data: {
            ...ags,
          },
        });
      },
    },
    delete_classes: {
      type: types.Classes,
      args: {
        id: { type: gql.GraphQLID },
      },
      resolve: async (_, ags, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);

        if (!id) return new Error("Login first");
        const admin = await DB.user.findUnique({
          where: {
            id: id.id,
          },
        });
        if (admin?.role !== "admin") return new Error("Your not admin");
        return DB.classes.delete({
          where: {
            id: ags.id,
          },
        });
      },
    },
    update_classes: {
      type: types.Classes,
      args: {
        id: { type: gql.GraphQLID },
        photo: {
          type: gql.GraphQLString,
        },
        name: {
          type: gql.GraphQLString,
        },
        pay: {
          type: gql.GraphQLString,
        },
        endOn: {
          type: gql.GraphQLString,
        },
      },
      resolve: async (_, ags, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);
        const user = await DB.user.findUnique({
          where: {
            id: id.id,
          },
        });
        if (!user) return Error("first login");
        if (user.role == "client") return Error("your client");
        return DB.classes.update({
          where: {
            id: ags.id,
          },
          data: {
            endOn: new Date(ags.endOn).toString(),
            ...ags,
          },
        });
      },
    },
  }),
});
