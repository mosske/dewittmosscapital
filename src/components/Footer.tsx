import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dmc-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-dmc-gold font-bold text-lg mb-4">DeWitt Moss Capital</h3>
            <p className="text-gray-400 text-sm">Premier specialists in capital-raising solutions, delivering innovative financial strategies across Asia.</p>
          </div>
          <div>
            <h3 className="text-dmc-turquoise font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-dmc-turquoise transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-dmc-turquoise transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-dmc-turquoise transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-dmc-gold font-bold text-lg mb-4">Contact Details</h3>
            <div className="text-sm text-gray-400 space-y-2">
              <p>65 Chulia Street #36-02</p>
              <p>OCBC Centre, Singapore 049513</p>
              <p className="mt-4">Email: info@dewittmosscapital.com</p>
              <p>Mon to Fri: 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">© 2026 DeWitt Moss Capital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}