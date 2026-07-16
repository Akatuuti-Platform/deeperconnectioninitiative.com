export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DCI Wellness",
  legalName: "Deeper Connection Initiative",
  description: "",
  slogan: "",
  url: "https://deeperconnectioninitiative.com/",
  links: {
    github: "deeperconnectioninitiative",
  },
  // Official profiles. Paste the real DCI URLs here — they feed the
  // Organization schema's `sameAs` (a strong entity-recognition signal for
  // Google + AI). Leave a value empty ("") and it won't be emitted.
  social: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },
  contacts: {
    tel: ["+256-773855144"],
    email: "info@utaliicreative.com",
    tele: "+256773855144",
    address: "Acacia Avenue, Kampala, Uganda",
  },
  seo:{
  title:"Deeper Connection Initiative",
  description:"Deeper Connection Initiative is a community-based organization that works to improve the mental health of the community.",
  canonical:"https://deeperconnectioninitiative.com/",
  openGraph:{
    url: "https://deeperconnectioninitiative.com/",
    title: "Deeper Connection Initiative",
    description: "Deeper Connection Initiative is a community-based organization that works to improve the mental health of the community.",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Open Graph Image Alt",
        type: "image/jpeg",
      },
    ],
    site_name: "Deeper Connection Initiative",
    type: "website",
    locale: "en_US",
  },
  twitter:{
    handle: "@yourhandle",
    site: "@yourwebsite",
    cardType: "summary_large_image",
  }
  }
};


export const seoKeywords = [
  "mental health",
  "need help",
]