import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the finished portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Sushmita Nanda/);
  assert.match(html, /BRAND STORYTELLER/);
  assert.match(html, /SELECTED/);
  assert.match(html, /MAKE MY TRIP/);
  assert.ok(
    html.indexOf('id="collaborations"') < html.indexOf('id="overview-title"'),
    "Collaborations should appear before selected work",
  );
  assert.doesNotMatch(
    html,
    /Chidi|Creative portfolio presentation|PROFILE LINK TO BE ADDED|BRANDS THAT TRUSTED/i,
  );
  assert.match(html, /href="mailto:nandasushmita30@gmail\.com"/);
  assert.match(html, /href="tel:\+918920153554"/);
  assert.match(html, /THOUGHT/);
  assert.match(html, /IDEA/);
  assert.match(html, /EXECUTION/);
  assert.match(html, /EXPLORE CASE STUDY/);
  assert.match(html, /HOVER, FOCUS OR TAP A WORD/);
  assert.match(html, /sushmita-portrait-cutout\.png/);
  assert.match(html, /alt="Portrait of Sushmita Nanda"/);
  assert.doesNotMatch(html, /linkedin\.com/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("renders every case study route", async () => {
  const cases = {
    makemytrip: ["Explore Almaty", "mmt-baku.jpeg"],
    spectra: ["Celebrating the people powering our progress.", "spectra-jagran.jpeg"],
    "startup-india": [
      "Startup India Innovation Summit / January 2023",
      "startup-superstree.jpeg",
    ],
    "spec-ads": ["Spend more on experiences than on tickets", "spec-indigo-comment.jpeg"],
  };

  for (const [slug, [featuredLine, suppliedVisual]] of Object.entries(cases)) {
    const response = await render(`/work/${slug}`);
    assert.equal(response.status, 200, `${slug} should render`);
    const html = await response.text();
    assert.match(html, /BRIEF/);
    assert.match(html, /THINKING/);
    assert.match(html, /COPY/);
    assert.match(html, /EXECUTION/);
    assert.match(html, /IMPACT/);
    assert.match(html, new RegExp(featuredLine.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, new RegExp(suppliedVisual.replace(".", "\\.")));
    assert.match(html, /SELECTED OUTPUTS/);
    assert.match(html, /RETURN TO SELECTED WORK/);
    assert.doesNotMatch(html, /case-hero__image/);
    assert.doesNotMatch(html, /Chidi|PROFILE LINK TO BE ADDED/i);

    if (slug === "makemytrip") {
      assert.match(html, /mmt-baku-destination\.mp4/);
      assert.match(html, /Baku destination experience/);
    }

    if (slug === "startup-india") {
      assert.match(html, /youtube\.com\/watch\?v=jrCQET9XSx8/);
      assert.match(html, /youtube\.com\/watch\?v=-8kon_IJBuw/);
      assert.match(html, /youtube\.com\/shorts\/4svEhWMS3UM/);
      assert.match(html, /WATCH FULL ON YOUTUBE/);
      assert.match(html, /introduces women as creators, mentors and more/);
    }
  }
});

test("keeps project content data-driven and starter-free", async () => {
  const [packageJson, projectData] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../data/projects.ts", import.meta.url), "utf8"),
  ]);

  assert.match(projectData, /makemytrip/);
  assert.match(projectData, /spectra/);
  assert.match(projectData, /startup-india/);
  assert.match(projectData, /spec-ads/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle/);
  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
});

test("serves the portfolio social image", async () => {
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/images/portfolio/makemytrip.jpeg", import.meta.url));
  await access(
    new URL("../public/images/portfolio/sushmita-portrait-cutout.png", import.meta.url),
  );
  await access(new URL("../public/images/portfolio/mmt-baku.jpeg", import.meta.url));
  await access(
    new URL("../public/images/portfolio/startup-superstree.jpeg", import.meta.url),
  );
  await access(
    new URL("../public/images/portfolio/startup-superstree-tales.jpg", import.meta.url),
  );
  await access(
    new URL("../public/images/portfolio/startup-innovation-summit.jpg", import.meta.url),
  );
  await access(new URL("../public/videos/mmt-baku-destination.mp4", import.meta.url));
});
