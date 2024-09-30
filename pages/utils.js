import { data } from 'autoprefixer';
import * as d3 from 'd3';
import h337 from 'heatmap.js';

export const addVisualization = (containerRef, type,finalData) => {
    //clear previous visualization

    console.log('finalData',finalData);
    

    if (containerRef.current) {
      // Clear previous heatmap
      d3.select(containerRef.current).selectAll('canvas').remove();
      d3.select(containerRef.current).selectAll('svg').remove();
  }
   
    
  if (type === 'rectangle') {
    // Set up the dimensions of the SVG
    const width = window.innerWidth;
    const height = document.body.scrollHeight;

    // Remove any previous SVG if it exists (for hot reloading purposes)
    d3.select(containerRef.current).selectAll('svg').remove();

    const svg = d3
      .select(containerRef.current)
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
      .select(containerRef.current)
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
        .style('pointer-events', 'all'); // Enable pointer events
    
    }
  } else if (type === 'heatmap') {
    // Initialize heatmap instance
    const heatmapInstance = h337.create({
        container: containerRef.current,
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
  
    // Define the data
    // const data = {
    //   max: 1,
    //   data: [
    //     { x: 564, y: 292.8, value: 1 },
    //     { x: 479, y: 431.6, value: 1 },
    //     { x: 445, y: 226.6, value: 1 },
    //     { x: 460, y: 139.6, value: 1 },
    //     { x: 156, y: 210.6, value: 1 },
    //   ],
    // };

    // Set data to the heatmap instance
    heatmapInstance.setData(finalData);
  }
};