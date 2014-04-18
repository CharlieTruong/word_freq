$(document).ready(function(){

  $('#file').change(function(){
    if ($( '#file' )[0].files[0].type != 'text/plain'){
      alert('Please provide a plain text file');
    }
    else{
      $('input[type=submit]').removeAttr('disabled');
    }
  });


  $("#file_upload").submit(function(e){
    e.preventDefault();
    $('#loader').show();
    var data = new FormData();
    data.append( 'file', $( '#file' )[0].files[0] );
    var url = $("#file_upload").attr('action')

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      processData: false,
      contentType: false,
      success: function(response){
        $('#loader').hide();
        graph(response);
      },
      dataType: 'json'
    });    
  })
});
    

var graph = function(wordCount){
  var width = 420
  var barHeight = 20;
  color = d3.scale.category20();
  
  var data=[];
  var labels=[];
  
  $.each(wordCount,function(word,count){
    data.push(count);
    labels.push(word);
  });

  console.log(data);
  console.log(labels);
  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, width]);

  var barLabelWidth = 400; // space reserved for bar labels
  var barLabelPadding = 5; // padding between bar and bar labels (left)
  var gridLabelHeight = 18; // space reserved for gridline labels
  var gridChartOffset = 3; // space between start of grid and first bar
  var valueLabelWidth = 40;
  var barLabel = function(d) { return d; };

  // scales
  var yScale = d3.scale.ordinal().domain(d3.range(0, labels.length)).rangeBands([0, labels.length * barHeight]);
  var y = function(d, i) { return yScale(i); };
  var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };

  var chart = d3.select("#graph")
      .append("svg")
      .attr("width", width + barLabelWidth + valueLabelWidth)
      .attr("height",  gridLabelHeight + gridChartOffset + data.length * barHeight);


  

  var labelsContainer = chart.append('g')
    .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
  
  labelsContainer.selectAll('text').data(labels).enter().append('text')
    .attr('y', yText)
    .attr('stroke', 'none')
    .attr('fill', 'black')
    .attr("dy", ".35em") // vertical-align: middle
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