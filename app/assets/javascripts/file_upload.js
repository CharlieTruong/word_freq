$(document).ready(function(){
  var fileForm = new FileForm($('form'), $('#loader'), '#graph');
});

function FileForm(formEl,loaderEl, graphContainer){
  this.$el = formEl;
  this.$fileInput = this.$el.find("input[type=file]");
  this.$loader = loaderEl;
  this.graphContainer = graphContainer;
  var self = this;

  this.$fileInput.change(function(){
    var fileType = self.$fileInput[0].files[0].type
    self.checkFileType(fileType);
  });

  this.$el.submit(function(e){
    e.preventDefault();
    self.resetGraph();
    var data = new FormData();
    data.append(self.$fileInput.attr('type'), self.$fileInput[0].files[0]);
    var url = self.$el.attr('action');
    self.submitFile(data, url)
  });
}

FileForm.prototype.checkFileType = function(fileType) {
  fileType != 'text/plain' ? this.alertWrongType() : this.enableSubmit();
}

FileForm.prototype.alertWrongType = function(){
  this.$el.find('input[type=submit]').attr('disabled', 'disabled');
  alert('Please provide a plain text file');
}

FileForm.prototype.enableSubmit = function(){
  this.$el.find('input[type=submit]').removeAttr('disabled');
}

FileForm.prototype.resetGraph = function(){
  $(this.graphContainer).find('svg').remove();
  $(this.graphContainer).show();
}

FileForm.prototype.submitFile = function(data, url){
  var self = this;

  $.ajax({
    type: "POST",
    url: url,
    data: data,
    processData: false,
    contentType: false,
    success: function(response){
      self.$loader.hide();
      self.graph(self.graphContainer,response);
    },
    dataType: 'json'
  });    
}