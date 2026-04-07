import {
  benefitCard1,
  benefitCard2,
  benefitCard3,
  benefitCard4,
  benefitCard5,
  benefitCard6,
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
  isha,
  ishita,
  janhavi_mishra,
  kruti,
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
  shreya_agrawal,
  shreya_mote,
  shreya_watwe,
  siya,
  slack,
  sliders04,
  telegram,
  twitter,
  vaidehi_more,
  varada,
  yashita,

} from "../assets";



import datathon from "../assets/datathon.png";
import datathonthumbnail from "../assets/datathon-thumbnail.png";
import mlusion from "../assets/mlusion.jpg";
import mlusionthumbnail from "../assets/mlusion-thumbnail.jpg";
import kaggle from "../assets/kaggle.jpg";
import kagglethumbnail from "../assets/kaggle-thumbnail.jpg";
import synapse from "../assets/synapse.jpg";
import synapsethumbnail from "../assets/synapse-thumbnail.jpg";
import math from "../assets/math.jpg";
import maththumbnail from "../assets/math-thumbnail.jpg";
import workshop from "../assets/workshop.jpg";
import workshopthumbnail from "../assets/workshop-thumbnail.jpg";



export const navigation = [
  { id: "0", title: "Home", url: "/" },
  { id: "1", title: "Events", url: "/events" },
  { id: "2", title: "LeaderBoard", url: "/winners" },
  { id: "3", title: "Blogs", url: "/blogs" },
  { id: "4", title: "Team", url: "/team" },
  { id: "5", title: "Register", url: "/register" },
];
export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];



export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "DATATHON",
    img: datathon,
    
  },
  {
    id: "1",
    title: "MLUSION",
    img: mlusion,
    
  },
  {
    id: "2",
    title: "KAGGLE COMPETITION",
    img: kaggle,
  },
  {
    id: "3",
    title: "THE SYNAPSE HACKATHON",
    img: synapse,
  },
  {
    id: "4",
    title: "AICVS X MATH CLUB",
    img: math,
  },
  {
    id: "5",
    title: "WORKSHOP ON GEN AI",
    img: workshop,
  },
];

// export const eventsData = [
//   {
//     id: 1,
//     title: "Datathon 2025",
//     shortDescription: "24-hour data challenge pushing boundaries of AI insights.",
//     description:
//       "AICVS Datathon 2025 brings together data enthusiasts, coders, and analysts to solve real-world problems through creative datasets and machine learning.",
//     date: "January 14–15, 2025",
//     thumbnail: datathonthumbnail,
//     banner: datathon,
//     borderColor: "#851b6d", // pink glow
//   },
//   {
//     id: 2,
//     title: "Mlusion",
//     shortDescription: "Exploring the intersection of AI and mixed reality.",
//     description:
//       "Mlusion celebrates the fusion of motion and illusion — where immersive technology meets AI-driven creativity.",
//     date: "February 9, 2025",
//     thumbnail: mlusionthumbnail,
//     banner: mlusion,
//     borderColor: "#5c5cc1", // blue glow
//   },
//   {
//     id: 3,
//     title: "Synapse",
//     shortDescription: "Annual flagship techfest uniting innovation and intellect.",
//     description:
//       "Synapse 2025 is where future-forward thinkers showcase research, innovation, and interactive sessions in AI, robotics, and web tech.",
//     date: "March 1–3, 2025",
//     thumbnail: synapsethumbnail,
//     banner: synapse,
//     borderColor: "#fdf3e9", // light orange glow
//   },
//   {
//     id: 4,
//     title: "Kaggle Competition",
//     shortDescription: "Compete, predict, and dominate data challenges.",
//     description:
//       "Test your data science and model-building skills against the best minds — an exclusive AICVS-hosted Kaggle competition.",
//     date: "March 15–20, 2025",
//     thumbnail: kagglethumbnail,
//     banner: kaggle,
//     borderColor: "#f2f4f5", // light azure glow
//   },
//   {
//     id: 5,
//     title: "AICVS × Math Club",
//     shortDescription: "Mathematics meets Machine Learning.",
//     description:
//       "A crossover event where AI and math merge — exploring optimization, neural math, and algorithmic beauty in modern computing.",
//     date: "April 10, 2025",
//     thumbnail: maththumbnail,
//     banner: math,
//     borderColor: "#346ca3", // blue glow
//   },
//   {
//     id: 6,
//     title: "Workshops on Gen AI",
//     shortDescription: "Hands-on sessions with tools like Gemini, ChatGPT, and DALL·E.",
//     description:
//       "Get practical experience building with Generative AI — fine-tuning prompts, creating art, and exploring multimodal models.",
//     date: "May 6–8, 2025",
//     thumbnail: workshopthumbnail,
//     banner: workshop,
//     borderColor: "#585d8c", // blue glow
//   },
// ];

export const eventsData = [
  {
    id: 1,
    title: "Datathon",
    shortDescription:
      "A 3-day AI & ML hackathon solving real-world data challenges.",
    description:
      "Datathon 2025 is a high-stakes AI and Data Science hackathon where teams tackle real-world problems through multiple rounds — from online quizzes to offline project building and final presentations before industry experts. Compete, innovate, and showcase your data skills for exciting rewards!",
    date: "April",
    thumbnail: datathonthumbnail,
    banner: datathon,
    borderColor: "#851b6d", // pink glow
  },
  {
    id: 2,
    title: "MLusion",
    shortDescription:
      "An ML project showcase for creative and curious innovators.",
    description:
      "MLusion is an online Machine Learning project event designed to spotlight innovation and problem-solving. Participants submit projects across domains like finance, cybersecurity, health, and agriculture — sharing their ideas, models, and outcomes to inspire the ML community.",
    date: "April - May",
    thumbnail: mlusionthumbnail,
    banner: mlusion,
    borderColor: "#5c5cc1", // blue glow
  },
  {
    id: 3,
    title: "Synapse",
    shortDescription:
      "Interactive AI/ML sessions in collaboration with GDG Cummins.",
    description:
      "Synapse — Bridging Minds and Machines — is a hands-on learning experience featuring co-teaching sessions on ML and NLP. Conducted with GDG Cummins, it blends practical workshops, teamwork, and concept-building to help participants explore AI in action.",
    date: "March",
    thumbnail: synapsethumbnail,
    banner: synapse,
    borderColor: "#fdf3e9", // light orange glow
  },
  {
    id: 4,
    title: "Kaggle Competition",
    shortDescription:
      "Compete, learn, and grow through real-world data challenges.",
    description:
      "The AICVS Kaggle Competition is a platform for aspiring data scientists to test their skills, explore datasets, and climb the leaderboard. Participants engage in learning-driven challenges that foster collaboration, experimentation, and problem-solving in machine learning.",
    date: "December",
    thumbnail: kagglethumbnail,
    banner: kaggle,
    borderColor: "#f2f4f5", // light azure glow
  },
  {
    id: 5,
    title: "AICVS × Math Club",
    shortDescription:
      "Where mathematics meets the art of machine learning.",
    description:
      "A collaborative event by AICVS and Math Club exploring the math behind AI — from optimization and probability to the geometry of neural networks. It bridges theoretical understanding with the practical design of intelligent systems.",
    date: "",
    thumbnail: maththumbnail,
    banner: math,
    borderColor: "#346ca3", // blue glow
  },
  {
    id: 6,
    title: "Workshops on Gen AI",
    shortDescription:
      "Explore Gen AI tools through practical, hands-on sessions.",
    description:
      "AICVS Workshops on Generative AI provide interactive learning experiences with tools like ChatGPT, Gemini, and computer vision frameworks. Participants dive into prompt design, model creation, and the future of AI-powered creativity through guided expert sessions.",
    date: "",
    thumbnail: workshopthumbnail,
    banner: workshop,
    borderColor: "#585d8c", // blue glow
  },
];




export const team2024 = [
  {
    id: "0",
    title: "Isha Bhagat",
    text: "Co-Head Coordinator",
    backgroundUrl: benefitCard1,
    iconUrl: benefitIcon1,
    imageUrl: isha,
    light: true,
    members: []
  },
  {
    id: "1",
    title: "Ishita Lele",
    text: "Co-Head Coordinator",
    backgroundUrl: benefitCard2,
    iconUrl: benefitIcon2,
    imageUrl: ishita,
    light: true,
    members: []
  },
  {
    id: "2",
    title: "Kruti Newalkar",
    text: "Web Development Team Lead",
    backgroundUrl: benefitCard3,
    iconUrl: benefitIcon3,
    imageUrl: kruti,
    light: true,
    members: ["Sameeksha Tantak", "Vedika Kayangude", "Sanika Shidore", "Shraddha Sabde", "Akshata Ramgiri"]
  },
  {
    id: "3",
    title: "Varada Gokhale",
    text: "Technical Team Lead",
    backgroundUrl: benefitCard4,
    iconUrl: benefitIcon4,
    imageUrl: varada,
    light: true,
    members: ["Aastha Ingle",
      "Nandini Pathak",
      "Mira Vadjikar",
      "Saniya Karambelkar",
      "Siddhi Faizpurkar"]
  },
  {
    id: "4",
    title: "Yashita Killedar",
    text: "Content and Design Team Lead",
    backgroundUrl: benefitCard5,
    iconUrl: benefitIcon1,
    imageUrl: yashita,
    light: true,
    members: ["Nidhi Patil",
      "Anjali Patel",
      "Tanvi Shirwadkar",
      "Anvi Shelar",
      "Anoushka Wadyalkar",
      "Nainsee Khade"]
  },
  {
    id: "5",
    title: "Siya Shah",
    text: "PR and Sponsorship Team Lead",
    backgroundUrl: benefitCard6,
    iconUrl: benefitIcon2,
    imageUrl: siya,
    light: true,
    members: ["Kavya Thacker",
      "Ananya Dani",
      "Akshata Lolge",
      "Aadya Singh",
      "Shreeya Chavan",
      "Advika Khorgade",
      "Arya Patekhede",
      "Sukhada Bhagwat",
      "Shreya Babar",
      "Garima Kardbhajane"]
  },
];

export const team2023 = [
  {
    id: "6",
    title: "Shreya Watwe",
    text: "Head Coordinator",
    backgroundUrl: benefitCard1,
    iconUrl: benefitIcon1,
    imageUrl: shreya_watwe,
    light: true,
    members: []
  },
  {
    id: "7",
    title: "Janhavi Mishra",
    text: "Projects and Internships Team Lead",
    backgroundUrl: benefitCard4,
    iconUrl: benefitIcon4,
    imageUrl: janhavi_mishra,
    light: true,
    members: ["Aditi Hinge", "Tanya Gadwal", "Yashashri Phalak", "Bhakti Girase", "Siddhi Faizpurkar", "Ishita Lele"]
  },
  {
    id: "8",
    title: "Shreya Agrawal",
    text: "Web Development Team Lead",
    backgroundUrl: benefitCard2,
    iconUrl: benefitIcon3,
    imageUrl: shreya_agrawal,
    light: true,
    members: ["Kruti Newalkar", "Yashoda Kangle", "Gauravi Veling", "Kasturi Mandik"]
  },
  {
    id: "9",
    title: "Vaidehi More",
    text: "Content and Design Team Lead",
    backgroundUrl: benefitCard5,
    iconUrl: benefitIcon1,
    imageUrl: vaidehi_more,
    light: true,
    members: ["Gargi Joshi", "Bhairavi Bhuyar", "Tanjul Manikar", "Anoushka Wadyalkar", "Sharayu Chintal", "Devika Yeola"]
  },
  {
    id: "10",
    title: "Shreya Mote",
    text: "PR and Sponsorship Team Lead",
    backgroundUrl: benefitCard3,
    iconUrl: benefitIcon2,
    imageUrl: shreya_mote,
    light: true,
    members: ["Mrunal Shinde", "Aastha Dhar", "Sanskriti Srivastava", "Isha Asare", "Richa Rathi", "Riya Chaudhari"]
  },
];

export const socials = [

  {
    id: "1",
    title: "Linkedin",
    iconUrl: twitter,
    url: "https://www.linkedin.com/company/cummins-aicvs/",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "https://www.instagram.com/aicvs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: "3",
    title: "Youtube",
    iconUrl: telegram,
    url: "https://www.youtube.com/@aicvscummins3964",
  },

];
