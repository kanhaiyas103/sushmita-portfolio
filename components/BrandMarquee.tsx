"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

type BrandCrop = {
  name: string;
  crop: [number, number, number, number];
};

const brandRows: BrandCrop[][] = [
  [
    { name: "Startup India", crop: [54, 178, 407, 148] },
    { name: "IHG Hotels & Resorts", crop: [475, 178, 395, 148] },
    { name: "M Skills", crop: [892, 178, 353, 147] },
    { name: "The Ascott Limited", crop: [1267, 178, 253, 212] },
    { name: "MakeMyTrip", crop: [1067, 349, 190, 188] },
    { name: "SaffronStays", crop: [464, 350, 552, 187] },
    { name: "Spectra", crop: [887, 756, 356, 87] },
  ],
  [
    { name: "Spinks World", crop: [53, 560, 258, 249] },
    { name: "Care Health Insurance", crop: [331, 560, 258, 248] },
    { name: "House of Beauty", crop: [590, 561, 279, 247] },
    { name: "GHK Homes", crop: [882, 560, 361, 185] },
    { name: "SLS", crop: [1274, 413, 192, 192] },
    { name: "Jaipur Fabric", crop: [1274, 629, 192, 191] },
  ],
];

const scale = 0.44;

function BrandUnit({
  activeName,
  archiveNo,
  brand,
  duplicate = false,
  onActivate,
  onDeactivate,
}: {
  activeName: string | null;
  archiveNo: number;
  brand: BrandCrop;
  duplicate?: boolean;
  onActivate: (name: string) => void;
  onDeactivate: () => void;
}) {
  const [x, y, width, height] = brand.crop;
  const style = {
    width: `${width * scale}px`,
    height: `${height * scale}px`,
    backgroundImage: "url('/images/portfolio/brands.jpeg')",
    backgroundSize: `${1600 * scale}px ${900 * scale}px`,
    backgroundPosition: `${-x * scale}px ${-y * scale}px`,
  } as CSSProperties;

  const content = (
    <>
      <span className="brand-unit__no" aria-hidden="true">
        {String(archiveNo).padStart(2, "0")}
      </span>
      <div
        aria-label={duplicate ? undefined : `${brand.name} logo`}
        className="brand-unit__crop"
        role={duplicate ? undefined : "img"}
        style={style}
      />
      <p>
        {brand.name}
        <span>PORTFOLIO WORK</span>
      </p>
    </>
  );

  if (duplicate) {
    return (
      <article
        aria-hidden="true"
        className={`brand-unit${activeName === brand.name ? " is-active" : ""}`}
      >
        {content}
      </article>
    );
  }

  return (
    <button
      aria-pressed={activeName === brand.name}
      className={`brand-unit${activeName === brand.name ? " is-active" : ""}`}
      onBlur={onDeactivate}
      onClick={() => onActivate(brand.name)}
      onFocus={() => onActivate(brand.name)}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onActivate(brand.name);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") onDeactivate();
      }}
      type="button"
    >
      {content}
    </button>
  );
}

export function BrandMarquee() {
  const [activeName, setActiveName] = useState<string | null>(null);

  return (
    <div
      className={`brand-marquees${activeName ? " has-active" : ""}`}
      aria-label="Selected collaborations and portfolio work"
    >
      {brandRows.map((brands, rowIndex) => {
        const offset = rowIndex === 0 ? 0 : brandRows[0].length;
        return (
          <div className={`marquee marquee--${rowIndex === 0 ? "left" : "right"}`} key={rowIndex}>
            <div className="marquee__track">
              {[...brands, ...brands].map((brand, index) => (
                <BrandUnit
                  activeName={activeName}
                  archiveNo={(index % brands.length) + 1 + offset}
                  brand={brand}
                  duplicate={index >= brands.length}
                  key={`${brand.name}-${index}`}
                  onActivate={setActiveName}
                  onDeactivate={() => setActiveName(null)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
