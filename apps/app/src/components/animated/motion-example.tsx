'use client';

import { useState } from 'react';
import { motion, animate, inView } from 'motion';

/**
 * Motion Example Component
 * 
 * This component demonstrates the usage of the Motion library v12.4.10
 * which is a more lightweight and performance-focused evolution from framer-motion.
 * 
 * Key differences from framer-motion:
 * 1. Motion is smaller (~4.5kb vs ~25kb)
 * 2. Uses a more functional approach rather than component-based
 * 3. Separates animation concerns from React component lifecycle
 * 4. Provides better performance with minimal JS overhead
 * 5. Improved developer experience with simpler API
 */
export default function MotionExample() {
  const [expanded, setExpanded] = useState(false);
  
  // Handle the toggle effect
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-16">
      <h1 className="text-3xl font-bold mb-8">Motion Library Examples</h1>
      
      {/* Example 1: Fade Animation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Fade Animation</h2>
        <p className="text-gray-600 mb-4">
          This example demonstrates a simple fade-in effect using the Motion library.
        </p>
        
        <div 
          className="h-32 bg-blue-500 rounded-lg flex items-center justify-center"
          ref={(el) => {
            if (el) {
              // Unlike framer-motion which uses components, Motion uses direct element references
              // This is more performant as it doesn't require React's reconciliation
              animate(el, 
                { opacity: [0, 1] }, 
                { 
                  duration: 1.5,
                  easing: [0.65, 0, 0.35, 1], // cubic-bezier easing
                }
              );
            }
          }}
        >
          <p className="text-white font-medium">Fade In Animation</p>
        </div>

        <div className="text-gray-700 bg-gray-100 p-4 rounded-md text-sm">
          <p className="font-mono">
            {`// Motion fade animation
animate(element, 
  { opacity: [0, 1] }, 
  { 
    duration: 1.5,
    easing: [0.65, 0, 0.35, 1],
  }
);`}
          </p>
        </div>
      </section>

      {/* Example 2: Scale Animation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Scale Animation</h2>
        <p className="text-gray-600 mb-4">
          Click the box below to see a scale animation in action.
        </p>
        
        <div 
          className="h-32 bg-green-500 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={handleToggle}
          ref={(el) => {
            if (el) {
              // Watch for state changes and apply animations accordingly
              animate(
                el, 
                { 
                  scale: expanded ? 1.2 : 1,
                  backgroundColor: expanded ? '#805AD5' : '#48BB78', // purple when expanded, green when normal
                }, 
                { 
                  duration: 0.3, 
                  easing: "ease-in-out" 
                }
              );
            }
          }}
        >
          <p className="text-white font-medium">Click to Scale</p>
        </div>

        <div className="text-gray-700 bg-gray-100 p-4 rounded-md text-sm">
          <p className="font-mono">
            {`// Motion scale animation
animate(
  element, 
  { 
    scale: expanded ? 1.2 : 1,
    backgroundColor: expanded ? '#805AD5' : '#48BB78',
  }, 
  { 
    duration: 0.3, 
    easing: "ease-in-out" 
  }
);`}
          </p>
        </div>
      </section>

      {/* Example 3: Position Animation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Position Animation</h2>
        <p className="text-gray-600 mb-4">
          This example demonstrates position transitions.
        </p>
        
        <div className="h-48 border border-gray-300 rounded-lg relative overflow-hidden">
          <div 
            className="h-16 w-16 bg-red-500 rounded-lg absolute"
            ref={(el) => {
              if (el) {
                // Motion approach: define keyframes for x position
                animate(
                  el, 
                  { 
                    x: ['0%', '100%', '0%'],  // Start left, move right, return left
                    y: ['20%', '70%', '20%'], // Move down and back up
                    rotate: [0, 180, 0],      // Rotate as it moves
                  }, 
                  { 
                    duration: 3, 
                    repeat: Infinity,         // Loop animation
                    easing: "ease-in-out",
                  }
                );
              }
            }}
          />
        </div>

        <div className="text-gray-700 bg-gray-100 p-4 rounded-md text-sm">
          <p className="font-mono">
            {`// Motion position animation
animate(
  element, 
  { 
    x: ['0%', '100%', '0%'],  
    y: ['20%', '70%', '20%'],
    rotate: [0, 180, 0],
  }, 
  { 
    duration: 3, 
    repeat: Infinity,
    easing: "ease-in-out",
  }
);`}
          </p>
        </div>
      </section>

      {/* Example 4: Scroll-triggered Animation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Scroll-triggered Animation</h2>
        <p className="text-gray-600 mb-4">
          This element animates when it comes into view while scrolling.
        </p>
        
        <div 
          className="h-32 bg-yellow-500 rounded-lg flex items-center justify-center"
          ref={(el) => {
            if (el) {
              // inView is similar to framer-motion's useInView but with a callback approach
              inView(el, () => {
                animate(
                  el, 
                  { 
                    opacity: [0, 1],
                    y: [50, 0],
                  }, 
                  { 
                    duration: 0.8,
                    easing: "ease-out",
                  }
                );
              }, { margin: "0px 0px -20% 0px" });
            }
          }}
        >
          <p className="text-white font-medium">Scroll-triggered Animation</p>
        </div>

        <div className="text-gray-700 bg-gray-100 p-4 rounded-md text-sm">
          <p className="font-mono">
            {`// Motion scroll-triggered animation
inView(element, () => {
  animate(
    element, 
    { 
      opacity: [0, 1],
      y: [50, 0],
    }, 
    { 
      duration: 0.8,
      easing: "ease-out",
    }
  );
}, { margin: "0px 0px -20% 0px" });`}
          </p>
        </div>
      </section>

      {/* Explanation of Key Differences */}
      <section className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Key Differences from framer-motion</h2>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Functional vs Component-based:</strong> Motion uses direct function calls (animate, inView) 
            rather than components (&lt;motion.div&gt;). This reduces React reconciliation overhead.
          </li>
          <li>
            <strong>Bundle Size:</strong> Motion is significantly smaller (~4.5kb vs ~25kb for framer-motion), 
            making it more performant for production applications.
          </li>
          <li>
            <strong>API Design:</strong> Motion has a more streamlined API focused on the most commonly used 
            animation features, making it easier to learn and use.
          </li>
          <li>
            <strong>Performance:</strong> By separating animation logic from React's lifecycle, 
            Motion can achieve smoother animations with less JavaScript overhead.
          </li>
          <li>
            <strong>CSS Variables:</strong> Motion leverages CSS variables for many animations,
            allowing the browser to handle more of the animation work.
          </li>
        </ul>
      </section>
    </div>
  );
}

