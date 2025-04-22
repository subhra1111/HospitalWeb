"use client";

import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../conig/firebase';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    // Check if the Web3Forms access key is available
    if (!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) {
      setSubmitStatus({
        success: false,
        message: 'Web3Forms API key is missing. Please contact the administrator.'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. First send email via Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('from_name', 'Hospital Website Contact Form');
      formDataToSend.append('subject', 'New Contact Form Submission');
      
      const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const web3formsData = await web3formsResponse.json();

      if (!web3formsData.success) {
        throw new Error(web3formsData.message || 'Email notification failed');
      }

      // 2. Then save to Firebase
      await addDoc(collection(db, 'feedback'), {
        ...formData,
        createdAt: new Date()
      });

      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! We will get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        success: false,
        message: error.message || 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-900 py-16 text-center px-4" id="contact">
      <h2 className="text-4xl text-blue-500 mb-2 font-sans">Get in Touch</h2>
      <p className="text-lg text-gray-300 mb-10 font-serif">Have questions or need help? Send us a message!</p>
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-5">
        <div>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name" 
            className="w-full p-4 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            required 
          />
        </div>
        <div>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email" 
            className="w-full p-4 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            required 
          />
        </div>
        <div>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message" 
            rows="5" 
            className="w-full p-4 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            required
          ></textarea>
        </div>
        {submitStatus.message && (
          <div className={`p-3 rounded ${submitStatus.success ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'}`}>
            {submitStatus.message}
          </div>
        )}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`bg-blue-500 text-white py-4 px-6 rounded font-semibold hover:bg-blue-600 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
};

export default ContactSection;