// create canvas svg element
const height = 900;
const width = 1600;

const canvas = d3.select('#canvas') // select DOM element
                .append('svg') // append svg HTML element to DOM node
                .attr('height', height)
                .attr('width', width)
                .style('background-color', '#2d2d2d');

// pull data
    // Genre: "Documentary"
    // IMDB Score: "2.5"
    // Language: "English/Japanese"
    // Premiere: "August 5, 2019"
    // Runtime: "58"
    // Title: "Enter the Anime"
const netflixData = await d3.csv('NetflixOriginals.csv', (d) => {
    return {
        genre: d.Genre,
        score: +d['IMDB Score'],
        language: d.Language,
        date: new Date(d.Premiere),
        runtime: +d.Runtime,
        title: d.Title
    }
});

// sort netflixData by genre, return nested array with [genre, count]
const genreCount = d3.rollups(netflixData, g => g.length , d => d.genre);

genreCount.sort(function(a, b) {
    return b[1] - a[1];
  });

// barchart render function
const barChart = data => {
    // define margin convention
    const margin = { top: 30, right: 30, bottom: 30, left: 140 };

    // shrink chart content enough for axes
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    // define scales of x and y axes
    const xScale = d3.scaleLinear()
                    .domain([0, d3.max( data, d => d[1] )])
                    .range([0, innerWidth]);

    const yScale = d3.scaleBand()
                    .domain(data.map(d => d[0]))
                    .range([0, innerHeight])
                    .padding(0.1);

    // group all svg elements in the canvas
    const g = canvas.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

    // append axes
    g.append('g').call(d3.axisLeft(yScale))
    g.append('g').call(d3.axisBottom(xScale))
        .attr('transform', `translate(0,${innerHeight})`);
    
    // render bars onto canvas
    g.selectAll('rect')
        .data(data)
        .enter().append('rect')
            .attr('fill', '#650202')
            .attr('height', yScale.bandwidth()) // total height
            .attr('y', d => yScale(d[0])) // position of each bar  
            .transition()
            .delay((d, i) => 1000 + (1000*i))
            .duration(2000)
            .attr('width', d => xScale(d[1])) // width of bars (what we're measuring)

};

barChart(genreCount.slice(0,10));