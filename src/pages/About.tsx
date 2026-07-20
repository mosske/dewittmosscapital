export default function About() {
  const visionStatements = ["To be the leading provider of bespoke funding solutions that empower innovative projects across Asia and beyond.","To revolutionize the capital-raising landscape by delivering innovative financial strategies tailored to the unique needs of our clients.","To expand our global footprint and establish DeWitt Moss Capital as the premier specialist in capital raising.","To champion sustainable investment practices by embedding ESG compliance into our funding solutions."]

  return (
    <div className="bg-white">
      <section className="relative h-80 bg-gradient-to-r from-dmc-dark to-dmc-gold flex items-center justify-center"><div className="relative text-center text-white"><h1 className="text-5xl font-bold">About Us</h1></div></section>
      <section className="max-w-7xl mx-auto px-4 py-20"><p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">DeWitt Moss Capital specializes in delivering customized funding solutions meticulously designed to address the distinct requirements of various projects and investment opportunities.</p></section>
      <section className="bg-gradient-to-r from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-dmc-dark mb-4">Our Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{visionStatements.map((statement, index) => (<div key={index} className="bg-white p-8 rounded-lg border-l-4 border-dmc-gold"><p className="text-3xl font-bold text-dmc-turquoise mb-4">{index + 1}</p><p className="text-gray-700">{statement}</p></div>))}</div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-dmc-dark mb-12">Founding Partners</h2>
        <p className="text-lg text-gray-700 mb-16 max-w-3xl">Shane DeWitt, Keith Moss and Arjun Dosaj bring over 77 years of combined experience in the finance sector.</p>
        <div className="space-y-16">
          <div className="bg-gradient-to-r from-gray-50 to-white p-12 rounded-lg border-l-4 border-dmc-turquoise"><h3 className="text-3xl font-bold text-dmc-gold mb-6">Keith E. Moss</h3><p className="text-gray-700 mb-4">Over 25 years in commercial banking and finance, specializing in global cash management and project management. Held significant roles at HSBC, OCBC, Royal Bank of Scotland, Wachovia and Wells Fargo.</p></div>
          <div className="bg-gradient-to-r from-gray-50 to-white p-12 rounded-lg border-l-4 border-dmc-turquoise"><h3 className="text-3xl font-bold text-dmc-gold mb-6">Shane M. DeWitt</h3><p className="text-gray-700 mb-4">Over 22 years in banking and finance with expertise in business development and client relationship management. Successfully managed portfolios for high-level clients globally.</p></div>
          <div className="bg-gradient-to-r from-gray-50 to-white p-12 rounded-lg border-l-4 border-dmc-turquoise"><h3 className="text-3xl font-bold text-dmc-gold mb-6">Arjun Dosaj</h3><p className="text-gray-700 mb-4">Over 30 years of global experience in Real Estate, Private Equity, Insurance, and Banking. Managed portfolio exceeding $4 billion in real estate assets across Asia.</p></div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-dmc-turquoise to-dmc-light-turquoise py-16"><div className="max-w-4xl mx-auto px-4 text-center"><h2 className="text-3xl font-bold text-white mb-4">Ready to Partner With Us?</h2><a href="/contact" className="inline-block px-10 py-4 bg-dmc-dark text-white font-bold rounded-lg hover:bg-dmc-gold">Get in Touch</a></div></section>
    </div>
  )
}