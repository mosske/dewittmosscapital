import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="bg-white border-b-2 border-dmc-gold sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-dmc-gold">DeWitt Moss</span>
              <span className="text-xs text-dmc-turquoise font-semibold">CAPITAL</span>
            </div>
          </Link>
          <div className="flex gap-8 items-center">
            <Link to="/" className="text-dmc-dark font-semibold hover:text-dmc-turquoise transition-colors">Home</Link>
            <Link to="/about" className="text-dmc-dark font-semibold hover:text-dmc-turquoise transition-colors">About</Link>
            <Link to="/contact" className="text-dmc-dark font-semibold hover:text-dmc-turquoise transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}