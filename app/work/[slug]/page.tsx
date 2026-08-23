import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseVisuals } from "@/components/CaseVisuals";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import {
  getProject,
  getProjectNeighbours,
  projects,
} from "@/data/projects";

const siteUrl = "https://sushmitananda.com";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.category} | Sushmita Nanda`;
  const image = new URL(project.heroImage, siteUrl).toString();
  const canonical = new URL(`/work/${project.slug}`, siteUrl).toString();

  return {
    title,
    description: project.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: project.description,
      type: "article",
      url: canonical,
      images: [{ url: image, alt: project.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const neighbours = getProjectNeighbours(project.slug);

  return (
    <main className={`case-study case-study--${project.theme} case-study--${project.slug}`}>
      <SiteNav />

      <article>
        <header className="case-hero section-shell">
          <div className="case-hero__crumb">
            <Link href="/#work">← ALL WORK</Link>
            <span>PROJECT {project.number} / 04</span>
          </div>

          <div className="case-hero__title">
            <p>
              {project.category}
              {project.year ? ` / ${project.year}` : ""}
            </p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>

          <Reveal className="case-hero__image">
            <Image
              alt={project.alt}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 92vw"
              src={project.heroImage}
            />
          </Reveal>
        </header>

        <section className="case-narrative section-shell" aria-label="Project narrative">
          <Reveal className="case-narrative__intro">
            <span>THE BRIEF</span>
            <p>{project.brief}</p>
          </Reveal>

          <div className="case-narrative__columns">
            <Reveal>
              <span>THE APPROACH</span>
              <p>{project.approach}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <span>THE THINKING</span>
              <p>{project.thinking}</p>
            </Reveal>
          </div>
        </section>

        <section className="case-work" aria-labelledby="selected-outputs-title">
          <div className="section-shell case-work__heading">
            <span>SELECTED EXECUTIONS</span>
            <h2 id="selected-outputs-title">THE WORK, IN CONTEXT.</h2>
          </div>

          <div className="section-shell">
            <CaseVisuals project={project} />
            <Link className="return-to-work" href="/#work">
              RETURN TO SELECTED WORK <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <nav className="case-pagination" aria-label="Other case studies">
          <Link href={`/work/${neighbours.previous.slug}`}>
            <span>← PREVIOUS PROJECT</span>
            <strong>{neighbours.previous.title}</strong>
          </Link>
          <Link href={`/work/${neighbours.next.slug}`}>
            <span>NEXT PROJECT →</span>
            <strong>{neighbours.next.title}</strong>
          </Link>
        </nav>
      </article>
    </main>
  );
}
