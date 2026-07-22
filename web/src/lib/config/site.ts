export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DCI Wellness",
  legalName: "Deeper Connection Initiative",
  description:
    "A mental health initiative helping individuals and communities build emotional strength through tactile toolkits, guided reflection, storytelling, and community connection. DCI is to mental health what Airbnb is to hospitality — we don't provide the support, we build the infrastructure that lets communities own it.",
  slogan: "Own your healing.",
  url: "https://deeperconnectioninitiative.com/",
  links: {
    github: "deeperconnectioninitiative",
  },
  // Official profiles. Paste the real DCI URLs here — they feed the
  // Organization schema's `sameAs` (a strong entity-recognition signal for
  // Google + AI). Leave a value empty ("") and it won't be emitted.
  social: {
    instagram: "https://www.instagram.com/dci_wellness",
    linkedin: "",
    facebook: "",
  },
  contacts: {
    tel: ["+256-773855144"],
    email: "info@utaliicreative.com",
    tele: "+256773855144",
    address: "Acacia Avenue, Kampala, Uganda",
  },
  // NOTE: The live <head> metadata is rendered by the <Seo /> component from
  // src/lib/config/seo.ts (per-route title/description/OG/Twitter). That file is
  // the source of truth. This block is kept only as a plain-config mirror; keep
  // the values real so nothing here can leak a placeholder if it's ever read.
  seo:{
  title:"Deeper Connection Initiative",
  description:"A mental health initiative helping individuals and communities build emotional strength through tactile toolkits, guided reflection, storytelling, and community connection.",
  canonical:"https://deeperconnectioninitiative.com/",
  openGraph:{
    url: "https://deeperconnectioninitiative.com/",
    title: "Deeper Connection Initiative — Own your healing",
    description: "A mental health initiative helping individuals and communities build emotional strength through tactile toolkits, guided reflection, storytelling, and community connection.",
    images: [
      {
        url: "https://deeperconnectioninitiative.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deeper Connection Initiative — Own your healing",
        type: "image/png",
      },
    ],
    site_name: "Deeper Connection Initiative",
    type: "website",
    locale: "en_US",
  },
  twitter:{
    handle: "@dci_wellness",
    site: "@dci_wellness",
    cardType: "summary_large_image",
  }
  }
};


export const seoKeywords = [
  "mental health",
  "mental health Uganda",
  "community mental health",
  "mental health toolkit",
  "conversation cards",
  "mood tracker",
  "community champions",
  "training of trainers",
  "early warning system",
  "peer support",
  "emotional wellbeing",
  "self-led healing",
  "need help",
]