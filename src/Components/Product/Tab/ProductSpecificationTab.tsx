const defaultSpecifications = [
    { label: "Build", value: "Plastic Body" },
    { label: "Shape", value: "In-Ear Stem Design" },
    { label: "IP Rating", value: "Not Specified" },
    { label: "Noise Cancellation", value: "Passive Noise Isolation" },
    { label: 'Impedance (ohms)', value: '32Ω' },
    { label: 'Playtime', value: '3-5 Hours' },
    { label: 'Bluetooth Versions', value: 'Bluetooth 5.3' },
    { label: 'Charging Time', value: '1.5-2 Hours' },
    { label: 'Case Battery Capacity', value: '300mAh' },
    { label: 'Frequency Response Range', value: '20Hz-20kHz' },
]

export default function ProductSpecificationTab() {
    const specifications = defaultSpecifications;
    return (
        <div className="w-full py-10 max-w-3xl">
            <div className="rounded-2xl border border-secondary-400/5 bg-section overflow-hidden">
                <table className="w-full border-collapse text-left">
                    <thead className="font-bold text-base">
                        <tr className="bg-section-alternative py-3.5 px-5">
                            <td className="py-3.5 px-5 font-bold border-r border-secondary-400/10">Specifications</td>
                            <td className="py-3.5 px-5 font-bol">Value</td>
                        </tr>
                    </thead>
                    <tbody>
                        {specifications.map((item, index) => (
                            <tr
                                key={index}
                                className={`text-sm ${index !== specifications.length - 1 ? "border-b border-secondary-400/10" : ""}`}
                            >
                                <td className="py-3.5 px-5 font-semibold border-r border-secondary-400/10 text-description w-1/2">
                                    {item.label}
                                </td>
                                <td className="py-3.5 px-5 font-bold">
                                    {item.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
