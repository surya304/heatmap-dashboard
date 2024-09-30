import React, { useEffect, useRef } from 'react';
import h337 from 'heatmap.js';

const ClickMap = () => {
  const heatmapContainerRef = useRef(null);
  const heatmapInstanceRef = useRef(null);

  useEffect(() => {
    const heatmapContainer = heatmapContainerRef.current;

    // Initialize heatmap instance
    const heatmapInstance = h337.create({
      container: heatmapContainer,
      radius: 40,
      maxOpacity: 0.6,
      minOpacity: 0,
      blur: 0.9,
      gradient: {
        0.4: 'blue',
        0.6: 'green',
        0.7: 'yellow',
        0.8: 'orange',
        1.0: 'red',
      },
    });
    heatmapInstanceRef.current = heatmapInstance;

    const heatmapArr=[];

    console.log('heatmaparr', heatmapArr);

    // Event listener for clicks
    const handleClick = (event) => {
      const x = event.clientX - heatmapContainer.getBoundingClientRect().left;
      const y = event.clientY - heatmapContainer.getBoundingClientRect().top;

      // Add data point to heatmap
      heatmapInstance.addData({ x, y, value: 1 });
      heatmapArr.push({x,y,value:1});
      console.log('heatmaparr', heatmapArr);
    };

    heatmapContainer.addEventListener('click', handleClick);

    // Clean up the event listener on unmount
    return () => {
      heatmapContainer.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      className="bg-custom text-black relative m-10 pb-5 shadow-lg"
      ref={heatmapContainerRef}
      style={{ position: 'relative' }}
    >
     <div className="bg-white text-black relative min-h-screen  rounded-lg">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 p-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Contact Us
              </h1>
              <p className="mt-8">
                Welcome to PharmaCo, your trusted partner in healthcare. We are dedicated to providing the highest quality pharmaceutical products and services. If you have any questions or need assistance, please don't hesitate to reach out to us.
              </p>
              <p className="mt-4">
                Address: 123 Pharma Street, Health City, Country
              </p>
              <p className="mt-4">
                Phone: +123 456 7890
              </p>
              <p className="mt-4">
                Email: contact@pharmaco.com
              </p>
            </div>
            {/* Right Contact Form */}
            <div className="w-full lg:w-1/2 p-4">
              <form className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Your Message"
                    rows="5"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* CTA Section */}
          <div className="mt-16 bg-blue-500 text-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold tracking-tight">
              Join Our Newsletter
            </h2>
            <p className="mt-4">
              Stay updated with the latest news and offers from PharmaCo. Subscribe to our newsletter and never miss out!
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Your Email"
                />
                <button
                  className="bg-white text-blue-500 hover:bg-gray-200 font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ClickMap;