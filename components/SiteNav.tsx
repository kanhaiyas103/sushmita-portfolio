"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "WORK", href: "/#work", section: "work" },
  { label: "ABOUT", href: "/#about", section: "about" },
  { label: "PHILOSOPHY", href: "/#philosophy", section: "philosophy" },
  { label: "CONTACT", href: "/#contact", section: "contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.section))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Sushmita Nanda — home">
          <span aria-hidden="true" />
          SUSHMITA NANDA
        </Link>

        <nav aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              className={active === link.section ? "is-active" : ""}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="menu-toggle"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="mobile-menu"
            exit={{ opacity: 0 }}
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0 }}
          >
            <p>BRAND STORYTELLER / PORTFOLIO</p>
            <nav aria-label="Mobile navigation">
              {links.map((link, index) => (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  key={link.href}
                >
                  <Link href={link.href} onClick={() => setOpen(false)}>
                    <span>0{index + 1}</span> {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <a href="mailto:nandasushmita30@gmail.com">nandasushmita30@gmail.com</a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
