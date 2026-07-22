import { Battery, Cpu, HardDrive, LayoutGrid, MemoryStick, Monitor, ShoppingBag, SlidersHorizontal, Zap } from "lucide-react";
import SonicPodPro from '@/Assets/Products/SonicPodPro.webp'
import type { blog } from "../Page/Blog/BlogCard";

export const product = {
  name: "ProBook Ultra X1",
  badge: "NEW RELEASE",
  rating: 4.9,
  reviews: 124,
  description:
    "Engineered for the elite. The Ultra X1 combines raw power with a breathtaking 4K OLED display and the thinnest aluminum chassis ever created for a professional workstation.",
  price: 2499.0,
  freeShipping: true,
  images: [
    "/products/laptop.webp",
    "/products/laptop-2.webp",
    "/products/laptop-3.webp",
    "/products/laptop-4.webp",
    "/products/laptop-5.webp",
  ],
  specs: [
    { icon: Zap, label: "Ultra Fast", sub: "M3 Max Chip" },
    { icon: Battery, label: "22 Hours", sub: "Battery Life" },
    { icon: Monitor, label: "4K OLED", sub: "Liquid Retina" },
  ],
};

export const specifications = [
  {
    icon: Cpu,
    title: "Processor",
    description: "16-core CPU with 12 performance cores and 4 efficiency cores. Up to 4.5GHz boost frequency.",
  },
  {
    icon: LayoutGrid,
    title: "Graphics",
    description: "40-core GPU with ray tracing acceleration. Dedicated video encode and decode engines.",
  },
  {
    icon: MemoryStick,
    title: "Unified Memory",
    description: "Up to 128GB LPDDR5x RAM with 400GB/s memory bandwidth for massive multitasking.",
  },
  {
    icon: HardDrive,
    title: "Storage",
    description: "Super-fast SSD storage up to 8TB. Sequential read speeds up to 7.4GB/s.",
  },
  {
    icon: SlidersHorizontal,
    title: "Connectivity",
    description: "3x Thunderbolt 4 ports, SDXC card slot, HDMI 2.1, and Wi-Fi 6E support.",
  },
  {
    icon: ShoppingBag,
    title: "Dimensions",
    description: "14-inch display, 1.2cm thin, weighing only 1.4kg. Perfect for professional mobility.",
  },
];

export const reviews = [
  {
    name: "David Chen",
    date: "October 12, 2023",
    rating: 5,
    text: "The Ultra X1 is the first machine that doesn't thermal throttle when I'm compiling large projects. The keyboard is exceptionally tactile and the build quality rivals high-end watchmaking.",
  },
  {
    name: "Elena Rodriguez",
    date: "September 28, 2023",
    rating: 5,
    text: "As a colorist, screen accuracy is everything. The OLED panel on the Ultra X1 is flawless. It's light enough for my commute but powerful enough for 8K video rendering in the studio.",
  },
  {
    name: "Marcus Thompson",
    date: "November 5, 2023",
    rating: 5,
    text: "I've been a Windows user for 15 years, but the Ultra X1 made me switch to Mac. The battery life is unbelievable - I can go two full workdays without charging. The display makes my photo editing feel like I'm looking at prints. Absolutely worth every penny.",
    }
];

export const categories=[
  "Earbuds","Smartwatches","Laptops","Tablets"
]

export const earbuds = [
  { id: 1, image: SonicPodPro, name: "EarBuds Pro", subtitle: "Active Noise Cancellation", price: 179.00, isNew: true },
  { id: 2, image: SonicPodPro, name: "AirBeam Elite", subtitle: "Spatial Audio", price: 149.00 },
  { id: 3, image: SonicPodPro, name: "SonicBuds X", subtitle: "30Hr Battery Life", price: 99.00 },
  { id: 4, image: SonicPodPro, name: "NoiseFree Max", subtitle: "Hybrid ANC", price: 219.00, isNew: true },
  { id: 5, image: SonicPodPro, name: "BassDrop Pro", subtitle: "Deep Bass Edition", price: 129.00 },
  { id: 6, image: SonicPodPro, name: "ClearTone X", subtitle: "Crystal Clear Audio", price: 89.00 },
  { id: 7, image: SonicPodPro, name: "StudioBuds Max", subtitle: "Studio Quality Sound", price: 259.00, isNew: true },
];

export const promises = [
  {
    title: "Precision Engineering",
    description: "Micron-perfect tolerance in every single component we manufacture."
  },
  {
    title: "Minimalist Design",
    description: "Focusing on the essence. Reducing noise to amplify your performance."
  },
  {
    title: "Ethical Sourcing",
    description: "Responsible materials for a sustainable technological future."
  },
  {
    title: "Customer Centricity",
    description: "Personalized support that respects your time and intelligence."
  }
];

export const stats = [
  {
    value: "50k+",
    label: "PRODUCTS CRAFTED"
  },
  {
    value: "120+",
    label: "DESIGN AWARDS"
  },
  {
    value: "15+",
    label: "GLOBAL OFFICES"
  },
  {
    value: "24/7",
    label: "EXPERT SUPPORT"
  }
];

export const reasons = [
  {
    title: "Engineered for Performance",
    description: "Every accessory undergoes rigorous acoustic and structural calibration to match international premium standards.",
    highlight: "100% QC Tested",
  },
  {
    title: "Designed in Nepal",
    description: "Tailored localized tech architecture and design aesthetics optimized specifically for the modern lifestyle.",
    highlight: "Local Innovation",
  },
  {
    title: "1-Year Direct Warranty",
    description: "No-hassle instant replacements and dedicated customer support counters across major tech hubs.",
    highlight: "Instant Claim",
  },
];

export const brands = ["SonicWave", "AeroSound", "PulseTech", "NovaTech"];

export const searchProducts = [
  { id: 1, image: SonicPodPro, name: "EarBuds Pro", subtitle: "Active Noise Cancellation", category: "Earbuds", brand: "SonicWave", price: 179.00, rating: 4.8, isNew: true, onSale: false },
  { id: 2, image: SonicPodPro, name: "AirBeam Elite", subtitle: "Spatial Audio", category: "Earbuds", brand: "AeroSound", price: 149.00, rating: 4.5, isNew: false, onSale: true },
  { id: 3, image: SonicPodPro, name: "SonicBuds X", subtitle: "30Hr Battery Life", category: "Earbuds", brand: "PulseTech", price: 99.00, rating: 4.2, isNew: false, onSale: false },
  { id: 4, image: SonicPodPro, name: "NoiseFree Max", subtitle: "Hybrid ANC", category: "Earbuds", brand: "NovaTech", price: 219.00, rating: 4.9, isNew: true, onSale: false },
  { id: 5, image: SonicPodPro, name: "BassDrop Pro", subtitle: "Deep Bass Edition", category: "Earbuds", brand: "SonicWave", price: 129.00, rating: 4.0, isNew: false, onSale: true },
  { id: 6, image: SonicPodPro, name: "PulseWatch Ultra", subtitle: "GPS + Heart Rate", category: "Smartwatches", brand: "PulseTech", price: 249.00, rating: 4.6, isNew: true, onSale: false },
  { id: 7, image: SonicPodPro, name: "AeroFit Watch", subtitle: "Fitness Tracker", category: "Smartwatches", brand: "AeroSound", price: 179.00, rating: 4.3, isNew: false, onSale: true },
  { id: 8, image: SonicPodPro, name: "NovaTime Pro", subtitle: "AMOLED Display", category: "Smartwatches", brand: "NovaTech", price: 299.00, rating: 4.7, isNew: false, onSale: false },
  { id: 9, image: SonicPodPro, name: "ProBook Air", subtitle: "13-inch Ultralight", category: "Laptops", brand: "NovaTech", price: 1299.00, rating: 4.8, isNew: true, onSale: false },
  { id: 10, image: SonicPodPro, name: "WorkStation X", subtitle: "16-core Performance", category: "Laptops", brand: "PulseTech", price: 1899.00, rating: 4.9, isNew: false, onSale: false },
  { id: 11, image: SonicPodPro, name: "StudioBook 14", subtitle: "OLED Creator Edition", category: "Laptops", brand: "SonicWave", price: 1599.00, rating: 4.5, isNew: false, onSale: true },
  { id: 12, image: SonicPodPro, name: "TabletPro 11", subtitle: "Liquid Retina Display", category: "Tablets", brand: "AeroSound", price: 599.00, rating: 4.4, isNew: true, onSale: false },
  { id: 13, image: SonicPodPro, name: "AeroPad Mini", subtitle: "Compact & Portable", category: "Tablets", brand: "NovaTech", price: 399.00, rating: 4.1, isNew: false, onSale: true },
  { id: 14, image: SonicPodPro, name: "PulsePad Max", subtitle: "Stylus Included", category: "Tablets", brand: "PulseTech", price: 749.00, rating: 4.6, isNew: false, onSale: false },
];

export const navItems=[
    {
        label:"Shop",
        path:"/shop"
    },
    {
        label:"About Us",
        path:"/aboutus"
    },
    {
        label:"Blogs",
        path:"/blogs"
    },
]

export const sampleBlogs: blog[] = [
  {
    id: "blog-001",
    title: "SonicPod Pro: The Future of Immersive Audio",
    slug: "sonicpod-pro-future-immersive-audio",
    excerpt:
      "Discover how the SonicPod Pro redefines spatial sound with cutting‑edge DSP and ergonomic design. A deep dive into the engineering behind the sensation.",
    featured_image: "@/Assets/Products/SonicPodPro.webp",
    author_id: "author-1",
    author_name: "Aria Chen",
    is_published: true,
    published_at: "2025-07-15T09:30:00Z",
    created_at: "2025-07-10T14:20:00Z",
  },
  {
    id: "blog-002",
    title: "Why Every Audiophile Needs a SonicPod Pro",
    slug: "why-audiophile-needs-sonicpod-pro",
    excerpt:
      "From lossless wireless streaming to custom‑tuned drivers, we break down why this earbud is the new must‑have for serious listeners.",
    featured_image: "@/Assets/Products/SonicPodPro.webp",
    author_id: "author-2",
    author_name: "Marcus Rivera",
    is_published: true,
    published_at: "2025-07-18T11:15:00Z",
    created_at: "2025-07-12T16:45:00Z",
  },
  {
    id: "blog-003",
    title: "SonicPod Pro vs. AirPods Pro: The Ultimate Showdown",
    slug: "sonicpod-pro-vs-airpods-pro",
    excerpt:
      "We pit the SonicPod Pro against Apple’s titan in noise cancellation, battery life, and audio fidelity – the results may surprise you.",
    featured_image: "@/Assets/Products/SonicPodPro.webp",
    author_id: "author-3",
    author_name: "Priya Sharma",
    is_published: true,
    published_at: "2025-07-20T13:00:00Z",
    created_at: "2025-07-14T10:10:00Z",
  },
  {
    id: "blog-004",
    title: "How SonicPod Pro is Changing Remote Work",
    slug: "sonicpod-pro-changing-remote-work",
    excerpt:
      "With crystal‑clear mics and adaptive ANC, the SonicPod Pro isn’t just for music – it’s the ultimate productivity partner for WFH warriors.",
    featured_image: "@/Assets/Products/SonicPodPro.webp",
    author_id: "author-4",
    author_name: "Jordan Lee",
    is_published: true,
    published_at: "2025-07-22T08:45:00Z",
    created_at: "2025-07-17T11:30:00Z",
  },
  {
    id: "blog-005",
    title: "The Design Philosophy Behind SonicPod Pro",
    slug: "design-philosophy-sonicpod-pro",
    excerpt:
      "From the sleek charging case to the ergonomic ear tips, every detail of the SonicPod Pro is crafted for comfort and style – meet the designers.",
    featured_image: "@/Assets/Products/SonicPodPro.webp",
    author_id: "author-5",
    author_name: "Emma Watson",
    is_published: true,
    published_at: "2025-07-25T10:20:00Z",
    created_at: "2025-07-19T09:00:00Z",
  },
  {
    id: "blog-006",
    title: "SonicPod Pro: 5 Hidden Features You’ll Love",
    slug: "sonicpod-pro-5-hidden-features",
    excerpt:
      "Beyond the specs, we uncover five lesser‑known tricks that make the SonicPod Pro a joy to use – from gesture shortcuts to voice assistant integration.",
    featured_image: "@/Assets/Products/SonicPodPro.webp",
    author_id: "author-6",
    author_name: "David Kim",
    is_published: true,
    published_at: "2025-07-28T16:00:00Z",
    created_at: "2025-07-20T13:15:00Z",
  },
];
