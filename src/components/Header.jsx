import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Header({openAppointmentForm}) {
  return (
    <header className="bg-gray-800 flex justify-between items-center px-8 py-4 shadow-lg">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-red-50 rounded-full overflow-hidden flex items-center justify-center">
            <Image 
              src="/hospital-logo.jpeg" 
              alt="Hospital logo" 
              width={40} 
              height={40}
              className="object-cover"
            />
          </div>
          <div className="text-3xl font-bold text-cyan-500 ml-2 font-serif">MediCare</div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-white hover:text-cyan-400 transition-colors">
            Admin Login
          </Link>
          <button 
            className="bg-cyan-600 text-black font-bold py-3 px-6 rounded font-serif"
            onClick={openAppointmentForm}
          >
            Book Appointment
          </button>
        </div>
        <div className="md:hidden text-2xl">&#9776;</div>
      </header>
  )
}

export default Header