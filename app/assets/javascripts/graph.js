FileForm.prototype.graph = function(container, wordCount){
  var width = 420
  var barHeight = 20;
  var barLabelWidth = 75; 
  var barLabelPadding = 5; 
  var gridLabelHeight = 18; 
  var gridChartOffset = 3; 
  var valueLabelWidth = 40;
  var data=[];
  var labels=[];
  
  $.each(wordCount,function(word,count){
    data.push(count);
    labels.push(word);
  });

  color = d3.scale.category20();

  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, width]);

  var barLabel = function(d) { return d; };

  var yScale = d3.scale.ordinal().domain(d3.range(0, labels.length)).rangeBands([0, labels.length * barHeight]);
  var y = function(d, i) { return yScale(i); };
  var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
  var svgWidth = width + barLabelWidth + valueLabelWidth;
  var svgHeight = gridLabelHeight + gridChartOffset + data.length * barHeight;

  var chart = d3.select(container)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

  var labelsContainer = chart.append('g')
    .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
  
  labelsContainer.selectAll('text').data(labels).enter().append('text')
    .attr('y', yText)
    .attr('stroke', 'none')
    .attr('fill', 'black')
    .attr("dy", ".35em")
    .attr('text-anchor', 'end')
    .text(barLabel);

  var barContainer = chart.append('g')
    .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 

  var bars = barContainer.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bars.append("rect")
      .attr("height", barHeight - 1)
      .attr("fill", function(d, i) { return color(i); })
      .attr("width",0)
      .transition()
      .duration(1000)
      .attr("width", function(d) { return x(d); });

  bars.append("text")
      .attr("x", function(d) { return x(d) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .transition()
      .delay(1000)
      .text(function(d) {if(d > 0){return d}; });
}