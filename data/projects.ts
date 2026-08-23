export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  heroImage: string;
  gallery: string[];
  alt: string;
  brief: string;
  approach: string;
  thinking: string;
  theme: "aqua" | "paper" | "ink" | "warm";
};

export const projects: Project[] = [
  {
    slug: "makemytrip",
    number: "01",
    title: "MAKE MY TRIP",
    shortTitle: "MMT",
    category: "Consumer Copy & Campaign",
    description:
      "Destination-led copy that turns browsing into a clear, inviting path through discovery.",
    heroImage: "/images/portfolio/makemytrip.jpeg",
    gallery: ["/images/portfolio/makemytrip.jpeg"],
    alt: "MakeMyTrip destination copy for Baku, Almaty and Hong Kong",
    brief:
      "Translate destination discovery into concise, useful prompts for travellers across MakeMyTrip’s mobile and digital surfaces.",
    approach:
      "Organise each destination around a traveller’s immediate question: where to stay, what to explore, what feels familiar and what feels new.",
    thinking:
      "The copy balances utility with invitation—clear enough to guide a booking decision, warm enough to start a journey.",
    theme: "aqua",
  },
  {
    slug: "spectra",
    number: "02",
    title: "SPECTRA",
    shortTitle: "SPECTRA",
    category: "Digital / Editorial Storytelling",
    description:
      "A connected body of social, editorial and contextual communication shaped around everyday work.",
    heroImage: "/images/portfolio/spectra-social.jpeg",
    gallery: [
      "/images/portfolio/spectra-editorial.jpeg",
      "/images/portfolio/spectra-social.jpeg",
    ],
    alt: "Spectra campaign work across editorial placements and social posts",
    brief:
      "Build a recognisable editorial voice across digital placements, social posts and moments of internal culture.",
    approach:
      "Pair direct benefit-led language with familiar workplace observations, then adapt the tone to the context without losing the brand’s clarity.",
    thinking:
      "A consistent voice is not identical copy everywhere. It is a shared point of view that knows when to inform, when to smile and when to celebrate.",
    theme: "paper",
  },
  {
    slug: "startup-india",
    number: "03",
    title: "STARTUP INDIA",
    shortTitle: "STARTUP INDIA",
    category: "Content & Event Storytelling",
    description:
      "Structured storytelling for innovation-led content, summits and public-facing communication.",
    heroImage: "/images/portfolio/startup-india.jpeg",
    gallery: ["/images/portfolio/startup-india.jpeg"],
    alt: "Startup India video and innovation summit communication examples",
    brief:
      "Bring clarity and narrative flow to innovation-led content and event communication for a broad audience.",
    approach:
      "Create a readable hierarchy first, then use concise language and a clear narrative order to make complex subject matter easier to enter.",
    thinking:
      "When the subject is expansive, the writing has to become a guide: orient the audience, hold attention and move the story forward.",
    theme: "ink",
  },
  {
    slug: "spec-ads",
    number: "04",
    title: "SPEC ADS",
    shortTitle: "SPEC ADS",
    category: "Creative Exploration",
    description:
      "Concepts, copy experiments and speculative briefs used to test ideas in unfamiliar territories.",
    heroImage: "/images/portfolio/spec-ads.jpeg",
    gallery: ["/images/portfolio/spec-ads.jpeg"],
    alt: "Spec ad concepts for travel, Bumble and an alien tourism brief",
    brief:
      "Explore unfamiliar briefs to sharpen concepting across short-form ads, long copy and playful brand scenarios.",
    approach:
      "Find one human tension in each prompt, choose a clear tonal direction and let the idea determine the length and form of the copy.",
    thinking:
      "Creative experiments are useful because they remove the familiar answer. The work begins again with observation, language and a point of view.",
    theme: "warm",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectNeighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: projects[0], next: projects[0] };

  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
