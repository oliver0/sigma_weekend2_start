
$(document).ready(function(){
  var currentIndex = 0;
  var sigmanautsLength = 0;

  $('#next').on('click',function(){
    currentIndex += 1;
    callAjax();
  });
  
  $('#previous').on('click',function(){
    currentIndex--;
    callAjax();
  });


  //setInterval(callAjax, 5000);

  function callAjax(){
    //currentIndex++;
    $.ajax({

      type: "GET",
      url: "/data",
      success: function(data){
        // sigmanautsLength = data.sigmanauts.length;
        var sigmaData = data.sigmanauts;


        if(currentIndex === sigmaData.length){
          currentIndex = 0;
        } else if(currentIndex < 0){
          currentIndex = sigmaData.length-1;
        }
        appendTableToDom(sigmaData);

      }
    });
  }




  function appendTableToDom(sigmaData){
    $('#ajax-table').empty();
    $('#ajax-data').empty();
    $('#ajax-table').append('<tr></tr>');
    for(var i=0; i < sigmaData.length; i++){
      $('#ajax-table').find('tr').append('<td></td>');
    }
    //$('#ajax-table').find('tr').children().last().data('index', i);
    $('#ajax-table tr td:nth-child('+(currentIndex+1)+')').addClass('red');
    $('#ajax-data').append(sigmaData[currentIndex].name);
    //console.log(sigmanautsLength);
  }
});
