import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import 'd3-contour'; // Ensure the contour plugin is imported

const AboutUs = () => {
  const heatmapContainerRef = useRef(null);

  useEffect(() => {
    const data = [
      { x: 350, y: 150, value: 90 },
      { x: 500, y: 300, value: 70 },
      { x: 700, y: 400, value: 60 },
      { x: 850, y: 500, value: 85 },
      // Add more mock data points as needed
    ];

    // Set up the dimensions of the SVG
    const width = 1000;
    const height = 600;

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

    // Set up scales
    const xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

    // Prepare a color palette using the specified colors
    const colorScale = d3
      .scaleLinear()
      .domain([0, 1]) // Points per square pixel.
      .range(['blue', '#69b3a2']); // White to greenish gradient

    // Create a 2D density contour generator
    const densityData = d3
      .contourDensity()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .size([width, height])
      .bandwidth(20)(data); // Adjust bandwidth for smoother or more detailed contours

    // Create a tooltip element
    const tooltip = d3
      .select(heatmapContainerRef.current)
      .append('div')
      .style('position', 'absolute')
      .style('background', 'white') // White background
      .style('color', 'black') // Black text
      .style('padding', '5px 10px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // Append density contours to the SVG
    svg
      .selectAll('path')
      .data(densityData)
      .enter()
      .append('path')
      .attr('d', d3.geoPath())
      .attr('fill', d => colorScale(d.value))
      .attr('stroke', 'none')
      .attr('opacity', 0.2) // Adjust opacity for better visualization
      .on('mouseover', function (event, d) {
        tooltip
          .style('opacity', 1)
          .html(`Density value: ${d.value.toFixed(2)}`); // Display density value
      })
      .on('mousemove', function (event) {
        tooltip
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 10 + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });
  }, []);

  return (
    <div className="bg-custom text-white relative">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div>
            <div className="bg-custom-back px-6 py-32 lg:px-8 sm-rounded-6xl lg-rounded-8xl">
              <div className="mx-auto max-w-3xl text-base leading-7 text-white-700">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  About Me
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white-900 sm:text-4xl">
                  My Journey to become a Front End Developer:
                </h1>
                <p className="mt-8">
                  I&#39;m from Hyderabad, India. I finished my Computer Science
                  degree back in 2018. During my final year in college, I really
                  wanted to follow my passion for becoming a UI developer, so I
                  joined a startup called Aquo Digital, which was into growth
                  hacking and digital marketing.
                </p>
                <div className="mt-7 max-w-2xl">
                  <p>
                    Later on, with the same group of people, we started a SAAS
                    company called{' '}
                    <a
                      href="https://greymetrics.com/"
                      className="hover:text-blue-500 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GreyMetrics
                    </a>
                    . We eventually sold that company and then jumped into a new
                    venture called{' '}
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
                    I&apos;ve been working with this awesome group for almost 4
                    years. It all began as an intern, and then I moved to
                    working full time, learning and figuring out how to grow the
                    company one day at a time.
                  </p>
                  <figure className="mt-16"></figure>
                  <h2 className="mt-16 text-2xl font-bold tracking-tight text-white-900">
                    As a developer
                  </h2>
                  <p className="mt-6">
                    I pay close attention to my code’s readability.
                  </p>
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
