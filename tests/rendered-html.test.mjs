import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

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
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
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
