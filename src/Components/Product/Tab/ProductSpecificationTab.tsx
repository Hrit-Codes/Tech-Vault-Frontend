type ProductSpecificationTabProps = {
  specifications: Record<string, string>;
};

export default function ProductSpecificationTab({
  specifications,
}: ProductSpecificationTabProps) {
  const entries = Object.entries(specifications);

  return (
    <div className="w-full py-10 max-w-3xl">
      <div className="rounded-2xl border border-secondary-400/5 bg-section overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead className="font-bold text-base">
            <tr className="bg-section-alternative py-3.5 px-5">
              <td className="py-3.5 px-5 font-bold border-r border-secondary-400/10">
                Specifications
              </td>
              <td className="py-3.5 px-5 font-bold">Value</td>
            </tr>
          </thead>
          <tbody>
            {entries.map(([label, value], index) => (
              <tr
                key={label}
                className={`text-sm ${
                  index !== entries.length - 1
                    ? "border-b border-secondary-400/10"
                    : ""
                }`}
              >
                <td className="py-3.5 px-5 font-semibold border-r border-secondary-400/10 text-description w-1/2">
                  {label}
                </td>
                <td className="py-3.5 px-5 font-bold">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}