import React, { useEffect, useRef, useState } from 'react';
import { addVisualization } from '../../utils/heatmap';

const About = ({ selectedMapType,finalData}) => {
  const heatmapContainerRef = useRef(null);
  const [style, setStyle] = useState({});


  useEffect(() => {

    
    
    if (selectedMapType === 'scroll') {
      // const finalData=[22, 33, 44, 55];
      addVisualization(heatmapContainerRef, 'rectangle',finalData);

      setStyle({ position: 'relative' });

    }else if (selectedMapType === 'allClicks') {
      // const finalData = {
      //   max: 1,
      //   data: [
      //     { x: 564, y: 292.8, value: 1 },
      //     { x: 479, y: 431.6, value: 1 },
      //     { x: 445, y: 226.6, value: 1 },
      //     { x: 460, y: 139.6, value: 1 },
      //     { x: 156, y: 210.6, value: 1 },
      //   ],
      // };
      addVisualization(heatmapContainerRef, 'heatmap' ,finalData);
      setStyle({ position: 'relative', width: '700px' });
    }
  }, [selectedMapType,finalData]);


  return (
    <div
      className="bg-custom text-black relative m-10 pb-5 shadow-lg"
      ref={heatmapContainerRef}
      style={style}
    >
      <div className="bg-white text-black relative min-h-screen rounded-lg">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap">
              {/* Left Content */}
              <div className="w-full lg:w-1/2 p-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  About Us
                </h1>
                <p className="mt-8">
                  Welcome to PharmaCo, your trusted partner in healthcare. We are dedicated to providing the highest quality pharmaceutical products and services. Our mission is to improve the health and well-being of our community through innovative solutions and exceptional customer service.
                </p>
                <p className="mt-4">
                  At PharmaCo, we believe in the power of collaboration and innovation. Our team of experts works tirelessly to bring you the best in healthcare, from cutting-edge research to the latest in pharmaceutical advancements.
                </p>
                <p className="mt-4">
                  We are committed to sustainability and ethical practices, ensuring that our products are not only effective but also environmentally friendly.
                </p>
                <p className="mt-4">
                  Thank you for choosing PharmaCo. Together, we can build a healthier future.
                </p>
              </div>
              {/* Right Image */}
              <div className="w-full lg:w-1/2 p-4">
                <img
                  className="rounded-lg shadow-md"
                  src="https://via.placeholder.com/600x400"
                  alt="About Us"
                />
              </div>
            </div>
            {/* CTA Section */}
            <div className="mt-16 bg-blue-500 text-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold tracking-tight">
                Join Our Community
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

export default About;