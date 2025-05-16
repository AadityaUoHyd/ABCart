'use client';

import React from 'react';
import Container from '@/components/Container';
import { HelpCircle, Truck, Package, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const faqs = [
    {
        question: 'What is your return policy?',
        answer:
            'You can return most items within 30 days of delivery for a full refund or exchange, provided they are unused and in original packaging.',
    },
    {
        question: 'How do I initiate a return?',
        answer:
            'Visit your Orders page, select the order, and click "Request Return." Follow the instructions to print a return label and ship the item back.',
    },
    {
        question: 'When will I receive my refund?',
        answer:
            'Refunds are processed within 5-7 business days after we receive the returned item. Funds will be credited to your original payment method.',
    },
    {
        question: 'Can I exchange an item?',
        answer:
            'Yes, exchanges are available for items of equal or lesser value. Contact support to arrange an exchange.',
    },
];

const ReturnsPage = () => {
    return (
        <div className="bg-lightBg py-10 min-h-screen">
            <Container className="max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 flex items-center justify-center">
                        <HelpCircle className="mr-2 h-8 w-8 text-pink-500" />
                        Returns & Refunds
                    </h1>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        We want you to be completely satisfied with your purchase. Learn about our return and refund policies below.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-lg shadow-lg p-6 mb-8"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Policy</h2>
                    <p className="text-gray-600 mb-4">
                        At ABCart, we offer a hassle-free return policy. If you’re not satisfied with your purchase, you can return
                        eligible items within 30 days of delivery for a refund or exchange. Items must be unused, in their original
                        packaging, and in the same condition as received.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li className="flex items-start">
                            <Truck className="h-5 w-5 text-pink-500 mr-2 mt-1" />
                            Free return shipping for defective or incorrect items.
                        </li>
                        <li className="flex items-start">
                            <Package className="h-5 w-5 text-pink-500 mr-2 mt-1" />
                            Refunds issued to the original payment method within 5-7 business days.
                        </li>
                        <li className="flex items-start">
                            <HelpCircle className="h-5 w-5 text-pink-500 mr-2 mt-1" />
                            Contact our support team for assistance with returns or exchanges.
                        </li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-pink-50 rounded-lg shadow-lg p-6"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-medium text-gray-800 flex items-center">
                                    <HelpCircle className="h-5 w-5 text-pink-500 mr-2" />
                                    {faq.question}
                                </h3>
                                <p className="mt-2 text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
                        >
                            <Mail className="h-5 w-5 mr-2" />
                            Contact Support
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default ReturnsPage;