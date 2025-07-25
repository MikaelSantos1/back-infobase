
import { InMemoryProjectsRepository } from '@/test/repositories/in-memory-projects-repostiry'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateProjectUseCase } from './create-project-use-case'


let projectsRepository: InMemoryProjectsRepository
let sut: CreateProjectUseCase

describe('Create Project Use Case', () => {
  beforeEach(() => {
    projectsRepository = new InMemoryProjectsRepository()
    sut = new CreateProjectUseCase(projectsRepository)
  })

  it('should to create project', async () => {
    const { project } = await sut.execute({
      name: 'JavaScript Project',
    })

    expect(project.id).toEqual(expect.any(String))
  })
})