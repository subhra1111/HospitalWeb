"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import ContactSection from './contact';
import { ClipboardList, Calendar, Users, Bell } from 'lucide-react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../conig/firebase';

const HospitalManagement = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    age: '',
    disease: '',
    phone: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [doctors, setDoctors] = useState([]);

  const openAppointmentForm = () => setShowAppointmentModal(true);
  const closeAppointmentForm = () => setShowAppointmentModal(false);
  const openDoctorModal = () => {
    fetchDoctors();
    setShowDoctorModal(true);
  };
  const closeDoctorModal = () => setShowDoctorModal(false);
  const openAboutModal = () => setShowAboutModal(true);
  const closeAboutModal = () => setShowAboutModal(false);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'appointments'), {
        ...appointmentData,
        createdAt: new Date()
      });
      
      setSubmitStatus({
        success: true,
        message: 'Appointment booked successfully!'
      });
      
      setAppointmentData({
        name: '',
        age: '',
        disease: '',
        phone: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      setTimeout(() => {
        closeAppointmentForm();
        setSubmitStatus({ success: false, message: '' });
      }, 2000);
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Error booking appointment. Please try again.'
      });
    }
  };

  const fetchDoctors = async () => {
    try {
      const doctorsSnapshot = await getDocs(collection(db, 'doctors'));
      const doctorsData = doctorsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <Header openAppointmentForm={openAppointmentForm} />

      {/* Hero Section */}
      <section className="relative py-24 text-center min-h-[500px] flex items-center justify-center">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.freepik.com/free-vector/flat-hand-drawn-patient-taking-medical-examination_52683-57829.jpg"
            alt="Hospital background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 min-w-72 overflow-hidden text-white">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sans drop-shadow-lg">
              Modern Hospital Management System
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-6 font-serif max-w-2xl mx-auto">
              Our hospital does two things. First, we care for our patients, and second, we teach young doctors.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button
                className="mt-2 py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md"
                onClick={openDoctorModal}
              >
                Available Doctors
              </button>
              <button
                className="mt-2 py-3 px-6 bg-white hover:bg-gray-100 text-sky-600 rounded-lg font-medium transition-all duration-300 shadow-md"
                onClick={openAboutModal}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-16 text-center px-4">
  <h2 className="text-4xl text-blue-400 mb-2 font-sans font-bold">Powerful Features</h2>
  <p className="text-lg text-gray-300 mb-10 font-serif">We have everything that makes our hospital smart</p>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
    {/* Patient Records */}
    <div className="bg-gray-700 hover:bg-gray-600 p-6 rounded-xl shadow-lg transition-all hover:transform hover:-translate-y-1">
      <div className="w-12 h-12 mb-4 mx-auto bg-blue-500/10 p-3 rounded-full flex items-center justify-center">
        <ClipboardList className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-xl mb-2 font-medium text-white">Patient Records</h3>
      <p className="text-gray-300">Securely manage patient histories, prescriptions, and reports.</p>
    </div>

    {/* Appointments */}
    <div className="bg-gray-700 hover:bg-gray-600 p-6 rounded-xl shadow-lg transition-all hover:transform hover:-translate-y-1">
      <div className="w-12 h-12 mb-4 mx-auto bg-green-500/10 p-3 rounded-full flex items-center justify-center">
        <Calendar className="w-8 h-8 text-green-400" />
      </div>
      <h3 className="text-xl mb-2 font-medium text-white">Appointments</h3>
      <p className="text-gray-300">Schedule, modify, and track appointments with real-time updates.</p>
    </div>

    {/* Staff Management */}
    <div className="bg-gray-700 hover:bg-gray-600 p-6 rounded-xl shadow-lg transition-all hover:transform hover:-translate-y-1">
      <div className="w-12 h-12 mb-4 mx-auto bg-purple-500/10 p-3 rounded-full flex items-center justify-center">
        <Users className="w-8 h-8 text-purple-400" />
      </div>
      <h3 className="text-xl mb-2 font-medium text-white">Staff Management</h3>
      <p className="text-gray-300">Monitor doctor availability, roles, and shift schedules in one place.</p>
    </div>

    {/* Real-Time Alerts */}
    <div className="bg-gray-700 hover:bg-gray-600 p-6 rounded-xl shadow-lg transition-all hover:transform hover:-translate-y-1">
      <div className="w-12 h-12 mb-4 mx-auto bg-red-500/10 p-3 rounded-full flex items-center justify-center">
        <Bell className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-xl mb-2 font-medium text-white">Real-Time Alerts</h3>
      <p className="text-gray-300">Receive instant alerts for appointments, emergencies, and system tasks.</p>
    </div>
  </div>
</section>

      {/* How It Works */}
      <section className="bg-gray-900 py-16 text-center px-4">
        <h2 className="text-4xl text-blue-500 mb-2 font-sans">How It Works</h2>
        <p className="text-lg text-gray-300 mb-10 font-serif">A simple process for efficient hospital operations</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
            <h3 className="text-xl mb-2 font-serif">Add Details</h3>
            <p className="text-gray-300 font-serif">Enter patient name, age, phone number and others</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
            <h3 className="text-xl mb-2 font-serif">Schedule Appointments</h3>
            <p className="text-gray-300 font-serif">Book and manage appointments with real-time availability.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
            <h3 className="text-xl mb-2 font-serif">Track & Analyze</h3>
            <p className="text-gray-300 font-serif">View reports, manage tasks, and optimize hospital performance.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-800 py-16 text-center px-4">
        <h2 className="text-4xl text-blue-500 mb-2 font-sans">What Our Users Say</h2>
        <p className="text-lg text-gray-300 mb-10 font-serif">Trusted by doctors, staff, and administrators</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg transition-transform hover:transform hover:-translate-y-1">
            <p className="italic text-gray-200 mb-6">"This system revolutionized our workflow. Patient management has never been smoother!"</p>
            <h4 className="text-lg font-semibold mb-1 font-serif">Dr. Deepshikha Chowdhury</h4>
            <span className="text-gray-400 font-sans">Senior Surgeon</span>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg transition-transform hover:transform hover:-translate-y-1">
            <p className="italic text-gray-200 mb-6">"Effortless appointment booking and organized records. A must-have for modern hospitals."</p>
            <h4 className="text-lg font-semibold mb-1 font-serif">Somnath Bera</h4>
            <span className="text-gray-400 font-sans">Hospital Admin</span>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg transition-transform hover:transform hover:-translate-y-1">
            <p className="italic text-gray-200 mb-6">"As a nurse, I love how easy it is to track shifts and communicate with the staff."</p>
            <h4 className="text-lg font-semibold mb-1 font-serif">Dr. Subhranil Bar</h4>
            <span className="text-gray-400 font-sans">Head Doctor</span>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {/* <section className="bg-gray-900 py-16 text-center px-4" id="contact">
        <h2 className="text-4xl text-blue-500 mb-2 font-sans">Get in Touch</h2>
        <p className="text-lg text-gray-300 mb-10 font-serif">Have questions or need help? Send us a message!</p>
        
        <form className="max-w-lg mx-auto flex flex-col gap-5">
          <div>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-4 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              required 
            />
          </div>
          <div>
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-4 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              required 
            />
          </div>
          <div>
            <textarea 
              placeholder="Your Message" 
              rows="5" 
              className="w-full p-4 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-4 px-6 rounded font-semibold hover:bg-blue-600 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section> */}
      <ContactSection />
      <Footer />

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Book an Appointment</h2>
              <button onClick={closeAppointmentForm} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>
            {submitStatus.message && (
              <div className={`p-3 rounded mb-4 ${
                submitStatus.success ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
              }`}>
                {submitStatus.message}
              </div>
            )}
            <form onSubmit={handleAppointmentSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  value={appointmentData.name}
                  onChange={(e) => setAppointmentData({...appointmentData, name: e.target.value})}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Age:</label>
                <input
                  type="number"
                  value={appointmentData.age}
                  onChange={(e) => setAppointmentData({...appointmentData, age: e.target.value})}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Disease:</label>
                <input
                  type="text"
                  value={appointmentData.disease}
                  onChange={(e) => setAppointmentData({...appointmentData, disease: e.target.value})}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone Number:</label>
                <input
                  type="tel"
                  value={appointmentData.phone}
                  onChange={(e) => setAppointmentData({...appointmentData, phone: e.target.value})}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                  required
                  placeholder="10-digit number"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Date:</label>
                <input
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-black font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Doctor Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-8 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-800 py-2">
              <h2 className="text-2xl font-bold text-white">Available Doctors</h2>
              <button 
                onClick={closeDoctorModal} 
                className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className={`bg-gray-700 p-4 rounded-lg border ${
                    doctor.available ? "border-green-500/30" : "border-red-500/30"
                  } hover:shadow-md transition-all`}
                >
                  <h3 className="font-medium text-white">{doctor.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">{doctor.specialty}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      doctor.available ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    <span className={`text-sm ${
                      doctor.available ? "text-green-400" : "text-red-400"
                    }`}>
                      {doctor.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-8 rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">About Our Hospital</h2>
              <button onClick={closeAboutModal} className="text-gray-300 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="text-gray-300 space-y-4">
              <p>
                At HospitalCare, we are committed to providing top-notch healthcare services tailored to the needs of our community. With over two decades of experience, our facility is equipped with cutting-edge medical technology, and we house a team of over 50 board-certified physicians spanning across 20+ specialties. From cardiology to pediatric care, we ensure comprehensive and compassionate treatment at every stage of your health journey.
              </p>
              <p>
                Our mission is to bridge the gap between affordability and advanced medical care. We operate 24/7 emergency services, modern ICUs, and fully digital patient record systems to ensure the highest standards of safety and efficiency. Whether it's a routine check-up or a complex surgical procedure, our dedicated professionals are here to support you every step of the way.
              </p>
              <p>
                We also focus heavily on community outreach, preventive healthcare, and patient education. With transparent billing, patient-first policies, and a welcoming environment, HospitalCare continues to redefine excellence in healthcare. Your health is our priority, and we're here to build a healthier tomorrow together.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalManagement;
