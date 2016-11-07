var currentIndex = 0;
$(document).ready(function(){

  var TIME_INTERVAL = 10000;// in milliseconds
  var $el = $('#ajax-data');

  callAjax();
  startTimer();
  function startTimer(){
    var timer = setInterval(function(){
      currentIndex++;
      callAjax();
    }, TIME_INTERVAL);
  }

  function resetInterval(){
    clearInterval(timer);
    tstartTimer();
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

        appendDataToDom(sigmaData);

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
    $('#ajax-table').empty();

    $('#ajax-table').append('<tr></tr>');
    for(var i=0; i < sigmaData.length; i++){
      $('#ajax-table tr').append('<td></td>');
    }
    $('#ajax-table tr td:nth-child('+(currentIndex+1)+')').addClass('red');
  }


  function appendDataToDom(sigmaData){
    var sigmanaut = sigmaData[currentIndex];
    $el.fadeOut(600, function(){
      $('#ajax-data').empty();
      $el.append('<p id="name">' + sigmanaut.name + '</p>');
      $el.append('<p><a href="https://github.com/' + sigmanaut.git_username +
                         '" target="_blank">https://github.com/' + sigmanaut.git_username +
                         '</a></p>');
      $el.append('<p id="shoutout">"' + sigmanaut.shoutout + '"</p>');
      $el.fadeIn(600);
    });




  }

});
