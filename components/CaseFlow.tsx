"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import type { Project, ProjectVideo, ProjectVisual } from "@/data/projects";

type Beat = {
  key: string;
  no?: string;
  label?: string;
  body: string;
  visual?: ProjectVisual;
  video?: ProjectVideo;
  visualNote?: string;
  lead?: boolean;
};

const RATIOS = ["58", "66", "54", "70", "62"];

export function CaseFlow({ project }: { project: Project }) {
  const gallery = project.gallery;
  const inlineThinkingVideo =
    project.slug === "makemytrip"
      ? project.videos?.find((video) => video.kind === "local")
      : undefined;
  const isSpecAds = project.slug === "spec-ads";
  const showCopyBeat = !["makemytrip", "spectra", "spec-ads"].includes(project.slug);
  const executionStepNo = showCopyBeat ? "04" : "03";
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
    label: isSpecAds ? "THE BRIEF" : "THE THINKING",
    body: project.thinking,
    visual: gallery[0],
    video: inlineThinkingVideo,
    visualNote: inlineThinkingVideo
      ? "Baku is a much sought-after destination. The aim is to capture the vibe of the city in limited words."
      : undefined,
  });

  const executionVisuals = project.slug === "spec-ads" ? gallery.slice(2) : gallery.slice(1);
  if (executionVisuals.length) {
    executionVisuals.forEach((visual, index) => {
      beats.push({
        key: `execution-${index}`,
        no: index === 0 ? executionStepNo : undefined,
        label: index === 0 ? (isSpecAds ? "THE BRIEF" : "THE EXECUTION") : undefined,
        body: visual.description,
        visual,
      });
    });
  } else {
    beats.push({
      key: "execution",
      no: executionStepNo,
      label: isSpecAds ? "THE BRIEF" : "THE EXECUTION",
      body: project.approach,
    });
  }

  let pairIndex = 0;
  const rows = beats.map((beat) => {
    if (beat.video && beat.visual) {
      return { beat, layout: "case-beat--video-image" };
    }
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
        <h2 id="case-flow-title">A story about the work, not a gallery of it.</h2>
      </div>

      {rows.map(({ beat, layout }, index) => {
        if (beat.key === "thinking" && showCopyBeat) {
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
  const splitVideo = beat.video?.kind === "local" && beat.visual ? beat.video : null;
  const hasMedia = Boolean(beat.visual || splitVideo);

  return (
    <Reveal
      className={`case-beat ${hasMedia ? layout : "case-beat--text"}${beat.lead ? " is-lead" : ""}`}
    >
      {splitVideo && beat.visual ? (
        <figure className="case-beat__media case-beat__media--split">
          <div className="case-beat__split-media">
            <div className="case-beat__video-frame">
              <video
                aria-label={splitVideo.title}
                controls
                loop
                muted
                playsInline
                poster={splitVideo.poster}
                preload="metadata"
                src={splitVideo.src}
              >
                Your browser does not support the video element.
              </video>
            </div>
            <div className="case-beat__image-column">
              <div className={getFrameClassName(beat.visual)}>
                <Image
                  alt={beat.visual.alt}
                  draggable={false}
                  fill
                  priority={priority}
                sizes={getImageSizes(beat.visual, "split")}
                  src={beat.visual.src}
                />
                <VisualHighlight visual={beat.visual} />
              </div>
              {beat.visualNote ? <p className="case-beat__image-note">{beat.visualNote}</p> : null}
            </div>
          </div>
          <figcaption>
            {splitVideo.label} / {beat.visual.label}
          </figcaption>
        </figure>
      ) : beat.visual ? (
        <figure
          className={`case-beat__media${beat.visual.crop ? " case-beat__media--cropped" : ""}${
            beat.visual.display === "compact" ? " case-beat__media--compact" : ""
          }`}
        >
          <div className={getFrameClassName(beat.visual)}>
            <Image
              alt={beat.visual.alt}
              draggable={false}
              fill
              priority={priority}
              sizes={getImageSizes(beat.visual)}
              src={beat.visual.src}
            />
            <VisualOverlay visual={beat.visual} />
            <VisualHighlight visual={beat.visual} />
          </div>
          <figcaption>
            {beat.visual.label}
            {beat.visual.overlay ? ` / ${beat.visual.overlay.label}` : ""}
          </figcaption>
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

function getFrameClassName(visual: ProjectVisual) {
  return `case-beat__frame case-beat__frame--${visual.aspect}${
    visual.highlight ? " has-highlight" : ""
  }${visual.overlay ? " has-overlay" : ""}${visual.crop ? ` is-crop-${visual.crop}` : ""}`;
}

function getImageSizes(visual: ProjectVisual, context: "default" | "split" = "default") {
  if (visual.crop === "left-half") {
    return "(max-width: 700px) 150vw, (max-width: 1100px) 86vw, 760px";
  }

  if (context === "split") {
    return "(max-width: 700px) calc(100vw - 44px), 45vw";
  }

  return "(max-width: 700px) calc(100vw - 44px), 55vw";
}

function VisualOverlay({ visual }: { visual: ProjectVisual }) {
  if (!visual.overlay) return null;

  return (
    <div className="case-beat__overlay-card">
      <Image alt={visual.overlay.alt} draggable={false} fill sizes="(max-width: 700px) 70vw, 360px" src={visual.overlay.src} />
    </div>
  );
}

function VisualHighlight({ visual }: { visual: ProjectVisual }) {
  if (!visual.highlight) return null;

  const highlightStyle = {
    "--highlight-left": `${visual.highlight.left}%`,
    "--highlight-top": `${visual.highlight.top}%`,
    "--highlight-width": `${visual.highlight.width}%`,
    "--highlight-height": `${visual.highlight.height}%`,
  } as CSSProperties;

  return (
    <span
      aria-label={`Highlighted placement: ${visual.highlight.label}`}
      className="case-beat__highlight"
      role="img"
      style={highlightStyle}
    >
      <span>{visual.highlight.label}</span>
    </span>
  );
}
