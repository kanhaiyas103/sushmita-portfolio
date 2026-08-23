import type { CSSProperties } from "react";

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

function BrandUnit({ brand, duplicate = false }: { brand: BrandCrop; duplicate?: boolean }) {
  const [x, y, width, height] = brand.crop;
  const style = {
    width: `${width * scale}px`,
    height: `${height * scale}px`,
    backgroundImage: "url('/images/portfolio/brands.jpeg')",
    backgroundSize: `${1600 * scale}px ${900 * scale}px`,
    backgroundPosition: `${-x * scale}px ${-y * scale}px`,
  } as CSSProperties;

  return (
    <article aria-hidden={duplicate || undefined} className="brand-unit">
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
    </article>
  );
}

export function BrandMarquee() {
  return (
    <div className="brand-marquees" aria-label="Selected collaborations and portfolio work">
      {brandRows.map((brands, rowIndex) => (
        <div className={`marquee marquee--${rowIndex === 0 ? "left" : "right"}`} key={rowIndex}>
          <div className="marquee__track">
            {[...brands, ...brands].map((brand, index) => (
              <BrandUnit
                brand={brand}
                duplicate={index >= brands.length}
                key={`${brand.name}-${index}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
