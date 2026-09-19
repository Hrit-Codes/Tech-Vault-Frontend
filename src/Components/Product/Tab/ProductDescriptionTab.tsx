type ProductDescriptionTabProps = {
    description?: string;
}

export default function ProductDescriptionTab({
    description,
}: ProductDescriptionTabProps) {

    return (
        <div className="w-full py-10 flex flex-col gap-4">
            <p className="text-sm leading-relaxed font-semibold text-description">
                {description}
            </p>
        </div>
    );
}
