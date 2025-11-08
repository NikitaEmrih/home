import { TagServiceContract } from "./tag.types"
import { TagRepository } from "./tag.repository"

export const TagService: TagServiceContract = {
    getAll(take?, skip?) {
        return TagRepository.getAll(take, skip)
    },
    getById(id) {
        return TagRepository.getById(id)
    },
}
