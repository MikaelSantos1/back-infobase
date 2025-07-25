
import { InMemoryProjectsRepository } from '@/test/repositories/in-memory-projects-repostiry'
import { expect, describe, it, beforeEach } from 'vitest'
import { EditProjectUseCase } from './edit-project-use-case'



let projectsRepository: InMemoryProjectsRepository
let sut: EditProjectUseCase

describe('Edit Project Use Case', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository()
    sut = new EditProjectUseCase(projectsRepository)
  })

  it('should to edit project', async () => {
    const createdProject = await projectsRepository.create({
      name: 'JavaScript Project',
    })
    const { project } = await sut.execute({
      name: 'JavaScript Project2',
      projectId: createdProject.id
    })

 expect(project.id).toEqual(createdProject.id)
    expect(project.name).toBe('JavaScript Project2')
  })
})