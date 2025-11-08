import { Post, PostServiceContract } from './post.types'
import { PostRepository } from './post.repository'

export const PostService: PostServiceContract = {
    getAll(skip, take) {
        return PostRepository.getAll(skip, take)
    },
    getById(id) {
        return PostRepository.getById(id)
    },
    create(data) {
        return PostRepository.create(data)
    },
    update(id, data) {
        return PostRepository.update(id, data)
    },
}
