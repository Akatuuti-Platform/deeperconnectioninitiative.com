export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Deeper Connection Initiative",
  description: "",
  slogan: "",
  url: "https://deeperconnectioniniative.com/",
  links: {
    github: "deeperconnectioniniative",
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
  canonical:"https://deeperconnectioniniative.com/",
  openGraph:{
    url: "https://deeperconnectioniniative.com/",
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