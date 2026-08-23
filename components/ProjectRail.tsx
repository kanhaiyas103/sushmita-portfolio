"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

export function ProjectRail() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current?.offsetWidth ?? 0;
      const track = trackRef.current?.scrollWidth ?? 0;
      const nextMax = Math.max(0, track - viewport);
      setMaxDrag(nextMax);
      if (x.get() < -nextMax) x.set(-nextMax);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [x]);

  const move = (direction: -1 | 1) => {
    const step = Math.min(window.innerWidth * 0.74, 760);
    const target = Math.max(-maxDrag, Math.min(0, x.get() - direction * step));
    animate(x, target, {
      duration: reduceMotion ? 0 : 0.65,
      ease: [0.2, 0.75, 0.2, 1],
    });
  };

  return (
    <div className="project-rail" ref={viewportRef}>
      <motion.div
        aria-label="Selected projects"
        className="project-track"
        drag={reduceMotion ? false : "x"}
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.07}
        dragMomentum
        ref={trackRef}
        style={{ x }}
      >
        {projects.map((project, index) => (
          <article
            className={`project-card project-card--${project.theme}`}
            key={project.slug}
          >
            <div className="project-card__topline">
              <span>PROJECT {project.number}</span>
              <span>{project.category}</span>
            </div>

            <Link
              className="project-card__visual"
              draggable={false}
              href={`/work/${project.slug}`}
              aria-label={`View ${project.title} case study`}
            >
              <Image
                alt={project.alt}
                draggable={false}
                fill
                priority={index < 2}
                sizes="(max-width: 700px) 88vw, (max-width: 1200px) 68vw, 760px"
                src={project.heroImage}
              />
            </Link>

            <div className="project-card__copy">
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <Link href={`/work/${project.slug}`}>
                VIEW PROJECT <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </motion.div>

      <div className="rail-controls" aria-label="Project carousel controls">
        <button aria-label="Previous projects" onClick={() => move(-1)} type="button">
          ←
        </button>
        <span>DRAG / SWIPE</span>
        <button aria-label="Next projects" onClick={() => move(1)} type="button">
          →
        </button>
      </div>
    </div>
  );
}
