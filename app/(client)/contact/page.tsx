'use client';

import React, { useState } from 'react';
import Container from '@/components/Container';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Send,
    Package,
    Clock,
    Truck,
    Headphones,
    Star,
    Users,
    Cookie,
    Heart,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResult('Sending...');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('message', formData.message);
            formDataToSend.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '');

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Message sent! Our team will reach out soon.');
                setResult('Form Submitted Successfully');
                setFormData({ name: '', email: '', message: '' });
            } else {
                console.log('Web3Forms Error:', data);
                toast.error(data.message || 'Failed to send message. Please try again.');
                setResult(data.message || 'Error submitting form');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            toast.error('Failed to send message. Please try again.');
            setResult('Error submitting form');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-pink-50 py-12 min-h-screen">
            <Container className="max-w-5xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center">
                        <Headphones className="mr-3 h-8 w-8 text-pink-600" />
                        ABCart Customer Care
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Craving snacks or need help with your order? Our team at ABCart is here to ensure your snack-time is delightful. Reach out anytime!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white arounded-xl shadow-lg p-8"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <Send className="h-6 w-6 text-pink-600 mr-2" />
                            Send Us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="mt-1 w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                                    placeholder="How can we assist you today?"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center disabled:opacity-50"
                            >
                                <Send className="mr-2 h-5 w-5" />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                        {result && (
                            <p className={`text-sm mt-4 text-center ${result.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                                {result}
                            </p>
                        )}
                    </motion.div>

                    {/* Customer Care Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-pink-100 rounded-xl shadow-lg p-8"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <Star className="h-6 w-6 text-pink-600 mr-2" />
                            Get in Touch
                        </h2>
                        <p className="text-gray-600 mb-6">
                            From savory namkeens to sweet treats, we’re passionate about snacks and your satisfaction. Contact us for any queries or feedback!
                        </p>
                        <ul className="space-y-5">
                            <li className="flex items-center">
                                <Mail className="h-6 w-6 text-pink-600 mr-3" />
                                <a href="mailto:abcart@yopmail.com" className="text-gray-700 hover:text-pink-600 transition-colors">
                                    abcart@yopmail.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-6 w-6 text-pink-600 mr-3" />
                                <a href="tel:+919999999999" className="text-gray-700 hover:text-pink-600 transition-colors">
                                    +91 99999 99999
                                </a>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="h-6 w-6 text-pink-600 mr-3 mt-1" />
                                <span className="text-gray-700">Banjara Hills Road no 12, Hyderabad, Telangana, India</span>
                            </li>
                            <li className="flex items-center">
                                <Clock className="h-6 w-6 text-pink-600 mr-3" />
                                <span className="text-gray-700">Mon-Sat: 9 AM - 6 PM IST</span>
                            </li>
                        </ul>
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                <Users className="h-6 w-6 text-pink-600 mr-2 mb-2" />
                                Follow Us
                            </h3>
                            <div className="flex space-x-5">
                                <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                                    <Facebook className="h-7 w-7 text-gray-600 hover:text-pink-600 transition-colors" />
                                </Link>
                                <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                                    <Twitter className="h-7 w-7 text-gray-600 hover:text-pink-600 transition-colors" />
                                </Link>
                                <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                                    <Instagram className="h-7 w-7 text-gray-600 hover:text-pink-600 transition-colors" />
                                </Link>
                                <Link href="https://linkedin.com" target="_blank" aria-label="Instagram">
                                    <Linkedin className="h-7 w-7 text-gray-600 hover:text-pink-600 transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Why Choose ABCart Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 bg-white rounded-xl shadow-lg p-8"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <Package className="h-6 w-6 text-pink-600 mr-2" />
                        Why Choose ABCart?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="text-center">
                            <Truck className="h-10 w-10 text-pink-600 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-800">Fast Delivery</h3>
                            <p className="text-gray-600 mt-2">Your favorite snacks delivered across India in no time.</p>
                        </div>
                        <div className="text-center">
                            <Cookie className="h-10 w-10 text-pink-600 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-800">Quality Snacks</h3>
                            <p className="text-gray-600 mt-2">Fresh, authentic Indian snacks for every craving.</p>
                        </div>
                        <div className="text-center">
                            <Heart className="h-10 w-10 text-pink-600 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-800">24/7 Support</h3>
                            <p className="text-gray-600 mt-2">Our team is always ready to assist with your queries.</p>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default ContactPage;