import * as d3 from 'd3';
import h337 from 'heatmap.js';

export const addVisualization = (containerRef, type,finalData) => {
    //clear previous visualization
    if (containerRef.current) {
      // Clear previous heatmap
      d3.select(containerRef.current).selectAll('canvas').remove();
      d3.select(containerRef.current).selectAll('svg').remove();
  }
   
    
  if (type === 'rectangle') {
    // Set up the dimensions of the SVG
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

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

   
    // Create the quadrants based on the provided data array
    let currentY = 0;
    finalData.forEach((value, index) => {
      const quadrantHeight = (value / 100) * height;

      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', currentY)
        .attr('width', width)
        .attr('height', quadrantHeight)
        .attr('fill', colors[index % colors.length])
        .attr('opacity', 0.3); // Adjust opacity as needed

      // Add an invisible rectangle at the end of each quadrant for tooltip interaction
      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', currentY + quadrantHeight - 5) // Position at the end of the quadrant
        .attr('width', width)
        .attr('height', 10) // Small height for interaction
        .attr('fill', 'transparent')
        .style('pointer-events', 'all'); // Enable pointer events

      currentY += quadrantHeight;
    });
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