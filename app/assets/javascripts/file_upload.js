$(document).ready(function(){
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
        console.log(response);
      },
      dataType: 'json'
    });    
  })
});
    
