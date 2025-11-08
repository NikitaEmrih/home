import { Request, Response } from "express"
import { Prisma } from "../generated/prisma"

export type Post = Prisma.PostGetPayload<{}>
export type PostCreate = Prisma.PostUncheckedCreateInput
export type PostUpdate = Prisma.PostUncheckedUpdateInput

export interface PostServiceContract {
    getById: (id: number) => Promise<Post | null>
    getAll: (skip?: number, take?: number) => Promise<Post[]>
    create: (data: PostCreate) => Promise<Post | null>
    update: (id: number, data: PostUpdate) => Promise<Post | null>

}

export interface PostRepositoryContract {
  getById: (id: number) => Promise<Post | null>;
  getAll: (take?: number, skip?: number) => Promise<Post[]>;
  create: (data: Prisma.PostUncheckedCreateInput) => Promise<Post>;
  update: (id: number, data: Prisma.PostUncheckedUpdateInput) => Promise<Post | null>;
}

export interface PostControllerContract {
    getAll: ( req: Request<object, Post[] | string, object, { skip?: string; take?: string }>, res: Response<Post[] | string>) => Promise<void>
    getById: (req: Request<{ id: string }, Post | string, object>,res: Response<Post | string>) => Promise<void>
    create: (req: Request<object, Post | string, PostCreate, object>,res: Response<Post | string>) => Promise<void>
    update: ( req: Request<{ id: string }, Post | string, PostUpdate, object>, res: Response<Post | string>) => Promise<void>
}
