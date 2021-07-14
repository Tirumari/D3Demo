
// create canvas svg element
const canvas = d3.select('#canvas') // select DOM element
                .append('svg') // append svg HTML element to DOM node
                .attr('height', 720)
                .attr('width', 1280)
                .style('background-color', '#2d2d2d');

// pull data
    // Genre: "Documentary"
    // IMDB Score: "2.5"
    // Language: "English/Japanese"
    // Premiere: "August 5, 2019"
    // Runtime: "58"
    // Title: "Enter the Anime"
const data = await d3.csv('NetflixOriginals.csv', (d) => {
    return {
        genre: d.Genre,
        score: +d['IMDB Score'],
        language: d.Language,
        date: new Date(d.Premiere),
        runtime: +d.Runtime,
        title: d.Title
    }
});

