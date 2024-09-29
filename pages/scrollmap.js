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
    <div className="bg-custom text-white relative">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div>
            <div className="bg-custom-back px-6 py-32 lg:px-8 sm-rounded-6xl lg-rounded-8xl">
              <div className="mx-auto max-w-3xl text-base leading-7 text-white-700">
                <p className="text-base font-semibold leading-7 text-indigo-600">About Me</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white-900 sm:text-4xl">
                  My Journey to become a Front End Developer:
                </h1>
                <p className="mt-8">
                  I&#39;m from Hyderabad, India. I finished my Computer Science degree back in 2018. During my final year in college, I really wanted to follow my passion for becoming a UI developer, so I joined a startup called Aquo Digital, which was into growth hacking and digital marketing.
                </p>
                <div className="mt-7 max-w-2xl">
                  <p>
                    Later on, with the same group of people, we started a SAAS company called{' '}
                    <a
                      href="https://greymetrics.com/"
                      className="hover:text-blue-500 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GreyMetrics
                    </a>
                    . We eventually sold that company and then jumped into a new venture called{' '}
                    <a
                      href="https://www.videoform.com/"
                      className="hover:text-blue-500 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      VideoForm
                    </a>
                    . We managed to raise an initial seed fund of 100k for it.
                  </p>
                  <p className="mt-8">
                    I&apos;ve been working with this awesome group for almost 4 years. It all began as an intern, and then I moved to working full time, learning and figuring out how to grow the company one day at a time.
                  </p>
                  <figure className="mt-16"></figure>
                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-white-900">As a developer</h2>
                  <p className="mt-6">I pay close attention to my code’s readability.</p>
                </div>
              </div>
            </div>
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
