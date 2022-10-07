const userResolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (_parent: any, args: any) => {
      console.log(args);
    },
  },
  // Subscription: {},
};

export default userResolvers;
