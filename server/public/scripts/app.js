
$(document).ready(function(){
  var currentIndex = 0;
  var sigmanautsLength = 0;
  callAjax();


  var timer = setInterval(function(){
    currentIndex++;
    callAjax();
  }, 5000);

  function resetInterval(){
    clearInterval(timer);
    timer = setInterval(function(){
      currentIndex++;
      callAjax();
    }, 5000);
  }


  $('#next').on('click',function(){
    resetInterval();
    currentIndex += 1;
    callAjax();
  });

  $('#previous').on('click',function(){
    resetInterval();
    currentIndex--;
    callAjax();
  });




  function callAjax(){

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
        appendDataToDom(sigmaData);

      }
    });
  }




  function appendTableToDom(sigmaData){
    $('#ajax-data, #ajax-table').empty();

    $('#ajax-table').append('<tr></tr>');
    for(var i=0; i < sigmaData.length; i++){
      $('#ajax-table').find('tr').append('<td></td>');
    }
    $('#ajax-table tr td:nth-child('+(currentIndex+1)+')').addClass('red');
  }


  function appendDataToDom(sigmaData){
    $('#ajax-data').hide();
    $('#ajax-data').append('<p>' + sigmaData[currentIndex].name +
                       '</p><p>' + sigmaData[currentIndex].git_username +
                       '</p><p>' + sigmaData[currentIndex].shoutout + '</p>');
    $('#ajax-data').fadeIn('slow');
  }
});
