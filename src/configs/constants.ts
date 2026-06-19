import { Battery, Cpu, HardDrive, LayoutGrid, MemoryStick, Monitor, ShoppingBag, SlidersHorizontal, Zap } from "lucide-react";

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