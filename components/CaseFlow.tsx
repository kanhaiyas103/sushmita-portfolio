"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import type { Project, ProjectVisual } from "@/data/projects";

type Beat = {
  key: string;
  no?: string;
  label?: string;
  body: string;
  visual?: ProjectVisual;
  lead?: boolean;
};

const RATIOS = ["58", "66", "54", "70", "62"];

export function CaseFlow({ project }: { project: Project }) {
  const gallery = project.gallery;
  const beats: Beat[] = [];

  beats.push({
    key: "brief",
    no: "01",
    label: "THE BRIEF",
    body: project.brief,
    lead: true,
  });

  beats.push({
    key: "thinking",
    no: "02",
    label: "THE THINKING",
    body: project.thinking,
    visual: gallery[0],
  });

  const executionVisuals = gallery.slice(1);
  if (executionVisuals.length) {
    executionVisuals.forEach((visual, index) => {
      beats.push({
        key: `execution-${index}`,
        no: index === 0 ? "04" : undefined,
        label: index === 0 ? "THE EXECUTION" : undefined,
        body: visual.description,
        visual,
      });
    });
  } else {
    beats.push({
      key: "execution",
      no: "04",
      label: "THE EXECUTION",
      body: project.approach,
    });
  }

  beats.push({
    key: "impact",
    no: "05",
    label: "THE IMPACT",
    body: project.impact,
  });

  let pairIndex = 0;
  const rows = beats.map((beat) => {
    if (!beat.visual) return { beat, layout: "" };
    const imageLeft = pairIndex % 2 === 0;
    const ratio = RATIOS[pairIndex % RATIOS.length];
    pairIndex += 1;
    return {
      beat,
      layout: `case-beat--pair ratio-${ratio} ${imageLeft ? "is-image-left" : "is-text-left"}`,
    };
  });

  return (
    <section className="case-flow section-shell" aria-labelledby="case-flow-title">
      <div className="case-flow__intro">
        <span>PROJECT STORY / {project.number}</span>
        <h2 id="case-flow-title">A story about the work — not a gallery of it.</h2>
      </div>

      {rows.map(({ beat, layout }, index) => {
        if (beat.key === "thinking") {
          return (
            <div key={beat.key}>
              <BeatBlock beat={beat} layout={layout} />
              <Reveal className="case-flow__copy">
                <span className="case-flow__label">03 / THE COPY</span>
                <blockquote>{project.featuredLine}</blockquote>
                <span className="case-flow__copy-note">SUPPLIED CAMPAIGN LINE</span>
              </Reveal>
            </div>
          );
        }
        return <BeatBlock beat={beat} key={beat.key} layout={layout} priority={index < 2} />;
      })}
    </section>
  );
}

function BeatBlock({
  beat,
  layout,
  priority = false,
}: {
  beat: Beat;
  layout: string;
  priority?: boolean;
}) {
  return (
    <Reveal
      className={`case-beat ${beat.visual ? layout : "case-beat--text"}${beat.lead ? " is-lead" : ""}`}
    >
      {beat.visual ? (
        <figure className="case-beat__media">
          <div className={`case-beat__frame case-beat__frame--${beat.visual.aspect}`}>
            <Image
              alt={beat.visual.alt}
              draggable={false}
              fill
              priority={priority}
              sizes="(max-width: 700px) calc(100vw - 44px), 55vw"
              src={beat.visual.src}
            />
          </div>
          <figcaption>{beat.visual.label}</figcaption>
        </figure>
      ) : null}
      <div className="case-beat__text">
        {beat.label ? (
          <span className="case-beat__label">
            {beat.no ? `${beat.no} / ` : ""}
            {beat.label}
          </span>
        ) : null}
        <p>{beat.body}</p>
      </div>
    </Reveal>
  );
}
