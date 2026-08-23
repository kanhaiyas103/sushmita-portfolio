import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/data/projects";

const visualLabels: Record<string, [string, string, string]> = {
  makemytrip: [
    "DESTINATION DISCOVERY / BAKU, ALMATY & HONG KONG",
    "TRAVEL SEARCH MODULE",
    "DESTINATION RECOMMENDATIONS",
  ],
  spectra: [
    "DIGITAL PUBLICATION PLACEMENTS",
    "SOCIAL & CONTEXTUAL EXECUTIONS",
    "PEOPLE-LED COMMUNICATION",
  ],
  "startup-india": [
    "VIDEO-LED COMMUNICATION",
    "INNOVATION SUMMIT / JANUARY 2023",
    "SELECTED STARTUP INDIA OUTPUTS",
  ],
  "spec-ads": [
    "CREATIVE EXPLORATION / SELECTED BRIEFS",
    "TRAVEL & VOICE-LED DATING CONCEPTS",
    "EXTRATERRESTRIAL TOURISM / CONCEPT COPY",
  ],
};

export function CaseVisuals({ project }: { project: Project }) {
  const labels = visualLabels[project.slug];
  const secondaryImage = project.gallery[1] ?? project.heroImage;

  return (
    <div className={`execution-layout execution-layout--${project.slug}`}>
      <Reveal className="execution-lead">
        <figure>
          <div className="execution-frame execution-frame--lead">
            <Image
              alt={`${project.alt} — overview`}
              fill
              sizes="(max-width: 768px) 100vw, 92vw"
              src={project.gallery[0] ?? project.heroImage}
            />
          </div>
          <figcaption>{labels[0]}</figcaption>
        </figure>
      </Reveal>

      <div className="execution-details">
        <Reveal className="execution-detail execution-detail--one">
          <figure>
            <div className="execution-frame">
              <Image
                alt={`${project.alt} — detail one`}
                fill
                sizes="(max-width: 768px) 92vw, 52vw"
                src={project.heroImage}
              />
            </div>
            <figcaption>{labels[1]}</figcaption>
          </figure>
        </Reveal>

        <Reveal className="execution-detail execution-detail--two" delay={0.08}>
          <figure>
            <div className="execution-frame">
              <Image
                alt={`${project.alt} — detail two`}
                fill
                sizes="(max-width: 768px) 84vw, 38vw"
                src={secondaryImage}
              />
            </div>
            <figcaption>{labels[2]}</figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  );
}
