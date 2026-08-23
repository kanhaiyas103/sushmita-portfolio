"use client";

import { motion, useReducedMotion } from "framer-motion";

type CircularBadgeProps = {
  text: string;
  tone?: "aqua" | "light";
  size?: "small" | "large";
};

export function CircularBadge({
  text,
  tone = "aqua",
  size = "large",
}: CircularBadgeProps) {
  const reduceMotion = useReducedMotion();
  const characters = `${text} · `.split("");

  return (
    <motion.div
      aria-label={text}
      className={`circular-badge circular-badge--${tone} circular-badge--${size}`}
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 34, ease: "linear", repeat: Infinity }}
    >
      {characters.map((character, index) => (
        <span
          aria-hidden="true"
          key={`${character}-${index}`}
          style={
            {
              "--letter-angle": `${(360 / characters.length) * index}deg`,
            } as React.CSSProperties
          }
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
      <b aria-hidden="true">✳</b>
    </motion.div>
  );
}
