"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/data/projects";

function getYouTubeId(href: string) {
  const url = new URL(href);
  return url.pathname.startsWith("/shorts/")
    ? url.pathname.split("/").filter(Boolean).at(-1) ?? ""
    : url.searchParams.get("v") ?? "";
}

export function CaseVideos({ project }: { project: Project }) {
  const [allowMotion, setAllowMotion] = useState(false);
  const localVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setAllowMotion(!media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    localVideoRefs.current.forEach((video) => {
      if (!video) return;
      if (allowMotion) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [allowMotion]);

  if (!project.videos?.length) return null;

  return (
    <section
      aria-labelledby={`${project.slug}-video-title`}
      className={`case-videos case-videos--${project.slug}`}
    >
      <header className="case-videos__heading">
        <span>VIDEO / PROJECT IN MOTION</span>
        <h2 id={`${project.slug}-video-title`}>SELECTED PREVIEWS</h2>
      </header>

      <div className="case-videos__grid">
        {project.videos.map((video, index) => {
          const youtubeId =
            video.kind === "youtube" ? getYouTubeId(video.href) : null;
          const previewSrc = youtubeId
            ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&rel=0`
            : null;

          return (
            <Reveal
              className={`case-video-card case-video-card--${video.aspect}`}
              delay={Math.min(index * 0.06, 0.12)}
              key={`${video.kind}-${video.title}`}
            >
              <figure>
                {video.kind === "youtube" ? (
                  <div className="case-video-card__poster case-video-card__poster--link">
                    <Image
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 700px) calc(100vw - 44px), (max-width: 1100px) 44vw, 30vw"
                      src={video.poster}
                    />
                    {allowMotion && previewSrc ? (
                      <iframe
                        allow="autoplay; encrypted-media; picture-in-picture"
                        aria-hidden="true"
                        className="case-video-card__embed"
                        loading="lazy"
                        src={previewSrc}
                        tabIndex={-1}
                        title={`Muted preview of ${video.title}`}
                      />
                    ) : null}
                    <a
                      aria-label={`Watch the full ${video.title} video on YouTube (opens in a new tab)`}
                      className="case-video-card__full-link"
                      href={video.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span aria-hidden="true" className="case-video-card__play">
                        FULL VIDEO ↗
                      </span>
                    </a>
                  </div>
                ) : (
                  <video
                    aria-label={video.title}
                    className="case-video-card__poster"
                    controls
                    loop
                    muted
                    playsInline
                    poster={video.poster}
                    preload="metadata"
                    ref={(node) => {
                      localVideoRefs.current[index] = node;
                    }}
                    src={video.src}
                  >
                    Your browser does not support the video element.
                  </video>
                )}

                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{video.title}</strong>
                    <small>
                      {video.label}
                      {video.kind === "youtube"
                        ? " / PREVIEW PLAYS MUTED / FULL VIDEO ON YOUTUBE ↗"
                        : " / SUPPLIED VIDEO"}
                    </small>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
