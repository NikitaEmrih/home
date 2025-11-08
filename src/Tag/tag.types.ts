import { Request, Response } from "express"
import { Prisma } from "../generated/prisma"

export type Tag = Prisma.TagGetPayload<{}>
export type TagCreate = Prisma.TagUncheckedCreateInput
export type TagUpdate = Prisma.TagUncheckedUpdateInput

export interface TagServiceContract {
    getById: (id: number) => Promise<Tag | null>
    getAll: (take?: number, skip?: number) => Promise<Tag[]>
}

export interface TagRepositoryContract {
    getById: (id: number) => Promise<Tag | null>
    getAll: (take?: number, skip?: number) => Promise<Tag[]>
}

export interface TagControllerContract {
    getAll: (req: Request<object, Tag[] | string, object, { take?: string; skip?: string }>,res: Response<Tag[] | string>) => Promise<void>
    getById: (req: Request<{ id: string }, Tag | string, object>,res: Response<Tag | string>) => Promise<void>
}

