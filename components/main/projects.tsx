import { ProjectCard } from '@/components/sub/project-card'
import { PROJECTS } from '@/constants'

export const Projects = () => {
  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="bg-linear-to-r from-purple-500 to-cyan-500 bg-clip-text py-20 text-[40px] font-semibold text-transparent">
        My Projects
      </h1>
      <div className="flex h-full w-full flex-col gap-10 px-10 md:flex-row">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            src={project.image}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </section>
  )
}
