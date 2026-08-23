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
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("renders every case study route", async () => {
  for (const slug of ["makemytrip", "spectra", "startup-india", "spec-ads"]) {
    const response = await render(`/work/${slug}`);
    assert.equal(response.status, 200, `${slug} should render`);
    const html = await response.text();
    assert.match(html, /THE BRIEF/);
    assert.match(html, /SELECTED EXECUTIONS/);
    assert.match(html, /RETURN TO SELECTED WORK/);
    assert.doesNotMatch(html, /Chidi|PROFILE LINK TO BE ADDED/i);
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
});
