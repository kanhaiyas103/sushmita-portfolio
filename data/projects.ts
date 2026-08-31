export type ProjectVisual = {
  src: string;
  alt: string;
  label: string;
  description: string;
  aspect: "wide" | "landscape" | "portrait" | "square";
};

type ProjectVideoBase = {
  title: string;
  label: string;
  aspect: "landscape" | "portrait";
  poster: string;
};

export type ProjectVideo = ProjectVideoBase &
  (
    | { kind: "local"; src: string }
    | { kind: "youtube"; href: string }
  );

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  year?: string;
  description: string;
  heroImage: string;
  gallery: ProjectVisual[];
  videos?: ProjectVideo[];
  alt: string;
  brief: string;
  approach: string;
  thinking: string;
  featuredLine: string;
  impact: string;
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
    gallery: [
      {
        src: "/images/portfolio/mmt-baku.jpeg",
        alt: "MakeMyTrip Baku search result with destination location guidance",
        label: "TRAVEL SEARCH MODULE / BAKU",
        description:
          "Crafted high-converting, performance-led copy to drive user engagement and holiday package bookings across MakeMyTrip’s mobile and digital channels.",
        aspect: "wide",
      },
      {
        src: "/images/portfolio/mmt-bali.jpeg",
        alt: "MakeMyTrip Experience Bali destination collection",
        label: "DESTINATION COLLECTION / EXPERIENCE BALI",
        description:
          "Curating collections was a fun and learning experience—from deciding on the images to writing copy for each collection, every step was a thought-provoking drill.",
        aspect: "wide",
      },
      {
        src: "/images/portfolio/mmt-hong-kong.jpeg",
        alt: "MakeMyTrip Experience Hong Kong destination collection",
        label: "DESTINATION COLLECTION / EXPERIENCE HONG KONG",
        description:
          "The Hong Kong collection brings together top picks, nearby Indian restaurants and budget properties as clear travel-planning entry points.",
        aspect: "wide",
      },
    ],
    videos: [
      {
        kind: "local",
        title: "Baku destination experience",
        label: "MAKE MY TRIP / BAKU",
        aspect: "portrait",
        poster: "/images/portfolio/mmt-baku-video-poster.jpg",
        src: "/videos/mmt-baku-destination.mp4",
      },
    ],
    alt: "MakeMyTrip destination copy for Baku, Almaty and Hong Kong",
    brief:
      "Create consumer-facing destination copy for MakeMyTrip’s mobile and digital travel experience.",
    approach:
      "The portfolio shows destination modules for Baku, Almaty and Hong Kong, using location guides, recommendations and clear next steps.",
    thinking:
      "The writing works alongside the interface: concise, useful and focused on helping travellers understand their options.",
    featuredLine: "Explore Almaty",
    impact:
      "Within the supplied work, the copy gives travellers clear entry points into destinations, recommendations and next steps.",
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
      {
        src: "/images/portfolio/spectra-jagran.jpeg",
        alt: "Spectra advertisement placed on the Jagran website",
        label: "DIGITAL PUBLICATION PLACEMENT / JAGRAN",
        description:
          "A Spectra campaign execution placed within Jagran’s live editorial environment.",
        aspect: "wide",
      },
      {
        src: "/images/portfolio/spectra-ht-tech.jpeg",
        alt: "Spectra advertisement placed on the HT Tech website",
        label: "DIGITAL PUBLICATION PLACEMENT / HT TECH",
        description:
          "The same campaign idea adapted for a technology-news context on HT Tech.",
        aspect: "wide",
      },
      {
        src: "/images/portfolio/spectra-context.jpeg",
        alt: "Spectra contextual workplace execution installed near an elevator",
        label: "CONTEXTUAL WORKPLACE EXECUTION",
        description:
          "A contextual workplace line built around the moment people pass an elevator notice board.",
        aspect: "landscape",
      },
      {
        src: "/images/portfolio/spectra-awards.jpeg",
        alt: "Spectra people-led award communication in dark and light variants",
        label: "PEOPLE-LED SOCIAL COMMUNICATION",
        description:
          "People-led award communication recognizing dedication, consistent effort and standout performance.",
        aspect: "square",
      },
    ],
    alt: "Spectra campaign work across editorial placements and social posts",
    brief:
      "Create copy across social posts, contextual executions and digital publication placements.",
    approach:
      "The selected work uses direct, situational headlines across everyday work moments and people-led communication.",
    thinking:
      "Across formats, the copy stays concise and grounded in the context in which it appears.",
    featuredLine: "Celebrating the people powering our progress.",
    impact:
      "The supplied executions bring recognizable workplace moments into concise social, contextual and people-led communication.",
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
    gallery: [
      {
        src: "/images/portfolio/startup-innovation-summit.jpg",
        alt: "Startup India Innovation Summit video preview",
        label: "INNOVATION SUMMIT / VIDEO PREVIEW",
        description:
          "A clearer Startup India project preview focused on event storytelling and video-led communication.",
        aspect: "landscape",
      },
    ],
    videos: [
      {
        kind: "youtube",
        title: "SuperStree — Tales by women, for women",
        label: "SUPERSTREE / OFFICIAL VIDEO",
        aspect: "landscape",
        poster: "/images/portfolio/startup-superstree-tales.jpg",
        href: "https://www.youtube.com/watch?v=jrCQET9XSx8",
      },
      {
        kind: "youtube",
        title: "Teaser | Startup India Innovation Summit 2023",
        label: "INNOVATION SUMMIT / OFFICIAL VIDEO",
        aspect: "landscape",
        poster: "/images/portfolio/startup-innovation-summit.jpg",
        href: "https://www.youtube.com/watch?v=-8kon_IJBuw",
      },
      {
        kind: "youtube",
        title: "Unveiling Startup India’s SuperStree",
        label: "SUPERSTREE / OFFICIAL SHORT",
        aspect: "landscape",
        poster: "/images/portfolio/startup-superstree-short.jpg",
        href: "https://www.youtube.com/shorts/4svEhWMS3UM",
      },
    ],
    alt: "Startup India video and innovation summit communication examples",
    brief:
      "Support Startup India communication across video-led pieces and innovation-summit content.",
    approach:
      "The portfolio includes work for SuperStree and the Startup India Innovation Summit, presented as clear, focused visual stories.",
    thinking:
      "The selected examples use concise framing to introduce the subject and give each piece a clear entry point.",
    featuredLine: "Startup India Innovation Summit / January 2023",
    impact:
      "Across the supplied examples, concise framing gives each video-led piece and summit story a clear point of entry.",
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
    gallery: [
      {
        src: "/images/portfolio/spec-indigo.jpeg",
        alt: "IndiGo speculative advertisement about spending more on experiences",
        label: "TRAVEL HEADLINE / INDIGO",
        description:
          "Brief: celebrate IndiGo’s lowest fares. Response: “Spend more on experiences than on tickets.”",
        aspect: "portrait",
      },
      {
        src: "/images/portfolio/spec-indigo-comment.jpeg",
        alt: "IndiGo publicly commenting in recognition of the flight-fare concept above",
        label: "INDIGO RECOGNITION / LINKEDIN",
        description:
          "IndiGo publicly recognised the headline above on LinkedIn — “ideas taking flight” — a clear, unprompted response to the concept.",
        aspect: "wide",
      },
      {
        src: "/images/portfolio/spec-bumble.jpeg",
        alt: "Voice-led Bumble concept titled From Giggles to Tickles",
        label: "VOICE-LED DATING CONCEPT",
        description:
          "Brief: reimagine a dating app without profile pictures, introducing a voice-first way to connect through long-form copy.",
        aspect: "portrait",
      },
      {
        src: "/images/portfolio/spec-alien.jpeg",
        alt: "Extraterrestrial tourism concept copy inviting friendly aliens to Earth",
        label: "EXTRATERRESTRIAL TOURISM / CONCEPT COPY",
        description:
          "Brief: invite friendly extraterrestrial visitors to Earth by presenting the planet’s most compelling reasons to visit.",
        aspect: "square",
      },
    ],
    alt: "Spec ad concepts for travel, Bumble and an alien tourism brief",
    brief:
      "Respond to three speculative briefs across short-form advertising, long copy and concept-led communication.",
    approach:
      "The selected work moves between an IndiGo LinkedIn-recognized travel idea, a voice-first Bumble rebrand brief and an invitation for friendly aliens to visit Earth.",
    thinking:
      "Each execution follows the form of its brief, from a compact headline to longer narrative copy.",
    featuredLine: "Spend more on experiences than on tickets",
    impact:
      "The supplied briefs demonstrate range across a compact travel headline, longer narrative copy and concept-led communication.",
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
