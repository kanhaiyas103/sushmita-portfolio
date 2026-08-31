"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/data/projects";
import { useState } from "react";

export function CaseVisuals({ project }: { project: Project }) {
  const [focusedFrame, setFocusedFrame] = useState<number | null>(null);

  return (
    <div
      className={`execution-layout execution-layout--${project.slug} execution-visual-grid`}
    >
      {project.gallery.map((visual, index) => (
        <Reveal
          className={`execution-visual execution-visual--${visual.aspect}${index === 0 ? " is-featured" : ""}`}
          delay={Math.min(index * 0.05, 0.15)}
          key={visual.src}
        >
          <figure>
            <button
              aria-label={`Focus ${visual.label}`}
              aria-pressed={focusedFrame === index}
              className={`execution-frame execution-frame--focusable${focusedFrame === index ? " is-focused" : ""}`}
              onClick={() =>
                setFocusedFrame((current) => (current === index ? null : index))
              }
              type="button"
            >
              <Image
                alt={visual.alt}
                fill
                sizes="(max-width: 700px) calc(100vw - 44px), (max-width: 1000px) 86vw, 58vw"
                src={visual.src}
              />
            </button>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{visual.label}</strong>
                <p>{visual.description}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
