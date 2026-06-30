import { SkillDataProvider } from '@/components/sub/skill-data-provider'
import { SkillText } from '@/components/sub/skill-text'

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  SKILL_DATA,
} from '@/constants'

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{ transform: 'scale(0.9)' }}
      className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden py-20"
    >
      <SkillText />

      <div className="mt-4 flex flex-row flex-wrap items-center justify-around gap-5">
        {SKILL_DATA.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-row flex-wrap items-center justify-around gap-5">
        {FRONTEND_SKILL.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-row flex-wrap items-center justify-around gap-5">
        {BACKEND_SKILL.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-row flex-wrap items-center justify-around gap-5">
        {FULLSTACK_SKILL.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-row flex-wrap items-center justify-around gap-5">
        {OTHER_SKILL.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      <div className="absolute h-full w-full">
        <div className="absolute -z-10 flex h-full w-full items-center justify-center bg-cover opacity-30">
          <video
            className="h-auto w-full"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  )
}
