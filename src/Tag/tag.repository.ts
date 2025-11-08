import { TagRepositoryContract } from "./tag.types";
import { Prisma } from "../generated/prisma";
import { PrismaClient } from "@prisma/client";
export const Client = new PrismaClient();


export const TagRepository: TagRepositoryContract = {
    async getById(id) {
        try {
            const tag = await Client.tag.findUnique({
                where: { id },
            })
            return tag
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2009") {
                    console.log("Validation error")
                } else if (error.code === "P2025") {
                    console.log("Not found")
                }
            }
            throw error
        }
    },

    async getAll(take?: number, skip?: number) {
        const tags = await Client.tag.findMany({
            take,
            skip,
        })
        return tags
    },
}
