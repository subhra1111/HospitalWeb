"use client";

import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../conig/firebase';
import { useRouter } from 'next/navigation';

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', available: true });
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch appointments
      const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
      const appointmentsData = appointmentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAppointments(appointmentsData);

      // Fetch doctors
      const doctorsSnapshot = await getDocs(collection(db, 'doctors'));
      const doctorsData = doctorsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDoctors(doctorsData);

      // Fetch feedback
      const feedbackSnapshot = await getDocs(collection(db, 'feedback'));
      const feedbackData = feedbackSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeedback(feedbackData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleDoctorAvailability = async (doctorId, currentStatus) => {
    try {
      const doctorRef = doc(db, 'doctors', doctorId);
      await updateDoc(doctorRef, {
        available: !currentStatus
      });
      fetchData();
    } catch (error) {
      console.error('Error updating doctor availability:', error);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'doctors'), {
        ...newDoctor,
        createdAt: new Date()
      });
      setNewDoctor({ name: '', specialty: '', available: true });
      fetchData();
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      await deleteDoc(doc(db, 'doctors', doctorId));
      fetchData();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded ${
              activeTab === 'appointments' ? 'bg-blue-500' : 'bg-gray-700'
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2 rounded ${
              activeTab === 'doctors' ? 'bg-blue-500' : 'bg-gray-700'
            }`}
          >
            Doctors
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 rounded ${
              activeTab === 'feedback' ? 'bg-blue-500' : 'bg-gray-700'
            }`}
          >
            Feedback
          </button>
        </div>

        {activeTab === 'appointments' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Appointments</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Patient Name</th>
                    <th className="p-2">Age</th>
                    <th className="p-2">Disease</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-t border-gray-700">
                      <td className="p-2">{appointment.name}</td>
                      <td className="p-2">{appointment.age}</td>
                      <td className="p-2">{appointment.disease}</td>
                      <td className="p-2">{appointment.phone}</td>
                      <td className="p-2">{appointment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Doctors</h2>
            
            {/* Add Doctor Form */}
            <form onSubmit={handleAddDoctor} className="mb-8 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Add New Doctor</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Doctor Name"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                  className="p-2 rounded bg-gray-600 border border-gray-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Specialty"
                  value={newDoctor.specialty}
                  onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
                  className="p-2 rounded bg-gray-600 border border-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Add Doctor
                </button>
              </div>
            </form>

            {/* Doctors List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-bold">{doctor.name}</h3>
                  <p className="text-gray-300">{doctor.specialty}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => toggleDoctorAvailability(doctor.id, doctor.available)}
                      className={`px-4 py-2 rounded ${
                        doctor.available ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Feedback Messages</h2>
            <div className="space-y-4">
              {feedback.map((message) => (
                <div key={message.id} className="bg-gray-700 p-4 rounded-lg">
                  <p className="font-bold">{message.name}</p>
                  <p className="text-gray-300">{message.email}</p>
                  <p className="mt-2">{message.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 