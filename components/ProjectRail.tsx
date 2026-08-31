import Image from "next/image";
import Link from "next/link";
import { ProjectMark } from "@/components/ProjectMark";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

export function ProjectRail() {
  return (
    <section className="project-gallery section-shell" aria-label="Selected project case studies">
      <div className="project-gallery__grid">
        {projects.map((project, index) => {
          const visual = project.gallery[0];

          return (
            <Reveal
              className={`portfolio-work-card portfolio-work-card--${project.theme}`}
              delay={Math.min(index * 0.05, 0.15)}
              key={project.slug}
            >
              <article>
                <div className="portfolio-work-card__meta">
                  <span>PROJECT {project.number}</span>
                  <span>
                    {project.year ? `${project.year} / ` : ""}
                    {project.category}
                  </span>
                </div>

                <div className="portfolio-work-card__mark">
                  <ProjectMark compact slug={project.slug} />
                  <strong aria-hidden="true">{project.number}</strong>
                </div>

                <div className="portfolio-work-card__visual">
                  <Image
                    alt={visual.alt}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 700px) calc(100vw - 44px), (max-width: 1100px) 45vw, 25vw"
                    src={visual.src}
                  />
                </div>

                <div className="portfolio-work-card__copy">
                  <p>{visual.label}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <Link href={`/work/${project.slug}`}>
                  VIEW PROJECT <span aria-hidden="true">-&gt;</span>
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
