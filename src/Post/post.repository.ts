import { PostRepositoryContract } from "./post.types";
import { Prisma } from "../generated/prisma";
import { PrismaClient } from "@prisma/client";
export const Client = new PrismaClient();


export const PostRepository: PostRepositoryContract = {
    async getById(id) {
        try {
            const post = await Client.post.findUnique({
                where: { id }
            });
            return post;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2009") {
                    console.log("Validation error");
                } else if (error.code === "P2025") {
                    console.log("Not found");
                }
            }
            throw error;
        }
    },

    async getAll(take, skip) {
        const posts = await Client.post.findMany({
            take: take,
            skip: skip
        });
        return posts;
    },

    async create(data) {
        return await Client.post.create({ data });
    },

    async update(id, data) {
        return await Client.post.update({
            where: { id },
            data,
        });
    },
};
