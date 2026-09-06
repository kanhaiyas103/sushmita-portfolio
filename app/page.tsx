import Image from "next/image";
import Link from "next/link";
import { BrandMarquee } from "@/components/BrandMarquee";
import { CircularBadge } from "@/components/CircularBadge";
import { EditorialAnnotations } from "@/components/EditorialAnnotations";
import { HeroMotion } from "@/components/HeroMotion";
import { PhilosophyFlow } from "@/components/PhilosophyFlow";
import { ProjectRail } from "@/components/ProjectRail";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  return (
    <main>
      <SiteNav />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <HeroMotion />
        <Reveal className="hero-kicker">
          <span>BRAND STORYTELLER</span>
          <span className="edition">PORTFOLIO / SELECTED WORK</span>
        </Reveal>

        <h1 id="hero-title">
          <span>SUSHMITA</span>
          <span>NANDA</span>
        </h1>

        <Reveal className="hero-bottom" delay={0.14}>
          <div className="hero-copy-stack">
            <p className="hero-thought">
              <span>Words,</span> <span>ideas</span> <span>and stories</span> that make
              brands understood, remembered, and felt.
            </p>
            <EditorialAnnotations
              ariaLabel="Storytelling annotations"
              items={[
                { word: "BRAND STORYTELLER", note: "CURIOSITY + INTENTION" },
                { word: "WORDS", note: "THE PRECISION OF COPY" },
                { word: "AUDIENCE", note: "UNDERSTANDING PEOPLE FIRST" },
              ]}
            />
          </div>
          <div className="hero-actions">
            <a className="primary-link" href="#work">
              EXPLORE SELECTED WORK <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#about">
              ABOUT THE STORYTELLER
            </a>
          </div>
        </Reveal>

        <div className="hero-seal">
          <CircularBadge text="CREATIVITY DRIVEN BY PURPOSE" size="small" />
        </div>
      </section>

      <section className="about section-shell" id="about" aria-labelledby="about-title">
        <div className="section-line">
          <span>01 / THE STORYTELLER</span>
          <span>UNDERSTANDING BEFORE EXPRESSION</span>
        </div>

        <div className="about-grid">
          <Reveal className="headline-reveal">
            <h2 id="about-title">
              ABOUT
              <span className="about-title__the">THE</span>
              <span>STORYTELLER</span>
            </h2>
          </Reveal>

          <Reveal className="about-copy" delay={0.08}>
            <p className="lead">Communication begins with understanding people.</p>
            <p>
              Sushmita Nanda is a storyteller who begins by understanding the audience. 
              With her stories, she focuses on bridging a connection between the  brand and the
              TG 
              . She approaches every brief with
              curiosity and intention, bringing strategic thinking and creative
              expression together to shape how brands are perceived, understood
              and remembered.
            </p>
          </Reveal>

          <div className="about-story">
            <Reveal className="about-story__aside" delay={0.14}>
              <div className="about-note">
                <span>HER PRACTICE CONNECTS</span>
                <p
                  className="about-process"
                  aria-label="Observe, understand, think, write"
                >
                  <span>OBSERVE</span>
                  <b aria-hidden="true">→</b>
                  <span>UNDERSTAND</span>
                  <b aria-hidden="true">→</b>
                  <span>THINK</span>
                  <b aria-hidden="true">→</b>
                  <span>WRITE</span>
                </p>
                <ul>
                  <li>BRAND VOICE</li>
                  <li>AUDIENCE UNDERSTANDING</li>
                  <li>CREATIVE COPY</li>
                  <li>EDITORIAL THINKING</li>
                </ul>
              </div>

              <div className="about-badge">
                <CircularBadge text="SIMPLE INTENTIONAL IMPACTFUL" tone="light" />
              </div>
            </Reveal>

            <Reveal className="about-portrait-frame" delay={0.18}>
              <figure className="about-portrait">
                <div className="about-portrait__media">
                  <Image
                    className="about-portrait__image"
                    src="/images/portfolio/sushmita-portrait.jpeg"
                    alt="Portrait of Sushmita Nanda"
                    fill
                    sizes="(max-width: 700px) calc(100vw - 44px), (max-width: 980px) calc(100vw - 80px), (max-width: 1320px) 62vw, 780px"
                  />
                </div>
                <figcaption className="about-portrait__caption">
                  <span>PORTRAIT / SUSHMITA NANDA</span>
                  <span>BRAND STORYTELLER</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="brands section-shell"
        id="collaborations"
        aria-labelledby="brands-title"
      >
        <div className="section-line">
          <span>02 / COLLABORATIONS</span>
          <span>SELECTED COLLABORATIONS & PORTFOLIO WORK</span>
        </div>

        <div className="brands-heading">
          <Reveal>
            <h2 id="brands-title">COLLABORATIONS</h2>
          </Reveal>
          <div className="brands-heading__copy">
            <p className="brands-heading__lead">
              Brands and teams I&apos;ve worked with.
            </p>
            <p>
              A selection of brands that trusted my storytelling.
            </p>
          </div>
        </div>

        <p className="brands-archive-note">
          <span>FROM THE ARCHIVE — 13 ENTRIES</span>
          Each mark holds a different audience, voice and story.
        </p>

        <BrandMarquee />
      </section>

      <section className="works-transition" aria-labelledby="overview-title">
        <div className="transition-grid" aria-hidden="true" />
        <p>PORTFOLIO INTRODUCTION / SELECTED WORK</p>
        <Reveal className="headline-reveal">
          <h2 id="overview-title">
            SELECTED
            <span>WORKS</span>
            OVERVIEW
          </h2>
        </Reveal>
        <p className="transition-copy">
          A range of formats and voices. One consistent intention: make the
          message clear, human and worth remembering.
        </p>
        <span className="transition-mark" aria-hidden="true">
          ✳
        </span>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-shell work-intro">
          <div className="section-line">
            <span>03 / SELECTED WORK</span>
            <span>CASE STUDIES AT A GLANCE</span>
          </div>
          <Reveal className="headline-reveal">
            <h2 id="work-title">STORIES, SHAPED FOR THE MOMENT.</h2>
          </Reveal>
          <p>
            Campaign copy, digital storytelling and creative explorations
            approached through the audience&apos;s point of view.
          </p>
          <EditorialAnnotations
            ariaLabel="Selected work annotations"
            items={[
              { word: "VOICE", note: "THE NUANCE OF BRAND VOICE" },
              { word: "AUDIENCE", note: "THROUGH THE AUDIENCE’S POINT OF VIEW" },
              { word: "WORDS", note: "CLEAR, HUMAN, WORTH REMEMBERING" },
            ]}
          />
        </div>
        <ProjectRail />
      </section>

      <section className="editorial-pause" aria-label="Editorial pause">
        <p>
          THE WORK CHANGES.
          <span>THE INTENTION STAYS.</span>
        </p>
        <small>CLARITY / VOICE / PURPOSE</small>
      </section>

      <section className="philosophy" id="philosophy" aria-labelledby="philosophy-title">
        <div className="section-shell">
          <div className="section-line section-line--light">
            <span>04 / THE PRACTICE</span>
            <span>CREATIVE INSTINCT × STRATEGIC THINKING</span>
          </div>

          <div className="philosophy-intro">
            <Reveal className="headline-reveal">
              <h2 id="philosophy-title">
                STORYTELLING
                <span>PHILOSOPHY</span>
              </h2>
            </Reveal>
            <p>
              The craft lives in the balance between what a brand needs to say
              and what people are ready to feel, think or do.
            </p>
          </div>

          <PhilosophyFlow />

          <div className="philosophy-footer">
            <CircularBadge text="ORGANIZING CONTENT WITH CLARITY" tone="light" />
            <p>
              Storytelling. The precision of copy. The nuance of brand voice.
              The result is communication built to make an impact.
            </p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-grid" aria-hidden="true" />
        <div className="section-shell">
          <div className="section-line section-line--light">
            <span>05 / CONTACT</span>
            <span>GURUGRAM, INDIA</span>
          </div>

          <p className="contact-final-line">
            If the story is worth telling, let&apos;s find the words.
          </p>

          <Reveal className="headline-reveal">
            <h2 id="contact-title">
              LET&apos;S MAKE
              <span>SOMETHING</span>
              <strong>WORTH</strong>
              REMEMBERING.
            </h2>
          </Reveal>

          <div className="contact-details">
            <p>
              Open to collaborations and creative opportunities. Every project
              is another chance to tell a thoughtful, impactful story.
            </p>
            <address>
              <a className="contact-hello" href="mailto:nandasushmita30@gmail.com">
                SAY HELLO <span aria-hidden="true">↗</span>
              </a>
              <a href="mailto:nandasushmita30@gmail.com">
                <span>EMAIL</span>
                nandasushmita30@gmail.com ↗
              </a>
              <a href="tel:+918920153554">
                <span>PHONE</span>
                +91 89201 53554
              </a>
              <a
                href="https://www.linkedin.com/in/sushmita-nanda-63b6931b1"
                rel="noreferrer"
                target="_blank"
              >
                <span>LINKEDIN</span>
                sushmita-nanda ↗
              </a>
            </address>
          </div>
        </div>
      </section>

      <footer className="footer">
        <Link className="wordmark" href="/">
          <span aria-hidden="true" />
          SUSHMITA NANDA
        </Link>
        <p>BRAND STORYTELLER</p>
        <nav aria-label="Footer navigation">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#philosophy">PHILOSOPHY</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
