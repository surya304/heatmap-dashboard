import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AboutUs = () => {
  const heatmapContainerRef = useRef(null);

  useEffect(() => {
    // Set up the dimensions of the SVG
    const width = window.innerWidth;
    const height = document.body.scrollHeight;

    // Remove any previous SVG if it exists (for hot reloading purposes)
    d3.select(heatmapContainerRef.current).selectAll('svg').remove();

    const svg = d3
      .select(heatmapContainerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .style('z-index', 50)
      .style('pointer-events', 'none');

    // Define the colors for each quadrant
    const colors = ['red', 'green', 'blue', 'yellow'];

    // Calculate the height of each quadrant
    const quadrantHeight = height / 4;

    // Create a tooltip element
    const tooltip = d3
      .select(heatmapContainerRef.current)
      .append('div')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('color', 'white')
      .style('padding', '5px 10px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // Create the quadrants
    for (let i = 0; i < 4; i++) {
      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', i * quadrantHeight)
        .attr('width', width)
        .attr('height', quadrantHeight)
        .attr('fill', colors[i])
        .attr('opacity', 0.3); // Adjust opacity as needed

      // Add an invisible rectangle at the end of each quadrant for tooltip interaction
      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', (i + 1) * quadrantHeight - 5) // Position at the end of the quadrant
        .attr('width', width)
        .attr('height', 10) // Small height for interaction
        .attr('fill', 'transparent')
        .style('pointer-events', 'all') // Enable pointer events
        .on('mouseover', function (event) {
          tooltip
            .style('opacity', 1)
            .text(`End of Quadrant ${i + 1}`);
        })
        .on('mousemove', function (event) {
          tooltip
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 10 + 'px');
        })
        .on('mouseout', function () {
          tooltip.style('opacity', 0);
        });
    }
  }, []);

  return (
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
              Welcome to PharmaCo, your trusted partner in healthcare. We are dedicated to providing the highest quality pharmaceutical products and services. If you have any questions or need assistance, please dont hesitate to reach out to us.
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
        {/* Heatmap Container */}
        <div
          ref={heatmapContainerRef}
          className="absolute inset-0 z-50 w-full h-full pointer-events-none"
        ></div>
      </div>
    </div>
  );
};

export default AboutUs;
