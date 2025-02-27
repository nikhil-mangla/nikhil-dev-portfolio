'use client';

import { useState, useEffect } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';
import dynamic from 'next/dynamic';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { motion, useMotionValue, animate, useMotionTemplate } from "framer-motion";

const SocialLinks = dynamic(() => import('@/app/components/SocialLinks'), { ssr: false });

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ✅ Move hooks inside the component
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.default.init({ once: false });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendMail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const serviceID = 'service_yhraazh';
    const templateID = 'template_226ikmm';
    const publicKey = '3WpAerJgUVK3qXuTq';

    try {
      await emailjs.send(serviceID, templateID, formData, publicKey);
      setFormData({ name: '', email: '', message: '' });
      Swal.fire({ title: 'Message sent successfully!', text: "I'll get back to you soon!", icon: 'success' });
    } catch (error) {
      console.error('❌ Email sending error:', error);
      Swal.fire({ title: 'Error!', text: 'Error sending email. Please try again.', icon: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;

  return (
<motion.section className="py-16" style={{ backgroundImage, backgroundColor: "#1A1A2E" }}>
      <div id="contact" className='min-h-screen md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] overflow-hidden text-center'>
        <h2
          data-aos='fade-down'
          data-aos-duration='1000'
          className='inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]'
        >
          Contact Me
        </h2>
        <p data-aos='fade-up' data-aos-duration='1100' className='text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2'>
          Got a question? Send me a message, and I'll get back to you soon.
        </p>

        <div className='h-auto py-10 flex items-center justify-center px-[5%] md:px-0' id='Contact'>
          <div className='container mx-auto w-full lg:w-2/4'>
            <div data-aos='fade-right' className='bg-gradient-to-b from-[#1e0646] to-[#3a1a68] rounded-3xl shadow-2xl p-5 sm:p-10 w-full'>
              <form method='POST' onSubmit={sendMail} className='space-y-6'>
                <div data-aos='fade-up' data-aos-delay='100' className='relative group'>
                  <User className='absolute left-4 top-4 w-5 h-5 text-gray-400' />
                  <input
                    type='text'
                    name='name'
                    placeholder='Your Name'
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className='w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all hover:border-[#6366f1]/30 disabled:opacity-50'
                    required
                  />
                </div>
                <div data-aos='fade-up' data-aos-delay='200' className='relative group'>
                  <Mail className='absolute left-4 top-4 w-5 h-5 text-gray-400' />
                  <input
                    type='email'
                    name='email'
                    placeholder='Your Email'
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className='w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all hover:border-[#6366f1]/30 disabled:opacity-50'
                    required
                  />
                </div>
                <div data-aos='fade-up' data-aos-delay='300' className='relative group'>
                  <MessageSquare className='absolute left-4 top-4 w-5 h-5 text-gray-400' />
                  <textarea
                    name='message'
                    placeholder='Your Message'
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className='w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50'
                    required
                  />
                </div>
                <button
                  data-aos='fade-up'
                  data-aos-delay='400'
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50'
                >
                  <Send className='w-5 h-5' />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              <div className='mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6'>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactPage;
