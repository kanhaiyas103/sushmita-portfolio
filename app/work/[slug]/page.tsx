import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseVideos } from "@/components/CaseVideos";
import { CaseVisuals } from "@/components/CaseVisuals";
import { CaseStory } from "@/components/CaseStory";
import { ProjectMark } from "@/components/ProjectMark";
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
            <span>THE PROJECT / {project.number} OF 04</span>
          </div>

          <Reveal className="case-hero__title headline-reveal">
            <div className="case-hero__context">
              <p>
                {project.category}
                {project.year ? ` / ${project.year}` : ""}
              </p>
              <ProjectMark slug={project.slug} />
            </div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </Reveal>

          <CaseVideos project={project} />
        </header>

        <CaseStory project={project} />

        <section className="case-work" aria-labelledby="selected-outputs-title">
          <Reveal className="section-shell case-work__heading headline-reveal">
            <span>EXECUTION / SELECTED OUTPUTS</span>
            <h2 id="selected-outputs-title">THE WORK, IN CONTEXT.</h2>
          </Reveal>

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
