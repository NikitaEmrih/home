import { Prisma } from "@prisma/client";
import { Request, Response } from "express";

export type Post = Prisma.PostGetPayload<{}>;
export type PostWithTags = Prisma.PostGetPayload<{ include: { tags: { include: { tag: true } } } }>;

export type PostCreate = { title: string; description: string; image?: string; tagIds?: number[] };
export type PostCreateChecked = Required<PostCreate>;

export type PostUpdate = Partial<PostCreate>;
export type PostUpdateChecked = Required<PostUpdate>;

export interface PostServiceContract {
  getAll: (skip?: number, take?: number) => Promise<PostWithTags[]>;
  getById: (id: number) => Promise<PostWithTags | null>;
  create: (data: PostCreate) => Promise<PostWithTags | null>;
  update: (id: number, data: PostUpdate) => Promise<PostWithTags | null>;
  delete: (id: number) => Promise<PostWithTags | null>;
}

export interface PostControllerContract {
  getAll: (req: Request<object, PostWithTags[] | string, object, { skip?: string; take?: string }>, res: Response<PostWithTags[] | string>) => void;
  getById: (req: Request<{ id: string }, PostWithTags | string>, res: Response<PostWithTags | string>) => void;
  create: (req: Request<object, PostWithTags | string, PostCreate>, res: Response<PostWithTags | string>) => Promise<void>;
  update: (req: Request<{ id: string }, PostWithTags | string, PostUpdate>, res: Response<PostWithTags | string>) => Promise<void>;
  delete: (req: Request<{ id: string }>, res: Response<PostWithTags | string>) => Promise<void>;
}

