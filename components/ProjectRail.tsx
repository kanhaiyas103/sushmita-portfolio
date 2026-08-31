"use client";

import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProjectMark } from "@/components/ProjectMark";
import { projects } from "@/data/projects";

export function ProjectRail() {
  const [index, setIndex] = useState(0);
  const [bounds, setBounds] = useState({ left: 0, right: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const targetsRef = useRef<number[]>([]);
  const indexRef = useRef(0);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const vw = viewport.clientWidth;
    const targets = cardRefs.current.map((card) =>
      card ? vw / 2 - (card.offsetLeft + card.offsetWidth / 2) : 0,
    );
    targetsRef.current = targets;
    if (targets.length) {
      setBounds({
        left: Math.min(...targets),
        right: Math.max(...targets),
      });
    }
  }, []);

  const goTo = useCallback(
    (next: number, withAnimation = true) => {
      const clamped = Math.max(0, Math.min(projects.length - 1, next));
      indexRef.current = clamped;
      setIndex(clamped);
      const target = targetsRef.current[clamped] ?? 0;
      if (withAnimation && !reduceMotion) {
        animate(x, target, {
          type: "spring",
          stiffness: 240,
          damping: 34,
          mass: 0.9,
        });
      } else {
        x.set(target);
      }
    },
    [reduceMotion, x],
  );

  useLayoutEffect(() => {
    measure();
    goTo(indexRef.current, false);
  }, [measure, goTo]);

  useEffect(() => {
    const onResize = () => {
      measure();
      goTo(indexRef.current, false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure, goTo]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(indexRef.current + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(indexRef.current - 1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [goTo]);

  const snapFromDrag = (velocity: number) => {
    const predicted = x.get() + velocity * 0.16;
    let best = 0;
    let bestDistance = Infinity;
    targetsRef.current.forEach((target, i) => {
      const distance = Math.abs(target - predicted);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    goTo(best);
  };

  const active = projects[index];

  return (
    <div className="work-rail" data-testid="work-rail" ref={railRef}>
      <div className="work-rail__head section-shell">
        <span className="work-rail__cue" aria-hidden="true">
          <i />
          DRAG TO EXPLORE
        </span>
        <div className="work-rail__nav">
          <p className="work-rail__count" aria-live="polite">
            <b>{String(index + 1).padStart(2, "0")}</b>
            <span>/ {String(projects.length).padStart(2, "0")}</span>
            <em>{active.category}</em>
          </p>
          <div className="work-rail__buttons">
            <button
              aria-label="Previous project"
              data-testid="work-rail-prev"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
              type="button"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              aria-label="Next project"
              data-testid="work-rail-next"
              disabled={index === projects.length - 1}
              onClick={() => goTo(index + 1)}
              type="button"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <div
        aria-label="Selected work, use arrow keys to move between projects"
        aria-roledescription="carousel"
        className="work-rail__viewport"
        ref={viewportRef}
        role="group"
      >
        <motion.div
          className="work-rail__track"
          drag="x"
          dragConstraints={bounds}
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={(_, info) => snapFromDrag(info.velocity.x)}
          style={{ x }}
        >
          {projects.map((project, i) => {
            const visual = project.gallery[0];
            const isActive = i === index;

            return (
              <article
                aria-hidden={isActive ? undefined : true}
                aria-roledescription="slide"
                className={`work-card${isActive ? " is-active" : ""}`}
                data-testid={`work-card-${project.slug}`}
                key={project.slug}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
              >
                <header className="work-card__id">
                  <div className="work-card__brand">
                    <ProjectMark compact slug={project.slug} />
                  </div>
                  <span className="work-card__num" aria-hidden="true">
                    {project.number}
                  </span>
                </header>

                <div className="work-card__title">
                  <span className="work-card__cat">
                    {project.year ? `${project.year} — ` : ""}
                    {project.category}
                  </span>
                  <h3>{project.title}</h3>
                </div>

                <div className="work-card__frame">
                  <Image
                    alt={visual.alt}
                    draggable={false}
                    fill
                    priority={i < 2}
                    sizes="(max-width: 700px) 86vw, (max-width: 1100px) 66vw, 46vw"
                    src={visual.src}
                  />
                  <span className="work-card__tag" aria-hidden="true">
                    {visual.label}
                  </span>
                </div>

                <div className="work-card__foot">
                  <p>{project.description}</p>
                  <Link
                    className="work-card__cta"
                    data-testid={`work-card-cta-${project.slug}`}
                    href={`/work/${project.slug}`}
                    tabIndex={isActive ? 0 : -1}
                  >
                    VIEW CASE STUDY <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>

      <div className="work-rail__progress section-shell" aria-hidden="true">
        {projects.map((project, i) => (
          <button
            className={`work-rail__dot${i === index ? " is-active" : ""}`}
            key={project.slug}
            onClick={() => goTo(i)}
            tabIndex={-1}
            type="button"
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
