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
    /Chidi|Creative portfolio presentation|PROFILE LINK TO BE ADDED/i,
  );
  assert.match(html, /href="mailto:nandasushmita30@gmail\.com"/);
  assert.match(html, /href="tel:\+918920153554"/);
  assert.match(html, /OBSERVE/);
  assert.match(html, /UNDERSTAND/);
  assert.match(html, /WRITE/);
  assert.match(html, /VIEW CASE STUDY/);
  assert.match(html, /HOVER, FOCUS OR TAP A WORD/);
  assert.match(html, /sushmita-portrait\.jpeg/);
  assert.match(html, /alt="Portrait of Sushmita Nanda"/);
  assert.doesNotMatch(html, /linkedin\.com/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("renders every case study route", async () => {
  const cases = {
    makemytrip: ["Create an engaging content to teleport the reader", "mmt-baku.jpeg"],
    spectra: ["Ad copywriting for lead generation and brand awareness", "spectra-jagran.jpeg"],
    "startup-india": [
      "Startup India Innovation Summit / January 2023",
      "startup-innovation-summit.jpg",
    ],
    "spec-ads": ["Each execution follows the form of its brief", "spec-indigo-comment.jpeg"],
  };

  for (const [slug, [featuredLine, suppliedVisual]] of Object.entries(cases)) {
    const response = await render(`/work/${slug}`);
    assert.equal(response.status, 200, `${slug} should render`);
    const html = await response.text();
    assert.match(html, /BRIEF/);
    assert.doesNotMatch(html, /THE IMPACT/);
    assert.match(html, new RegExp(featuredLine.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, new RegExp(suppliedVisual.replace(".", "\\.")));
    assert.match(html, /A story about the work, not a gallery of it/);
    assert.match(html, /RETURN TO SELECTED WORK/);
    assert.doesNotMatch(html, /case-hero__image/);
    assert.doesNotMatch(html, /Chidi|PROFILE LINK TO BE ADDED/i);

    if (slug === "makemytrip") {
      assert.match(html, /EXECUTION/);
      assert.match(html, /mmt-baku-destination\.mp4/);
      assert.match(html, /Baku destination experience/);
      assert.match(
        html,
        /Baku is a much sought-after destination\. The aim is to capture the vibe of the city in limited words\./,
      );
      assert.match(html, /03 \/ (?:<!-- -->)?THE EXECUTION/);
      assert.doesNotMatch(html, /03 \/ (?:<!-- -->)?THE COPY/);
      assert.doesNotMatch(html, /Explore Almaty/);
    } else if (slug === "spectra") {
      assert.match(html, /EXECUTION/);
      assert.match(html, /Highlighted placement: SPECTRA AD/);
      assert.match(html, /03 \/ (?:<!-- -->)?THE EXECUTION/);
      assert.doesNotMatch(html, /recognizable workplace moments into concise social/);
      assert.doesNotMatch(html, /03 \/ (?:<!-- -->)?THE COPY/);
      assert.doesNotMatch(html, /Celebrating the people powering our progress\./);
    } else if (slug === "spec-ads") {
      assert.match(html, /02 \/ (?:<!-- -->)?THE BRIEF/);
      assert.match(html, /03 \/ (?:<!-- -->)?THE BRIEF/);
      assert.match(html, /04 \/ (?:<!-- -->)?THE BRIEF/);
      assert.doesNotMatch(html, /02 \/ (?:<!-- -->)?THE THINKING/);
      assert.doesNotMatch(html, /03 \/ (?:<!-- -->)?THE COPY/);
      assert.doesNotMatch(html, /THE EXECUTION/);
    } else {
      assert.match(html, /EXECUTION/);
      assert.match(html, /THINKING/);
      assert.match(html, /COPY/);
    }

    if (slug === "startup-india") {
      assert.match(html, /youtube\.com\/watch\?v=jrCQET9XSx8/);
      assert.match(html, /youtube\.com\/watch\?v=-8kon_IJBuw/);
      assert.match(html, /youtube\.com\/shorts\/4svEhWMS3UM/);
      assert.match(html, /FULL VIDEO ON YOUTUBE/);
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
  await access(new URL("../public/images/portfolio/sushmita-portrait.jpeg", import.meta.url));
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
