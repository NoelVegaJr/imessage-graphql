import { CreateUsernameResponse, GraphQLContext } from '../../util/types';

const userResolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      ctx: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = ctx;
      // console.log('HERE IS ARGS ', args);
      console.log('HERE IS Session ', session);
      console.log('HERE IS USER  ', session?.user);

      if (!session?.user) {
        return {
          error: 'Not authorized',
        };
      }

      const { id: userId } = session.user;

      try {
        /**
         * Check that username is not taken
         */
        console.log('Checking if user exists');
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUser) {
          console.log('Username already taken try another');
          return {
            error: 'Username already taken try another',
          };
        }
        /**
         * Update User
         */
        console.log('USER_ID HERE ', userId);
        const user = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });
        return { success: true };
      } catch (error: any) {
        console.log('createUsername error', error);
        return {
          error: error.message,
        };
      }
    },
  },
  // Subscription: {},
};

export default userResolvers;
