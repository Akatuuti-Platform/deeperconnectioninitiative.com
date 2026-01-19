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
    tel: ["+256-784330349"],
    email: "collinsbenda30@gmail.com",
    tele: "+256784330349",
    address: "Plot 851 Serumaga Road, Bukoto, Kampala, Uganda",
  },
  seo:{
  title:"Your Page Title",
  description:"A detailed description of your page content.",
  canonical:"https://yourwebsite.com/current-page",
  openGraph:{
    url: "https://yourwebsite.com/current-page",
    title: "Your Page Title",
    description: "A detailed description of your page content.",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Open Graph Image Alt",
        type: "image/jpeg",
      },
    ],
    site_name: "Your Site Name",
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