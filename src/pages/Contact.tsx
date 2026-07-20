import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({firstName:'',lastName:'',email:'',message:''})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {const { name, value } = e.target;setFormData(prev => ({...prev,[name]:value}))}
  const handleSubmit = (e) => {e.preventDefault();setSubmitted(true);setTimeout(() => {setFormData({firstName:'',lastName:'',email:'',message:''});setSubmitted(false)}, 3000)}

  return (
    <div className="bg-white">
      <section className="relative h-80 bg-gradient-to-r from-dmc-gold to-dmc-turquoise flex items-center justify-center"><div className="text-center text-white"><h1 className="text-5xl font-bold">Contact Us</h1></div></section>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div><h2 className="text-3xl font-bold text-dmc-dark mb-8">Get In Touch</h2><div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg border-l-4 border-dmc-gold mb-8"><h3 className="text-xl font-bold text-dmc-gold mb-4">Contact Details</h3><p className="text-gray-700 text-sm mb-4">65 Chulia Street #36-02<br/>OCBC Centre, Singapore 049513</p><p className="text-dmc-turquoise">info@dewittmosscapital.com</p></div><div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg border-l-4 border-dmc-turquoise"><h3 className="text-xl font-bold text-dmc-turquoise mb-4">Working Hours</h3><p className="text-gray-700">Monday - Friday<br/>9:00 AM – 6:00 PM SGT</p></div></div>
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-50 to-white p-12 rounded-lg border-2 border-dmc-gold">
              <h2 className="text-3xl font-bold text-dmc-dark mb-8">Send Us A Message</h2>
              {submitted && <div className="bg-dmc-turquoise text-white p-4 rounded-lg mb-8 text-center"><p>Thank you! Your message has been sent successfully.</p></div>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-dmc-turquoise" />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-dmc-turquoise" />
                </div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-dmc-turquoise" />
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Message" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-dmc-turquoise" />
                <button type="submit" className="w-full bg-gradient-to-r from-dmc-turquoise to-dmc-light-turquoise text-white font-bold py-3 rounded-lg">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-dmc-dark text-white py-16"><div className="max-w-7xl mx-auto px-4"><div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"><div><p className="text-3xl font-bold text-dmc-turquoise mb-2">65 Chulia Street</p><p className="text-gray-400">Singapore 049513</p></div><div><p className="text-3xl font-bold text-dmc-gold mb-2">info@dewittmosscapital.com</p></div><div><p className="text-3xl font-bold text-dmc-turquoise mb-2">Mon - Fri</p><p className="text-gray-400">9:00 AM – 6:00 PM SGT</p></div></div></div></section>
    </div>
  )
}