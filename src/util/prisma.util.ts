import prisma from 'prisma/prisma';

export const getUserByUsernameOrEmail = async (
  email: string,
  username: string,
  includeItems: boolean,
) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: {
            equals: username,
            mode: 'insensitive',
          },
        },
        {
          email: {
            equals: email,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: { items: includeItems },
  });
};

export const getItems = async (userId: number) => {
  return await prisma.item.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });
};
