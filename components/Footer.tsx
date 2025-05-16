import React from 'react';
import Container from './Container';
import Image from 'next/image';
import Link from 'next/link';
import payment from '@/images/payment.png';
import { BsBasket } from "react-icons/bs";
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, Info, HelpCircle, Package, Store, GlobeLock,  } from 'lucide-react';

const Footer = () => {
  return (
      <div className="bg-lightBg text-sm text-gray-600">
        <Container className="py-10">
          <footer className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
            {/* About Section */}
            <div>
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                <Info className="mr-2 h-5 w-5 text-pink-500" />
                About ABCart
              </h3>
              <p className="mb-4">
                ABCart is your one-stop shop for quality products, offering seamless shopping with secure payments and fast delivery.
              </p>
              <div className="flex space-x-4">
                <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                  <Facebook className="h-5 w-5 text-gray-500 hover:text-pink-500 transition-colors" />
                </Link>
                <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                  <Twitter className="h-5 w-5 text-gray-500 hover:text-pink-500 transition-colors" />
                </Link>
                <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                  <Instagram className="h-5 w-5 text-gray-500 hover:text-pink-500 transition-colors" />
                </Link>
                <Link href="https://linkedin.com" target="_blank" aria-label="Instagram">
                  <Linkedin className="h-5 w-5 text-gray-500 hover:text-pink-500 transition-colors" />
                </Link>
              </div>
            </div>

            {/* Customer Service Section */}
            <div>
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                <HelpCircle className="mr-2 h-5 w-5 text-pink-500" />
                Customer Service
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/track" className="flex items-center hover:text-pink-500 transition-colors">
                    <Package className="mr-2 h-4 w-4" />
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="flex items-center hover:text-pink-500 transition-colors">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="flex items-center hover:text-pink-500 transition-colors">
                    <Heart className="mr-2 h-4 w-4" />
                    Returns & Refunds
                  </Link>
                </li>

                <li>
                  <Link href="/privacy-policy" className="flex items-center hover:text-pink-500 transition-colors">
                    <GlobeLock  className="mr-2 h-4 w-4" />
                    Privacy Policy
                  </Link>
                </li>

              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                <Mail className="mr-2 h-5 w-5 text-pink-500" />
                Contact Us
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <a href="mailto:support@abcart.com" className="hover:text-pink-500 transition-colors">
                    support@abcart.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <a href="tel:+919999999999" className="hover:text-pink-500 transition-colors">
                    +91 99999 99999
                  </a>
                </li>
                <li className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Banjara Hills Road no 12, Hyderabad, Telangana, India</span>
                </li>
              </ul>
            </div>

            {/* Navigation Section */}
            <div>
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                <Home className="mr-2 h-5 w-5 text-pink-500" />
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="flex items-center hover:text-pink-500 transition-colors">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/address" className="flex items-center hover:text-pink-500 transition-colors">
                    <MapPin className="mr-2 h-4 w-4" />
                    Update Address
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="flex items-center hover:text-pink-500 transition-colors">
                    <BsBasket className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="flex items-center hover:text-pink-500 transition-colors">
                    <Store  className="mr-2 h-4 w-4" />
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </footer>

          {/* Bottom Section */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-gray-500">
                Copyright © {new Date().getFullYear()}{' '}
                <span className="text-pink-500 font-semibold"><Link href="/">ABCart</Link></span> all rights reserved.
              </p>
              <p className="text-gray-500">
                Developed By - <span className="text-pink-500 hover:text-blue-500"><a href="https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/">Aaditya B Chatterjee</a></span>
                </p>
              <Image src={payment} alt="Payment methods" className="w-48 md:w-64 object-cover" />
            </div>
          </div>
        </Container>
      </div>
  );
};

export default Footer;