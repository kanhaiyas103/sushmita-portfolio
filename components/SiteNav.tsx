"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sectionIds = ["top", "about", "collaborations", "work", "philosophy", "contact"];
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const visibility = new Map(sections.map((section) => [section.id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const visibleId = [...visibility.entries()].sort((a, b) => b[1] - a[1])[0];
        if (!visibleId || visibleId[1] === 0 || visibleId[0] === "top") {
          setActive("");
          return;
        }

        setActive(
          visibleId[0] === "collaborations" || visibleId[0] === "work"
            ? "work"
            : visibleId[0],
        );
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.01, 0.1, 0.25] },
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

  useEffect(() => {
    if (!open) return;

    const focusable = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
    );
    focusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
          data-testid="menu-toggle"
          onClick={() => setOpen((current) => !current)}
          ref={toggleRef}
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
            aria-label="Site navigation"
            aria-modal="true"
            ref={menuRef}
            role="dialog"
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
