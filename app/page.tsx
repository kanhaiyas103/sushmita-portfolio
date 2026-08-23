import Image from "next/image";
import Link from "next/link";
import { BrandMarquee } from "@/components/BrandMarquee";
import { CircularBadge } from "@/components/CircularBadge";
import { ProjectRail } from "@/components/ProjectRail";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  return (
    <main>
      <SiteNav />

      <section className="hero" aria-labelledby="hero-title">
        <Reveal className="hero-kicker">
          <span>BRAND STORYTELLER</span>
          <span className="edition">PORTFOLIO / 2026</span>
        </Reveal>

        <h1 id="hero-title">
          <span>SUSHMITA</span>
          <span>NANDA</span>
        </h1>

        <Reveal className="hero-bottom" delay={0.14}>
          <p>
            Words, ideas and stories that make brands understood, remembered,
            and felt.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#work">
              EXPLORE SELECTED WORK <span aria-hidden="true">↘</span>
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
          <Reveal>
            <h2 id="about-title">
              ABOUT
              <span>THE STORYTELLER</span>
            </h2>
          </Reveal>

          <Reveal className="about-copy" delay={0.08}>
            <p className="lead">
              Communication begins with understanding people.
            </p>
            <p>
              Sushmita Nanda is a storyteller focused on brands, audiences and
              the stories that connect them. She approaches every brief with
              curiosity and intention, bringing strategic thinking and creative
              expression together to shape how brands are perceived, understood
              and remembered.
            </p>
          </Reveal>

          <Reveal className="about-note" delay={0.14}>
            <span>HER PRACTICE CONNECTS</span>
            <ul>
              <li>BRAND VOICE</li>
              <li>AUDIENCE UNDERSTANDING</li>
              <li>CREATIVE COPY</li>
              <li>EDITORIAL THINKING</li>
            </ul>
          </Reveal>

          <div className="about-badge">
            <CircularBadge text="SIMPLE INTENTIONAL IMPACTFUL" tone="light" />
          </div>
        </div>
      </section>

      <section className="works-transition" aria-labelledby="overview-title">
        <div className="transition-grid" aria-hidden="true" />
        <p>PORTFOLIO INTRODUCTION / SELECTED WORK</p>
        <Reveal>
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
        <span className="transition-mark" aria-hidden="true">✳</span>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-shell work-intro">
          <div className="section-line">
            <span>02 / SELECTED WORK</span>
            <span>DRAG TO EXPLORE</span>
          </div>
          <Reveal>
            <h2 id="work-title">STORIES, SHAPED FOR THE MOMENT.</h2>
          </Reveal>
          <p>
            Campaign copy, digital storytelling and creative explorations—each
            approached through the audience’s point of view.
          </p>
        </div>
        <ProjectRail />
      </section>

      <section className="brands section-shell" aria-labelledby="brands-title">
        <div className="section-line">
          <span>03 / COLLABORATIONS</span>
          <span>SELECTED BRAND EXPERIENCE</span>
        </div>
        <div className="brands-heading">
          <Reveal>
            <h2 id="brands-title">
              BRANDS THAT TRUSTED
              <span>MY STORYTELLING</span>
            </h2>
          </Reveal>
          <p>
            Work represented in Sushmita’s supplied portfolio, across travel,
            hospitality, technology, public initiatives and consumer brands.
          </p>
        </div>

        <BrandMarquee />

        <Reveal className="brand-board">
          <Image
            alt="A board of brand logos represented in Sushmita Nanda's portfolio"
            fill
            sizes="(max-width: 768px) 92vw, 84vw"
            src="/images/portfolio/brands.jpeg"
          />
        </Reveal>
      </section>

      <section className="philosophy" id="philosophy" aria-labelledby="philosophy-title">
        <div className="section-shell">
          <div className="section-line section-line--light">
            <span>04 / THE PRACTICE</span>
            <span>CREATIVE INSTINCT × STRATEGIC THINKING</span>
          </div>

          <div className="philosophy-intro">
            <Reveal>
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

          <div className="philosophy-flow">
            <Reveal className="flow-step">
              <span>01</span>
              <p>WHAT A BRAND</p>
              <strong>WANTS TO SAY</strong>
            </Reveal>
            <span className="flow-arrow" aria-hidden="true">↓</span>
            <Reveal className="flow-step flow-step--aqua">
              <span>02</span>
              <p>WHAT PEOPLE</p>
              <strong>NEED TO HEAR</strong>
            </Reveal>
            <span className="flow-arrow" aria-hidden="true">↓</span>
            <Reveal className="flow-step">
              <span>03</span>
              <p>WHAT THEY</p>
              <strong>REMEMBER</strong>
            </Reveal>
          </div>

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

          <Reveal>
            <h2 id="contact-title">
              LET&apos;S MAKE
              <span>SOMETHING</span>
              WORTH REMEMBERING.
            </h2>
          </Reveal>

          <div className="contact-details">
            <p>
              Open to collaborations and creative opportunities. Every project
              is another chance to tell a thoughtful, impactful story.
            </p>
            <address>
              <a href="mailto:nandasushmita30@gmail.com">
                <span>EMAIL</span>
                nandasushmita30@gmail.com ↗
              </a>
              <a href="tel:+918920153554">
                <span>PHONE</span>
                +91 89201 53554
              </a>
              <span className="contact-placeholder">
                <b>LINKEDIN</b>
                PROFILE LINK TO BE ADDED
              </span>
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
          <a href="#contact">CONTACT</a>
        </nav>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
