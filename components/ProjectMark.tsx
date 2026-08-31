import type { CSSProperties } from "react";

type ProjectMarkProps = {
  slug: string;
  compact?: boolean;
};

type CroppedMark = {
  crop: [number, number, number, number];
  label: string;
  source?: string;
};

const croppedMarks: Record<string, CroppedMark> = {
  makemytrip: {
    crop: [1067, 349, 190, 188],
    label: "MakeMyTrip logo",
  },
  spectra: {
    crop: [887, 756, 356, 87],
    label: "Spectra logo",
  },
  "startup-india": {
    crop: [54, 178, 407, 148],
    label: "Startup India logo",
  },
  "spec-ads": {
    crop: [54, 72, 198, 42],
    label: "Spec Ads title from the supplied portfolio",
    source: "/images/portfolio/spec-ads.jpeg",
  },
};

export function ProjectMark({ slug, compact = false }: ProjectMarkProps) {
  const mark = croppedMarks[slug];

  if (!mark) return null;

  const [x, y, width, height] = mark.crop;
  const maxWidth = compact ? 138 : 190;
  const maxHeight = compact ? 42 : 62;
  const scale = Math.min(maxWidth / width, maxHeight / height);
  const style = {
    width: `${width * scale}px`,
    height: `${height * scale}px`,
    backgroundImage: `url('${mark.source ?? "/images/portfolio/brands.jpeg"}')`,
    backgroundSize: `${1600 * scale}px ${900 * scale}px`,
    backgroundPosition: `${-x * scale}px ${-y * scale}px`,
  } as CSSProperties;

  return (
    <div
      aria-label={mark.label}
      className={`project-mark${compact ? " project-mark--compact" : ""}`}
      role="img"
    >
      <span className="project-mark__crop" style={style} />
      <small>PROJECT IDENTIFIER</small>
    </div>
  );
}
