import * as types from "./Types";
import { Request, Response } from "express";
import * as gql from "graphql";
import DB from "../DB";
import { decode } from "jsonwebtoken";
interface ctx {
  req: Request;
  res: Response;
}
export default new gql.GraphQLObjectType({
  name: "Query",
  fields: () => ({
    get_classes_id: {
      type: types.Classes,
      args: {
        id: {
          type: gql.GraphQLID,
        },
      },
      resolve: async (_, __, ctx: ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");
        const classes = await DB.classes.findUnique({
          where: {
            id: __.id,
          },
        });

        return classes;
      },
    },

    get_classes_by_id: {
      type: types.Classes,
      args: {
        id: {
          type: gql.GraphQLID,
        },
      },
      resolve: async (_, __, ctx: ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");
        const classes = await DB.classes.findUnique({
          where: {
            id: __.id,
          },
          include: {
            PayUser: {
              where: {
                id: user.id,
              },
            },
            lecher: true,
            makeby: true,
          },
        });
        if (classes?.PayUser.length == 0)
          return Error("You not pay for this class");
        return classes;
      },
    },
    //all assess
    get_all_classes: {
      type: new gql.GraphQLList(types.Classes),
      args: {
        skip: {
          type: gql.GraphQLInt,
        },
        take: {
          type: gql.GraphQLInt,
        },
      },

      resolve: (_, __, ctx: ctx) => {
        return DB.classes.findMany({
          skip: __.skip,
          take: __.take,
          include: {
            PayUser: true,
            lecher: true,
            makeby: true,
          },
        });
      },
    },
    //only buy classes
    get_assess_classes: {
      type: new gql.GraphQLList(types.Classes),

      resolve: async (_, __, ctx: ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");

        const R_user = await DB.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            isPayfor: {
              include: {
                lecher: {
                  include: {
                    like: {
                      include: {
                        likeBy: true,
                      },
                    },
                    comment: true,
                    viewby: true,
                  },
                },
              },
            },
          },
        });
        if (!R_user) return Error("first login");
        if (R_user.role != "client") return Error("your not client");
        // console.log(R_user);

        return R_user.isPayfor;
      },
    },
    //only teacher and admin
    get_classes: {
      type: new gql.GraphQLList(types.Classes),
      args: {
        skip: {
          type: gql.GraphQLInt,
        },
        take: {
          type: gql.GraphQLInt,
        },
      },
      resolve: async (_, __, ctx: ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");
        const users = await DB.user.findUnique({ where: { id: user.id } });
        if (!users) return Error("first login");
        if (users.role == "client") return Error("your client");
        return DB.classes.findMany({
          skip: __.skip,
          take: __.take,
          include: {
            PayUser: true,
            lecher: true,
            makeby: true,
          },
        });
      },
    },
    get_teacher: {
      type: new gql.GraphQLList(types.UserType),
      args: {
        skip: {
          type: gql.GraphQLInt,
        },
        take: {
          type: gql.GraphQLInt,
        },
      },
      resolve: async (_, __, ctx: ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");
        const users = await DB.user.findUnique({ where: { id: user.id } });
        if (!users) return Error("first login");
        if (users.role == "client" || users.role == "teacher")
          return Error("your not admin");
        return DB.user.findMany({
          skip: __.skip,
          take: __.take,
          where: {
            role: "teacher",
          },
        });
      },
    }, //only admin make the request
    get_client: {
      type: new gql.GraphQLList(types.UserType),
      args: {
        skip: {
          type: gql.GraphQLInt,
        },
        take: {
          type: gql.GraphQLInt,
        },
      },
      resolve: async (_, __, ctx: ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");
        const users = await DB.user.findUnique({ where: { id: user.id } });
        if (!users) return Error("first login");
        if (users.role == "client") return Error("your not admin");
        return DB.user.findMany({
          skip: __.skip,
          take: __.take,
          where: {
            role: "client",
          },
        });
      },
    },
    get_client_id: {
      type: types.UserType,
      args: {
        id: {
          type: gql.GraphQLID,
        },
      },
      resolve: async (_, __, ctx: ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");
        const users = await DB.user.findUnique({ where: { id: user.id } });
        if (!users) return Error("first login");
        if (users.role == "client") return Error("your not admin");
        // console.log(__);

        const userss = await DB.user.findMany({
          where: {
            id: __.id,
            role: "client",
          },
        });
        return userss[0];
      },
    },
    get_videos: {
      type: new gql.GraphQLList(types.video),
      args: {
        skip: {
          type: gql.GraphQLInt,
        },
        take: {
          type: gql.GraphQLInt,
        },
        id: {
          type: gql.GraphQLID,
        },
      },
      resolve: async (_, __, ctx: ctx) => {
        const a = await DB.classes.findUnique({
          where: {
            id: __.id,
          },
          select: {
            lecher: true,
          },
        });
        return a?.lecher;
      },
    },
    get_video: {
      type: types.video,
      args: {
        id: {
          type: gql.GraphQLID,
        },
      },
      resolve: async (_, __, ctx: ctx) => {
        const id: any = decode(ctx.req.cookies.token);
        const user = await DB.user.findMany({
          where: {
            id: id?.id,
            isPayfor: {
              some: {
                lecher: {
                  some: {
                    id: __.id,
                  },
                },
              },
            },
          },
        });
        // console.log(user);

        if (user.length == 0) return new Error("video not for you");
        const a = await DB.video.findUnique({
          where: {
            id: __.id,
          },
        });

        const d = a?.is48h.getDate() || 0;
        // console.log(d);
        if (
          d <= new Date().getDate() &&
          a?.is48h.getMonth() == new Date().getMonth()
        )
          return {};

        return a;
      },
    },
    get_admin: {
      type: new gql.GraphQLList(types.UserType),
      args: {
        skip: {
          type: gql.GraphQLInt,
        },
        take: {
          type: gql.GraphQLInt,
        },
      },
      resolve: async (_, __, ctx: ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");
        const users = await DB.user.findUnique({ where: { id: user.id } });
        if (!users) return Error("first login");
        if (users.role == "client" || users.role == "teacher")
          return Error("your not admin");
        return DB.user.findMany({
          where: {
            role: "admin",
          },
        });
      },
    },
    get_all_videos: {
      type: new gql.GraphQLList(types.video),
      resolve: async (_, __, ctx: ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");
        const users = await DB.user.findUnique({ where: { id: user.id } });
        if (!users) return Error("first login");
        if (users.role == "client" || users.role == "teacher")
          return Error("your not admin");
        return DB.video.findMany({});
      },
    },
    access_to_class: {
      type: new gql.GraphQLObjectType({
        name: "Access_Class",
        fields: () => ({
          user_name: {
            type: gql.GraphQLString,
          },
          classes: {
            type: new gql.GraphQLList(types.Classes),
          },
        }),
      }),
      args: {
        userId: {
          type: gql.GraphQLString,
        },
        classes: {
          type: new gql.GraphQLList(gql.GraphQLString),
        },
      },
      resolve: async (_, ags, ctx) => {
        const user: any = decode(ctx.req.cookies.token);
        if (!user) return Error("first login");
        const users = await DB.user.findUnique({ where: { id: user.id } });
        if (!users) return Error("first login");
        if (users.role == "client") return Error("your not admin");
        const client = await DB.user.findUnique({ where: { id: ags.userId } });
        if (!client) return Error("user not found");
        return DB.user.update({
          where: {
            id: client.id,
          },
          data: {
            isPayfor: {
              connect: [...ags.classes],
            },
          },
          // create: undefined
        });
      },
    },
  }), //only admin make the request
});
