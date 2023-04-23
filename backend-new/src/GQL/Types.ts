import * as gql from "graphql";

export const UserType = new gql.GraphQLObjectType({
  name: "USER",
  description: "User Fileds",
  fields: () => ({
    id: {
      type: gql.GraphQLID,
    },
    name: { type: gql.GraphQLString },
    email: { type: gql.GraphQLString },
    age: { type: gql.GraphQLString },
    gender: { type: Gender_Enum },
    role: { type: Role_Enum },
    is_active: { type: gql.GraphQLBoolean },
  }),
});
export const Gender_Enum = new gql.GraphQLEnumType({
  name: "User_Gander",
  values: {
    Male: { value: "male" },
    Female: { value: "female" },
    Other: { value: "other" },
  },
});
export const Role_Enum = new gql.GraphQLEnumType({
  name: "User_Role",
  values: {
    Admin: { value: "admin" },
    Teacher: { value: "Teacher" },
    Client: { value: "client" },
  },
});
export const Classes = new gql.GraphQLObjectType({
  name: "CLESSES",
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
    pay: {
      type: gql.GraphQLString,
    },
    endOn: {
      type: gql.GraphQLString,
    },
    crateAt: {
      type: gql.GraphQLString,
    },
    lecher: {
      type: new gql.GraphQLList(video),
    },
    PayUser: {
      type: new gql.GraphQLList(UserType),
    },
    makeby: {
      type: UserType,
    },
  }),
});
export const Link = new gql.GraphQLObjectType({
  name: "LIKE",
  fields: () => ({
    id: {
      type: gql.GraphQLID,
    },
    likeBy: {
      type: UserType,
    },
  }),
});
export const Comment = new gql.GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: {
      type: gql.GraphQLID,
    },
    comment: {
      type: gql.GraphQLString,
    },
    comment_of_comment: {
      type: new gql.GraphQLList(Comment_of_comment),
    },
  }),
});
export const Comment_of_comment = new gql.GraphQLObjectType({
  name: "Comment_of_comment",
  fields: () => ({
    id: {
      type: gql.GraphQLID,
    },
    comment: {
      type: gql.GraphQLString,
    },
  }),
});
export const video = new gql.GraphQLObjectType({
  name: "VIDEO",
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
    link: {
      type: gql.GraphQLString,
    },
    isZoomMeet: {
      type: gql.GraphQLBoolean,
    },
    isLiveNow: {
      type: gql.GraphQLBoolean,
    },
    is48h: {
      type: gql.GraphQLString,
    },
    createAt: {
      type: gql.GraphQLString,
    },
    viewBY: {
      type: new gql.GraphQLList(UserType),
    },
    like: {
      type: new gql.GraphQLList(Link),
    },
    comment: {
      type: new gql.GraphQLList(Comment),
    },
  }),
});
