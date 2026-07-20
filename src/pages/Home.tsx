import { Link } from 'react-router-dom'

export default function Home() {
  const countries = [{name:'Singapore',percentage:'32%',status:'Confirmed'},{name:'Thailand',percentage:'10%',status:'Confirmed'},{name:'Vietnam',percentage:'16%',status:'Confirmed'},{name:'Maldives',percentage:'08%',status:'Confirmed'},{name:'Sri Lanka',percentage:'01%',status:'Confirmed'},{name:'Japan',percentage:'TBA',status:'WIP'},{name:'South Korea',percentage:'TBA',status:'WIP'},{name:'Other Asian Countries',percentage:'33%',status:'Confirmed'}]
  const esgEnvironmental = ['Energy Usage & Efficiency','Climate Change Strategy','Waste Reduction','Biodiversity Loss','Greenhouse Gas Emissions','Carbon Footprint Reduction']
  const esgSocial = ['Fair Pay and Living Wages','Equal Employment Opportunity','Employee Benefits','Workplace Health & Safety','Community Engagement','Responsible Supply-Chain Partnerships','Adhering to Labor Laws']
  const esgGovernance = ['Corporate Governance','Risk Management','Compliance','Ethical Business Practices','Avoiding Conflicts of Interest','Accounting Integrity & Transparency']

  return (
    <div className="bg-white">
      <section className="relative h-96 bg-gradient-to-r from-dmc-dark via-dmc-turquoise to-dmc-light-turquoise flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-10 right-10 w-96 h-96 bg-dmc-gold rounded-full mix-blend-multiply filter blur-xl"></div><div className="absolute bottom-10 left-10 w-96 h-96 bg-dmc-turquoise rounded-full mix-blend-multiply filter blur-xl"></div></div>
        <div className="relative text-center text-white px-4 z-10"><h1 className="text-5xl font-bold mb-4">Premier Specialists in Capital-Raising Solutions</h1><p className="text-xl mb-8">Tailored Funding for Diverse Projects and Investment Opportunities</p></div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="section-title text-center">Services</h2>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">DeWitt Moss Capital stands as a premier specialist in the capital-raising sector, specializing in the provision of bespoke funding solutions meticulously crafted to address the unique requirements of diverse projects and investment opportunities.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className="bg-gradient-to-br from-white to-gray-50 p-8 border-l-4 border-dmc-gold rounded-lg hover:shadow-xl transition-shadow"><h3 className="text-2xl font-bold text-dmc-gold mb-3">Equity Investments</h3><p className="text-gray-700">Stake acquisition in project assets, allowing us to benefit from their growth and profitability.</p></div><div className="bg-gradient-to-br from-white to-gray-50 p-8 border-l-4 border-dmc-turquoise rounded-lg hover:shadow-xl transition-shadow"><h3 className="text-2xl font-bold text-dmc-turquoise mb-3">Debt Financing</h3><p className="text-gray-700">Structured loans, ensuring a consistent income stream.</p></div><div className="bg-gradient-to-br from-white to-gray-50 p-8 border-l-4 border-dmc-gold rounded-lg hover:shadow-xl transition-shadow"><h3 className="text-2xl font-bold text-dmc-gold mb-3">Convertible Loans</h3><p className="text-gray-700">Flexible financing options to convert debt into equity.</p></div><div className="bg-gradient-to-br from-white to-gray-50 p-8 border-l-4 border-dmc-turquoise rounded-lg hover:shadow-xl transition-shadow"><h3 className="text-2xl font-bold text-dmc-turquoise mb-3">Blended Approach</h3><p className="text-gray-700">Strategic combination of methods to maximize returns while minimizing risk.</p></div></div>
      </section>

      <section className="bg-gradient-to-r from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Strategy</h2>
          <p className="text-lg text-gray-700 mb-8">At DeWitt Moss Capital, our strategic framework is centred on attaining a realistic and achievable Internal Rate of Return through targeted investments in both established and emerging markets.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12"><div><h3 className="section-heading text-dmc-turquoise">Targeted Market Engagement</h3><p className="text-gray-700">We prioritize investments in pivotal markets that exhibit substantial growth potential.</p></div><div><h3 className="section-heading text-dmc-gold">Emphasis on Scalability</h3><p className="text-gray-700">We identify projects that possess the capacity for scalability and future expansion.</p></div></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="section-title">Market Focus</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{countries.map((country) => (<div key={country.name} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg border border-dmc-gold hover:shadow-lg transition-shadow"><span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${country.status === 'Confirmed' ? 'bg-dmc-turquoise text-white' : 'bg-dmc-gold text-white'}`}>{country.status}</span><p className="text-3xl font-bold text-dmc-dark my-2">{country.percentage}</p><p className="text-dmc-dark font-semibold">{country.name}</p></div>))}</div>
      </section>

      <section className="bg-dmc-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Corporate Responsibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div><h3 className="text-2xl font-bold text-dmc-gold mb-6">Environmental</h3><ul className="space-y-3">{esgEnvironmental.map((item, i) => (<li key={i} className="flex items-start gap-3"><span className="text-dmc-turquoise">•</span><span className="text-gray-300">{item}</span></li>))}</ul></div>
            <div><h3 className="text-2xl font-bold text-dmc-turquoise mb-6">Social</h3><ul className="space-y-3">{esgSocial.map((item, i) => (<li key={i} className="flex items-start gap-3"><span className="text-dmc-gold">•</span><span className="text-gray-300">{item}</span></li>))}</ul></div>
            <div><h3 className="text-2xl font-bold text-dmc-gold mb-6">Governance</h3><ul className="space-y-3">{esgGovernance.map((item, i) => (<li key={i} className="flex items-start gap-3"><span className="text-dmc-turquoise">•</span><span className="text-gray-300">{item}</span></li>))}</ul></div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-dmc-turquoise to-dmc-light-turquoise py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Schedule a Meeting</h2>
          <Link to="/contact" className="inline-block px-10 py-4 bg-dmc-dark text-white font-bold rounded-lg hover:bg-dmc-gold transition-all">Contact Us</Link>
        </div>
      </section>
    </div>
  )
}