import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-950 py-10 px-4 text-sm">
    <div className="max-w-6xl mx-auto flex flex-wrap justify-between mb-6 gap-10">
      <div className="flex-1 min-w-64">
        <h3 className="text-2xl text-blue-500 mb-3 font-sans">HospitalCare</h3>
        <p className="text-gray-400 font-serif">Empowering hospitals with modern, efficient management solutions.</p>
      </div>
      <div className="flex-1 min-w-64">
        <h4 className="text-lg font-medium mb-2">Contact</h4>
        <p className="text-gray-400 font-serif">Email: support@hospitalcare.com</p>
        <p className="text-gray-400 font-serif">Phone: +91 98765 43210</p>
      </div>
    </div>
    <div className="border-t border-gray-800 pt-4 text-center text-gray-500">
      <p>&copy; 2025 HospitalCare. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer;