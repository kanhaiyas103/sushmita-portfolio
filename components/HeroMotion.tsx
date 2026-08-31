"use client";

import { useEffect } from "react";

export function HeroMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hero || !finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;

      hero.style.setProperty("--hero-x", `${currentX.toFixed(2)}px`);
      hero.style.setProperty("--hero-y", `${currentY.toFixed(2)}px`);
      hero.style.setProperty("--hero-x-alt", `${(-currentX * 0.58).toFixed(2)}px`);
      hero.style.setProperty("--hero-y-alt", `${(-currentY * 0.42).toFixed(2)}px`);
      hero.style.setProperty("--hero-grid-x", `${(currentX * 0.45).toFixed(2)}px`);
      hero.style.setProperty("--hero-grid-y", `${(currentY * 0.45).toFixed(2)}px`);
      hero.style.setProperty("--hero-rotate", `${(currentX * 0.62).toFixed(2)}deg`);

      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const start = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
      targetX = Math.max(-4, Math.min(4, normalizedX * 8));
      targetY = Math.max(-3, Math.min(3, normalizedY * 6));
      start();
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", reset);
    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", reset);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
