const rows = [
  { feature: 'Monthly Cost', agency: '$1,000–$5,000', skooped: 'From $49/mo' },
  { feature: 'Availability', agency: 'Business hours', skooped: '24/7 AI + Human' },
  { feature: 'Dashboard Access', agency: 'Rarely', skooped: 'Always' },
  { feature: 'AI-Powered', agency: false, skooped: true },
  { feature: 'Long Contracts', agency: '12+ months', skooped: 'None' },
  { feature: 'Setup Time', agency: 'Weeks/Months', skooped: 'Days' },
]

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <span className="text-[#4CAF50] font-bold">✓</span>
  if (value === false) return <span className="text-[#D94A7A] font-bold">✗</span>
  return <>{value}</>
}

export default function ComparisonTable() {
  return (
    <section className="bg-[#F7F2ED] py-16 px-6">
      <h2 className="text-3xl font-black text-center text-[#361C24] mb-8">
        How we compare
      </h2>

      <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-[#E0D4C4] shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-[#361C24] text-[#FDFAF7] py-3 px-5 text-sm text-left">
                Feature
              </th>
              <th className="bg-[#361C24] text-[#9A8A7E] py-3 px-5 text-sm text-center">
                Traditional Agency
              </th>
              <th className="bg-[#D94A7A] text-white py-3 px-5 text-sm text-center font-bold">
                Skooped
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.feature}
                className={i % 2 === 0 ? 'bg-[#F2E8D6]' : 'bg-[#FDFAF7]'}
              >
                <td className="py-3 px-5 text-sm text-[#361C24] font-medium">{row.feature}</td>
                <td className="py-3 px-5 text-sm text-[#7A6458] text-center">
                  <CellValue value={row.agency} />
                </td>
                <td className="py-3 px-5 text-sm text-[#361C24] font-semibold text-center">
                  <CellValue value={row.skooped} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
