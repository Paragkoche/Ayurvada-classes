import * as gql from "graphql";
export const user = new gql.GraphQLObjectType({
  name: "USER",
  description: "USER FIELDS",
  fields: () => ({
    id: {
      type: gql.GraphQLID,
    },
    pay: {
      type: gql.GraphQLString,
    },
    pay_by: {
      type: gql.GraphQLString,
    },
    is_pay: {
      type: gql.GraphQLBoolean,
    },
    name: {
      type: gql.GraphQLString,
    },
    profile_pic: {
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
    role: {
      type: role_Enum,
    },
    is_active: {
      type: gql.GraphQLBoolean,
    },
  }),
});
export const role_Enum = new gql.GraphQLEnumType({
  name: "Role",
  description: "USER ROLE",
  values: {
    admin: { value: "admin" },
    teacher: { value: "teacher" },
    client: { value: "client" },
  },
});
export const video = new gql.GraphQLObjectType({
  name: "Video",
  description: "Video Fields",
  fields: () => ({
    id: {
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
    path: {
      type: gql.GraphQLString,
    },
    linked: {
      type: new gql.GraphQLList(user),
    },
    viewed_by: {
      type: new gql.GraphQLList(user),
    },
    classes: {
      type: classes,
    },
    comment: {
      type: new gql.GraphQLList(comment),
    },
  }),
});
export const comment = new gql.GraphQLObjectType({
  name: "Comment",
  description: "Comment Fields",
  fields: () => ({
    id: {
      type: gql.GraphQLID,
    },
    comment: {
      type: gql.GraphQLString,
    },
    comment_of_comment: {
      type: new gql.GraphQLList(comment),
    },
    commend_by: {
      type: user,
    },
    video: {
      type: video,
    },
  }),
});
export const classes = new gql.GraphQLObjectType({
  name: "Classes",
  description: "Classes Fields",
  fields: () => ({
    id: {
      type: gql.GraphQLID,
    },
    photo: {
      type: gql.GraphQLString,
    },
    name: {
      type: gql.GraphQLString,
    },

    end_date: {
      type: gql.GraphQLString,
    },
    crateAt: {
      type: gql.GraphQLString,
    },
    accessBy: {
      type: new gql.GraphQLList(user),
    },
    makeBy: {
      type: user,
    },
    videos: {
      type: new gql.GraphQLList(video),
    },
  }),
});
