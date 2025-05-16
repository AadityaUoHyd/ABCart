'use client';

import React, { useState, ChangeEvent } from 'react';
import Container from '@/components/Container';
import { Package, Search, Truck, Clock, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const TrackOrderPage = () => {
    const [orderId, setOrderId] = useState('');

    const handleTrackOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) {
            toast.error('Please enter a valid Order ID.');
            return;
        }
        toast.success('Order ID submitted! Check the status below.');
    };

    return (
        <div className="bg-pink-50 py-12 min-h-screen">
            <Container className="max-w-4xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 flex items-center justify-center">
                        <Package className="mr-2 h-8 w-8 text-pink-600" />
                        Track Your Order
                    </h1>
                    <p className="mt-3 text-gray-600">
                        Enter your ABCart Order ID to check the status of your snack delivery.
                    </p>
                </motion.div>

                {/* Tracking Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <Search className="h-5 w-5 text-pink-600 mr-2" />
                        Enter Order ID
                    </h2>
                    <form onSubmit={handleTrackOrder} className="space-y-4">
                        <div>
                            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                                Order ID
                            </label>
                            <input
                                id="orderId"
                                name="orderId"
                                type="text"
                                value={orderId}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setOrderId(e.target.value)}
                                required
                                className="mt-1 w-full border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                placeholder="e.g., ABC123456789"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors flex items-center justify-center"
                        >
                            <Truck className="mr-2 h-4 w-4" />
                            Track Order
                        </button>
                    </form>
                </motion.div>

                {/* Tracking Status (Placeholder) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-10 bg-white rounded-lg shadow-md p-6"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <MapPin className="h-5 w-5 text-pink-600 mr-2" />
                        Order Status
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-pink-600 mr-3 mt-1" />
                            <div>
                                <h3 className="text-base font-medium text-gray-800">Order Placed</h3>
                                <p className="text-gray-600 text-sm">Your order is confirmed with ABCart.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Clock className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                            <div>
                                <h3 className="text-base font-medium text-gray-600">In Transit</h3>
                                <p className="text-gray-600 text-sm">Your snacks are on their way.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Truck className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                            <div>
                                <h3 className="text-base font-medium text-gray-600">Delivered</h3>
                                <p className="text-gray-600 text-sm">Your order has been delivered.</p>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600 text-sm text-center">
                        Submit your Order ID to view the current status.
                    </p>
                </motion.div>
            </Container>
        </div>
    );
};

export default TrackOrderPage;