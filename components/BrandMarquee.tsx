const brandRows = [
  ["STARTUP INDIA", "IHG HOTELS & RESORTS", "MAKE MY TRIP", "SAFFRONSTAYS", "THE ASCOTT LIMITED", "SPECTRA"],
  ["SPINKS WORLD", "CARE HEALTH INSURANCE", "HOUSE OF BEAUTY", "GHK HOMES", "JAIPUR FABRIC", "MSKILLS"],
];

export function BrandMarquee() {
  return (
    <div className="brand-marquees" aria-label="Selected brands">
      {brandRows.map((brands, rowIndex) => (
        <div className={`marquee marquee--${rowIndex === 0 ? "left" : "right"}`} key={rowIndex}>
          <div className="marquee__track">
            {[...brands, ...brands].map((brand, index) => (
              <span aria-hidden={index >= brands.length} key={`${brand}-${index}`}>
                {brand}
                <b aria-hidden="true">✳</b>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
