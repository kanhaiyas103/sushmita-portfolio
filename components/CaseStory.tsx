"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

export function CaseStory({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const stages = [
    { label: "BRIEF", content: project.brief },
    { label: "THINKING", content: project.thinking },
    { label: "COPY", content: project.featuredLine, isCopy: true },
    { label: "EXECUTION", content: project.approach },
    { label: "IMPACT", content: project.impact },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.caseStage);
        if (Number.isFinite(index)) setActiveIndex(index);
      },
      { rootMargin: "-30% 0px -46% 0px", threshold: [0, 0.2, 0.55] },
    );

    stageRefs.current.forEach((stage) => {
      if (stage) observer.observe(stage);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="case-story section-shell" aria-labelledby="case-story-title">
      <div className="case-story__heading">
        <span>PROJECT STORY / {project.number}</span>
        <h2 id="case-story-title">
          BRIEF <b aria-hidden="true">→</b> THINKING <b aria-hidden="true">→</b> COPY
          <b aria-hidden="true">→</b> EXECUTION <b aria-hidden="true">→</b> IMPACT
        </h2>
      </div>

      <div className="case-story__layout">
        <ol aria-label="Case study stages" className="case-story__index">
          {stages.map((stage, index) => (
            <li aria-current={activeIndex === index ? "step" : undefined} key={stage.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {stage.label}
            </li>
          ))}
        </ol>

        <div className="case-story__stages">
          {stages.map((stage, index) => (
            <motion.article
              aria-labelledby={`case-stage-${project.slug}-${index}`}
              className={`case-story__stage${activeIndex === index ? " is-active" : ""}${stage.isCopy ? " case-story__stage--copy" : ""}`}
              data-case-stage={index}
              initial={reduceMotion ? false : { opacity: 0.45, y: 28 }}
              key={stage.label}
              ref={(node) => {
                stageRefs.current[index] = node;
              }}
              transition={{ duration: 0.68, ease: [0.2, 0.7, 0.2, 1] }}
              viewport={{ once: true, amount: 0.28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3 id={`case-stage-${project.slug}-${index}`}>{stage.label}</h3>
              </div>
              {stage.isCopy ? <blockquote>{stage.content}</blockquote> : <p>{stage.content}</p>}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
