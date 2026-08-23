export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  year?: string;
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
      "Consumer-facing destination copy and guidance across MakeMyTrip’s digital travel experience.",
    heroImage: "/images/portfolio/makemytrip.jpeg",
    gallery: ["/images/portfolio/makemytrip.jpeg"],
    alt: "MakeMyTrip destination copy for Baku, Almaty and Hong Kong",
    brief:
      "Create consumer-facing destination copy for MakeMyTrip’s mobile and digital travel experience.",
    approach:
      "The portfolio shows destination modules for Baku, Almaty and Hong Kong, using location guides, recommendations and clear next steps.",
    thinking:
      "The writing works alongside the interface: concise, useful and focused on helping travellers understand their options.",
    theme: "aqua",
  },
  {
    slug: "spectra",
    number: "02",
    title: "SPECTRA",
    shortTitle: "SPECTRA",
    category: "Digital / Editorial Storytelling",
    description:
      "Social, contextual and digital communication shaped around recognizable workplace moments.",
    heroImage: "/images/portfolio/spectra-social.jpeg",
    gallery: [
      "/images/portfolio/spectra-editorial.jpeg",
      "/images/portfolio/spectra-social.jpeg",
    ],
    alt: "Spectra campaign work across editorial placements and social posts",
    brief:
      "Create copy across social posts, contextual executions and digital publication placements.",
    approach:
      "The selected work uses direct, situational headlines across everyday work moments and people-led communication.",
    thinking:
      "Across formats, the copy stays concise and grounded in the context in which it appears.",
    theme: "paper",
  },
  {
    slug: "startup-india",
    number: "03",
    title: "STARTUP INDIA",
    shortTitle: "STARTUP INDIA",
    category: "Content & Event Storytelling",
    year: "2023",
    description:
      "Video and innovation-summit communication represented in the Startup India portfolio work.",
    heroImage: "/images/portfolio/startup-india.jpeg",
    gallery: ["/images/portfolio/startup-india.jpeg"],
    alt: "Startup India video and innovation summit communication examples",
    brief:
      "Support Startup India communication across video-led pieces and innovation-summit content.",
    approach:
      "The portfolio includes work for SuperStree and the Startup India Innovation Summit, presented as clear, focused visual stories.",
    thinking:
      "The selected examples use concise framing to introduce the subject and give each piece a clear entry point.",
    theme: "ink",
  },
  {
    slug: "spec-ads",
    number: "04",
    title: "SPEC ADS",
    shortTitle: "SPEC ADS",
    category: "Creative Exploration",
    description:
      "Speculative briefs spanning travel, a voice-led dating concept and an extraterrestrial tourism prompt.",
    heroImage: "/images/portfolio/spec-ads.jpeg",
    gallery: ["/images/portfolio/spec-ads.jpeg"],
    alt: "Spec ad concepts for travel, Bumble and an alien tourism brief",
    brief:
      "Respond to three speculative briefs across short-form advertising, long copy and concept-led communication.",
    approach:
      "The selected work moves between an Indigo travel ad, a voice-first Bumble rebrand brief and an invitation for friendly aliens to visit Earth.",
    thinking:
      "Each execution follows the form of its brief, from a compact headline to longer narrative copy.",
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
