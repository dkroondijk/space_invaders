$(document).ready(function(){

  $('.player').click(function(){
    $(this).css('background-color', 'blue');
  });

  var player = $('.player');

  $(document).keydown(function(event){
    if(event.which === 37){
      event.preventDefault();
      var left = player.css('left');
      var newLeft = parseInt(left) - 100;
      player.css('left', newLeft);
    } else if(event.which === 39){
      event.preventDefault();
      var left = player.css('left');
      var newLeft = parseInt(left) + 100;
      player.css('left', newLeft);
    } else if(event.which === 32){
      event.preventDefault();
      var left = parseInt(player.css('left'));
      var bottom = parseInt(player.css('bottom'));
      $('body').append($('<div>').addClass('bullet').css({'left': left + 14, 'bottom': bottom}));
    }
  });

  var aliens = $('table');
  var aliensMoveDirection = 1;

  function update() {
    $('.bullet').each(function(){
      var bottom = $(this).css('bottom');
      var newBottom = parseInt(bottom) + 2;
      $(this).css('bottom', newBottom);
      var bullet = $(this);

      $('.alien').each(function(){
        var alienBottom = $(this).offset().top + 30;
        var alienLeft = $(this).offset().left;
        var alienRight = $(this).offset().left + 96;
        var bulletTop = bullet.offset().top;
        var bulletLeft = bullet.offset().left;

        if(bulletTop < alienBottom && bulletLeft >= alienLeft && bulletLeft <= alienRight ){
          $(this).remove();
          bullet.remove();
        }        
      });      

      if(parseInt(bottom) > window.innerHeight){
        $(this).remove();
      }
    });

    if($('.alien').length === 0){
      alert('You defeated the aliens!!');
      location.reload();
    }

    var aliensLeftPosition = aliens.offset().left;
    var newLeft = aliensLeftPosition + aliensMoveDirection;
    aliens.offset({left: newLeft});
    var aliensTopPosition = aliens.offset().top;

    if(aliensLeftPosition + 1042 > window.innerWidth){
      var newTop = aliensTopPosition + 15;
      aliens.offset({top: newTop});
      aliensMoveDirection = -1;
    } else if(aliensLeftPosition < 0){
      var newTop = aliensTopPosition + 15;
      aliens.offset({top: newTop});
      aliensMoveDirection = 1;      
    } else if(aliensTopPosition > window.innerHeight){
      alert('The aliens won!');
      location.reload();
    }
  }
  setInterval(update, 6);
});