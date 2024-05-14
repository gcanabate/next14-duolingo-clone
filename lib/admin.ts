import { auth } from "@clerk/nextjs";

const adminIds = ["user_2eOY7RtYQId1Co2ZIYG3tjVeZLK"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
