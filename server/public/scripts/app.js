
$(document).ready(function(){
  var currentIndex = 0;
  var TIME_INTERVAL = 10000;// in milliseconds
  var $el = $('#ajax-data');

  callAjax();


  var timer = setInterval(function(){
    currentIndex++;
    callAjax();
  }, TIME_INTERVAL);

  function resetInterval(){
    clearInterval(timer);
    timer = setInterval(function(){
      currentIndex++;
      callAjax();

    }, TIME_INTERVAL);
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
        console.log(currentIndex);
        var sigmaData = data.sigmanauts;

        checkCurrentIndex(sigmaData);

        appendTableToDom(sigmaData);


        $el.fadeOut(function(){
          appendDataToDom(sigmaData);
          $el.fadeIn();
        });

      }
    });
  }

  function checkCurrentIndex(sigmaData){
    if(currentIndex === sigmaData.length){
      currentIndex = 0;
    } else if(currentIndex < 0){
      currentIndex = sigmaData.length-1;
    }
  }

  function appendTableToDom(sigmaData){
    $('#ajax-data, #ajax-table').empty();

    $('#ajax-table').append('<tr></tr>');
    for(var i=0; i < sigmaData.length; i++){
      $('#ajax-table tr').append('<td></td>');
    }
    $('#ajax-table tr td:nth-child('+(currentIndex+1)+')').addClass('red');
  }


  function appendDataToDom(sigmaData){
    var sigmanaut = sigmaData[currentIndex];
    $el.append('<p>' + sigmanaut.name +
                       '</p><p><a href="https://github.com/' + sigmanaut.git_username +
                       '" target="_blank">https://github.com/' + sigmanaut.git_username +
                       '</a></p><p>' + sigmanaut.shoutout + '</p>');


  }

});
