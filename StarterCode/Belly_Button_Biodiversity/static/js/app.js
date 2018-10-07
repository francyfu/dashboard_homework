// @TODO: Complete the following function that builds the metadata panel
function buildMetadata(sample) {
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(`/metadata/${sample}`).then((data) => {
   var panel = d3.select("#sample-metadata");
   // Use `.html("") to clear any existing metadata
   panel.html("");

   // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
   Object.entries(data).forEach(([key,value]) => {
     panel.append("p").text(`${key},${value}`);
     console.log(`line 15,${data}`);
   });
});
    
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}
// function unpack(rows, index) {
//   return rows.map(function(row) {
//     return row[index];
//   });
// }
function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {
    console.log(data);
   // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  
    var otu_ids = data["otu_ids"];
    var otu_labels = data["otu_labels"];
    var sample_values = data["sample_values"];
    
    var pie_otu_ids = otu_ids.slice(0,10);
    var pie_otu_labels = otu_labels.slice(0,10);
    var pie_sample_values = sample_values.slice(0,10);
    console.log(pie_otu_ids);
    console.log(pie_otu_labels);
    console.log(pie_sample_values);

    var trace1 = {
      values: pie_sample_values,
      labels: pie_otu_ids,
      hovertext: pie_otu_labels,
      type: "pie"
    };

    var trace2 = {
      x: otu_ids,
      y: sample_values,
      hovertext: otu_labels,
      mode:"markers",
      marker:{
        size: sample_values,
        color: otu_ids
    }
  };

      data1 = [trace1];
    
      data2 = [trace2];

    Plotly.newPlot("pie", data1);
    Plotly.newPlot("bubble", data2);

  
    });
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();


