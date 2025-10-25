import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function createPost() {
  try {
    const createdPost = await prisma.post.create({
      data: {
        title: "Phone 3",
        description: "asd",
        id: 2,
      },
    });
    console.log("Created post:", createdPost);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function deletePost() {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: 2,
      },
    });
    console.log("Deleted post:", deletedPost);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}


// createPost();
deletePost();
