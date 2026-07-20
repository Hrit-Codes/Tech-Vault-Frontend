import { Truck, Headset, Banknote, ShieldCheck, type LucideIcon } from "lucide-react";

const perks: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders across Nepal" },
  { icon: Headset, title: "24/7 Online Support", desc: "Humans on call, whenever you need us" },
  { icon: Banknote, title: "Cash on Delivery", desc: "Pay when your order arrives" },
  { icon: ShieldCheck, title: "6 Month Warranty", desc: "Guaranteed quality on every purchase" },
];

function PerkItem({ icon: Icon, title, desc }: (typeof perks)[number]) {
  return (
    <div className="flex items-center gap-4 px-8 shrink-0 ">
      <div className="w-12 h-12 rounded-xl bg-section border border-secondary-400/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary-400" />
      </div>
      <div className="whitespace-nowrap">
        <p className="font-bold text-sm">{title}</p>
        <p className="text-xs text-description">{desc}</p>
      </div>
    </div>
  );
}

export default function TrustSection() {
  return (
    <div className="w-full bg-section-alternative border-y border-secondary-400/10 overflow-hidden">
      <div className="flex w-max py-8 animate-marquee hover:[animation-play-state:paused]">
        {[...perks, ...perks].map((perk, i) => (
          <PerkItem key={i} {...perk} />
        ))}
      </div>
    </div>
  );
}
