import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "/home",
  },
  {
    id: "1",
    title: "Events",
    url: "/events",        // fixed
  },
  {
    id: "2",
    title: "Blogs",
    url: "/blogs",         // fixed
  },
  {
    id: "3",
    title: "Team",
    url: "/team",          // fixed
  },
  // Winners will be conditionally added in Header.jsx, not here
];

// rest of the file remains exactly the same as before...
export const heroIcons = [homeSmile, file02, searchMd, plusSquare];
// ... (keep all other exports unchanged)
