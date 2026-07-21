type ProductDescriptionTabProps = {
    description?: string;
}

const defaultProductDescription = `The Airmars ABW06 Earbuds provide a convenient way to enjoy compatible audio content without the restrictions of a wired connection. Designed for everyday listening, these wireless earbuds are suitable for music, calls, videos, online classes, podcasts, gaming, workouts, travel, and other entertainment when paired with a supported device.

Their stylish blue finish gives the earbuds a distinctive, modern appearance that complements a range of personal styles and electronic devices. Their compact format makes them a practical audio accessory for use at home, in the office, during study sessions, while commuting, or throughout your daily routine.

The Airmars ABW06 Earbuds can connect to compatible smartphones, tablets, laptops, desktop computers, and other devices that support the required wireless audio connection. Once paired, they allow you to listen without keeping your device physically connected by an audio cable. Available controls, call functions, audio performance, and connection stability may vary depending on the paired device, software, wireless environment, operating distance, and compatibility.

These earbuds are suitable for users looking for a straightforward and portable wireless listening solution. Before purchasing, please confirm that your intended device supports wireless earbud connectivity. Charging requirements, battery duration, operating range, control functions, water resistance, and included accessories should be checked against the product packaging or supplied instructions rather than assumed.

Choose the Airmars ABW06 Earbuds in Blue for convenient everyday listening, portable use, and a stylish colour that stands out.`;

export default function ProductDescriptionTab({
    description,
}: ProductDescriptionTabProps) {
    const content = description || defaultProductDescription;
    const paragraphs = content.split("\n\n");

    return (
        <div className="w-full py-10 flex flex-col gap-4">
            {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed font-semibold text-description">
                    {paragraph}
                </p>
            ))}
        </div>
    );
}
