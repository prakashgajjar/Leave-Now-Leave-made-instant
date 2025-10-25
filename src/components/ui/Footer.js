import React from 'react';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Leaf className="w-6 h-6 text-green-700" />
            <span className="text-xl font-bold text-gray-800">LeaveNow</span>
          </div>
          <div className="flex space-x-6">
            <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} LeaveNow Digital Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
