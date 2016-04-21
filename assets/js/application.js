
$(document).ready(function(){ 

 init_game();
 $("#start_button").click(function(){
  $(this).hide();
   start_game();
 })

/*=====================================================*/

function init_game(){   
 var bgm = $("#bgm")[0];
 bgm.play();

 $('body').mousemove(function(e){
	var cursor = $("#cursor");
    cursor.css("left",e.pageX - 50);
    cursor.css("top",e.pageY - 80);
 })

 $('body').click(function(){
 $("#hammer_voice")[0].play();
 })

 $('body').click(function(){
	var cursor = $("#cursor");
	cursor.addClass("rotate50");
    setTimeout(function(){
     cursor.removeClass("rotate50");
    },80)

 })

$("#bgm_switcher").toggle(function(){
	bgm.pause();
},function(){
	bgm.play();
})


}  /* end init_game*/



function start_game(){
  var score = 0;
  $("#score").html(score);
  var holes = $(".hole");
  var mouse = '<img src="assets/images/mouse.png"  class="mouse">';
  var boom = '<img src="assets/images/boom.png" class="boom">';
  var species = ["mouse","boom"];
  var mouses = $('.mouse');
  
  var speed = 1500;
  var extra_speed = 0;
  var max_extra_speed = 1000;
  $("#speed").html(parseFloat(speed) / 1000);

  var total_time = 90000;
  var game = setInterval(pop_species,1000);
  var timer = setInterval(show_time,1000);

  var health = 3;
  var health_image = '<img src="assets/images/health.png" class="health_image">'
  for (var i=0; i < health; i++) {
     $("#health").append(health_image);
 }

 function pop_species(){
  var rand_position = Math.floor(Math.random()*14);
  var rand_speci_index = Math.floor(Math.random() * (species.length));

  holes.each(function(i){
    if (rand_position == i) {

      switch(species[rand_speci_index]){
         case "mouse":
           $(this).append(mouse);
           var pop_mouse = $(this).find(".mouse");

           pop_mouse.click(function(){
               score += 10;
               if (score % 100 == 0 && extra_speed < max_extra_speed) {
                   extra_speed += 100;
               if (extra_speed == max_extra_speed) {
                 $("#speed").html(parseFloat(speed + extra_speed)/1000 + "(极限)");
               } else{
                $("#speed").html(parseFloat(speed + extra_speed)/1000);
               }
              }

              $("#score").html(score);
              $(this).css("display","none"); 

            })
           pop_mouse.delay(speed - extra_speed).fadeOut();
           break;
         case "boom":
           $(this).append(boom);
           var pop_boom = $(this).find(".boom");

           pop_boom.click(function(){
              if (health == 1) {
                $(".health_image:last").remove()
                alert("抱歉,机会已用尽,你的分数是:" + score);
                game_over();
              }
             
              health -= 1;
              $(".health_image:last").remove()
              $(this).css("display","none");
           })
           $(this).find(".boom").delay(speed - extra_speed).fadeOut();
           break;  
      }

    }
  })

  }


 function show_time(){
  var seconds = Math.floor((total_time/1000) % 60);
  var minutes = Math.floor((total_time/1000/60) % 60);
  $("#timer").html("剩余" + minutes + "分" + seconds + "秒");
  total_time -= 1000;
  if (total_time < 0) {
    game_over();
     alert("时间到，游戏结束！您的成绩是:" + score);
  }
 }

 function game_over(){
    clearInterval(timer);
    clearInterval(game);
    $("#start_button").show();
 }
 

} /*end start_game*/

  

})


