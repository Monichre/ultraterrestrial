'use client';

import { MotionExample } from '@/components/animated';

export default function MotionDemoPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Motion Library Demo</h1>
      <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
        This page demonstrates the new Motion library (v12.4.10) capabilities through 
        various animation examples. Scroll down to explore different animation techniques.
      </p>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <MotionExample />
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          The Motion library is a lightweight alternative to framer-motion, 
          offering better performance and a more functional approach to animations.
        </p>
      </div>
    </div>
  );
}

