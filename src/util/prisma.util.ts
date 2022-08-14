import prisma from 'prisma/prisma';

export const getUser = async (
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
