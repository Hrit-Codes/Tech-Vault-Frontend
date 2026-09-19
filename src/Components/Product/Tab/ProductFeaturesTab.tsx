import { CheckCircle } from "lucide-react";

type ProductFeaturesTabProps={
    features:string[];
}
export default function ProductFeaturesTab({features}:ProductFeaturesTabProps) {
    return (
        <div className="w-full py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-section-alternative border border-secondary-400/5 hover:border-primary-400/30 transition-colors"
                    >
                        <CheckCircle size={18} className="text-primary-400 shrink-0" strokeWidth={2.5} />
                        <p className="text-sm font-semibold">{feature}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
