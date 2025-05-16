'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import ImageShipping from '@/images/abcart-images/ship.jpg';
import Image from 'next/image';

export default function AddressForm() {
    const [isMounted, setIsMounted] = useState(false);
    const { user, isSignedIn } = useUser();
    const [formData, setFormData] = useState({
        line1: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'IN',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (user?.publicMetadata?.address) {
            setFormData(user.publicMetadata.address as typeof formData);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignedIn) {
            toast.error('You must be signed in');
            return;
        }

        if (formData.country !== 'IN') {
            toast.error('Country must be India (IN) for INR payments');
            return;
        }
        if (!/^\d{6}$/.test(formData.postalCode)) {
            toast.error('Popup code must be a 6-digit number');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/update-address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address: formData }),
            });

            if (!response.ok) {
                throw new Error('Failed to update address');
            }

            toast.success('Address saved to your profile!');
        } catch (error) {
            console.error('Error saving address:', error);
            toast.error('Failed to save address. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    if (!isSignedIn) {
        return (
            <div>
                Please <Link href="/sign-in" className="underline">sign in</Link> to update your address.
            </div>
        );
    }

    return (
        <div className="bg-pink-50  min-h-screen pb-8">
            <Image src={ImageShipping} alt="Shipping" className="w-full h-96 object-fit object-center" />

        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-2xl p-6 space-y-5 max-w-lg mx-auto mt-10 "
        >
            <h2 className="text-2xl font-semibold text-center text-gray-800">Shipping Address</h2>

            <div>
                <label htmlFor="line1" className="block text-sm font-medium text-gray-700">
                    Street Address
                </label>
                <input
                    type="text"
                    name="line1"
                    id="line1"
                    placeholder="Banjara Hills, Road no 12, 1st block, House no 123"
                    value={formData.line1}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Hyderabad"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State
                    </label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        placeholder="Telangana"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder="500034"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        pattern="\d{6}"
                        title="Postal code must be a 6-digit number"
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                    </label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        value={formData.country}
                        readOnly
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 shadow-sm"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-pink-400 hover:bg-pink-600 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : 'Save Address'}
                </button>
            </div>
        </form>
        </div>

    );
}