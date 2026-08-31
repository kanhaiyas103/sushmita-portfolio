"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const steps = [
  { number: "01", lead: "WHAT A BRAND", statement: "WANTS TO SAY" },
  { number: "02", lead: "WHAT PEOPLE", statement: "NEED TO HEAR" },
  { number: "03", lead: "WHAT THEY", statement: "REMEMBER" },
];

export function PhilosophyFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const nextIndex = Number((visible.target as HTMLElement).dataset.stepIndex);
        if (Number.isFinite(nextIndex)) setActiveIndex(nextIndex);
      },
      { rootMargin: "-34% 0px -44% 0px", threshold: [0, 0.3, 0.7] },
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="philosophy-flow">
      {steps.map((step, index) => (
        <div className="philosophy-step-group" key={step.number}>
          <motion.div
            aria-current={activeIndex === index ? "step" : undefined}
            className={`flow-step${activeIndex === index ? " is-active" : ""}${index < activeIndex ? " is-past" : ""}`}
            data-step-index={index}
            initial={reduceMotion ? false : { y: 22 }}
            ref={(node) => {
              stepRefs.current[index] = node;
            }}
            transition={{ duration: 0.72, ease: [0.2, 0.7, 0.2, 1] }}
            viewport={{ once: true, amount: 0.35 }}
            whileInView={reduceMotion ? undefined : { y: 0 }}
          >
            <span>{step.number}</span>
            <p>{step.lead}</p>
            <strong>{step.statement}</strong>
          </motion.div>
          {index < steps.length - 1 ? (
            <span className="flow-arrow" aria-hidden="true">
              ↓
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
