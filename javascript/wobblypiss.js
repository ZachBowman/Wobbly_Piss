// Wobbly Piss
// 2014 Nightmare Games
// Zach Bowman

var canvas_2d;
var div;
var fps = 30;
var game_state = "title";
var game;

var logo_counter = 0;
var logo_delay = 3;
var logo_frame = 0;
var click_here_counter = 0;
var click_here_delay = 20;
var click_here_onoff = true;

var title_screen_message = "CLICK TO START";
var title_clicked = false;
var fade_direction = "none";
var fade_opacity = 0;

var title_screen = Sprite ("title3");
var title_animation2 = Sprite ("title_animation2");
var title_animation3 = Sprite ("title_animation3");

////////////////////////////////////////////////////////////////////////////////

function init ()
  {
  canvas_2d = document.getElementById ("canvas").getContext ("2d");
  div = document.getElementById ("canvas_div");
  div.addEventListener ("click", title_screen_click, false);
  }

////////////////////////////////////////////////////////////////////////////////

setInterval (function()
  {
  if (title_clicked === false) title_screen_update();
  else game.update();

  if (canvas_2d)
    {
    if (title_clicked === false) title_screen_draw();
    else game.draw();
    }
  }, 1000 / fps);

////////////////////////////////////////////////////////////////////////////////

function title_screen_update ()
  {
  logo_counter += 1;
  if (logo_counter >= logo_delay)
    {
    logo_counter = 0;
    logo_frame += 1;
    if (logo_frame >= 3) logo_frame = 0;
    }

  click_here_counter += 1;
  if (click_here_counter >= click_here_delay)
    {
    click_here_counter = 0;
    if (click_here_onoff === true) click_here_onoff = false;
    else click_here_onoff = true;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function title_screen_draw ()
  {
  title_screen.draw (canvas_2d, 0, 0);
  if (logo_frame === 1) title_animation2.draw (canvas_2d, 0, 0);
  if (logo_frame === 2) title_animation3.draw (canvas_2d, 0, 0);
  canvas_2d.fillStyle = "#FFFF00";
  canvas_2d.font = "24px impact";
  if (click_here_onoff === true) canvas_2d.fillText (title_screen_message, 90, 225);
  }

////////////////////////////////////////////////////////////////////////////////

function title_screen_click ()
  {
  title_clicked = true;
  div.removeEventListener ("click", title_screen_click, false);
  game = new wobblypiss_namespace.wobblypiss();
  }

////////////////////////////////////////////////////////////////////////////////

this.wobblypiss_namespace = this.wobblypiss_namespace || {};

(function ()
  {
  var canvas_html;
  var preload;

  var screen_width = 320;
  var screen_height = 480;
  var boundary = 50;

  var click_to_start_sound = false;
  var piss_start = false;
  var pointer_down = false;
  var beer_level = 0;
  var points = 0;
  var previous_points = 0;
  var delay_counter = 0;
  var level_end_delay = 75;
  var level_result_delay = 50;
  var level_result = "none";
  //var fade_opacity = 0;
  //var fade_direction = "none";
  var big_beer_y = 305;
  var shit_yell = false;

  var origin_x = 160;
  var origin_y = 500;
  var bullseye_x = 160;
  var bullseye_y = 295;
  var main_target_x = 320;
  var main_target_y = 0;

  var piss_wobble = 1;
  var target_wobble = 1;
  var wobble_target_x_diff = 0;
  var wobble_target_y_diff = 0;
  var wobble_target_x_velocity = 0;
  var wobble_target_y_velocity = 0;
  var wobble_targe_max_velocity = 1;
  var wobble_target_delay = 100;
  var wobble_target_counter = 0;
  var screen_wobble = 0;
  var screen_x_offset = 0;
  var screen_y_offset = 0;
  var water_opacity = 0.0;

  var toilet_broken = false;
  var wall_broken = false;
  var floor_broken = false;

  var key_right = false;

  var end_sequence = 0;
  var end_delay1 = [];
  var end_delay2 = [];
  var end_counter = 0;
  var end_max1 = 5;
  var end_max2 = 3;
  var earth1_x = 45;
  var earth1_y = 56;
  var earth2_x = 106;
  var earth2_y = 84;
  var shard2_x = 155;
  var shard2_y = 70;
  var shard1_x = 195;
  var shard1_y = 90;
  var shard3_x = 160;
  var shard3_y = 100;
  var text_opacity = 0.0;

  var red_opacity = 0.0;
  var red_increase = false;
  var white_opacity = 1.0;
  var explosion_frame = 0;
  var explosion_counter = 0;
  var explosion_delay = 5;
  var explosion_opacity = 1.0;

  var piss_sound_counter = 0;
  var piss_sound_delay = 8;
  var next_drop_creates_puddle = true;

  var beermug_sprite       = Sprite ("beermug2");
  var floor_sprite         = Sprite ("floor3");
  var toilet_sprite        = Sprite ("toilet3");
  var toilet_broken_sprite = Sprite ("toilet_broken2");
  var piss_sprite          = Sprite ("piss_drop3");
  var yellow_water_sprite  = Sprite ("yellow_water");
  var black_sprite         = Sprite ("black");
  var red_sprite           = Sprite ("red");
  var white_sprite         = Sprite ("white");
  var big_mug_sprite       = Sprite ("beermug_empty2");
  var big_beer_sprite      = Sprite ("beer2");
  var puddle_1_sprite      = Sprite ("puddle1a");
  var puddle_2_sprite      = Sprite ("puddle2a");
  var wall_hole_sprite     = Sprite ("wall_hole2");
  var floor_hole_sprite    = Sprite ("floor_hole2");
  var space_sprite         = Sprite ("space");
  var earth_sprite         = Sprite ("earth1");
  var earth_broken1_sprite = Sprite ("earth_broken1");
  var earth_broken2_sprite = Sprite ("earth_broken2");
  var earth_shard1_sprite  = Sprite ("earth_shard1");
  var earth_shard2_sprite  = Sprite ("earth_shard2");
  var earth_shard3_sprite  = Sprite ("earth_shard3");

  var explosion_sprite = [];
  explosion_sprite[0] = Sprite ("explosion1a");
  explosion_sprite[1] = Sprite ("explosion2a");
  explosion_sprite[2] = Sprite ("explosion3a");
  explosion_sprite[3] = Sprite ("explosion4a");
  explosion_sprite[4] = Sprite ("explosion5a");
  explosion_sprite[5] = Sprite ("explosion6a");
  explosion_sprite[6] = Sprite ("explosion7a");
  explosion_sprite[7] = Sprite ("explosion8a");

  var text_seat  = Sprite ("text_seat2");
  var text_floor = Sprite ("text_floor2");
  var text_tank  = Sprite ("text_tank2");
  var text_wall  = Sprite ("text_wall2");
  var text_everywhere    = Sprite ("text_everywhere2");
  var text_outofcontrol  = Sprite ("text_outofcontrol2");
  var text_asshole       = Sprite ("text_asshole2");
  var text_pissingoff    = Sprite ("text_pissingoff2");
  var text_broketoilet   = Sprite ("text_broketoilet2");
  var text_brokewall     = Sprite ("text_brokewall2");
  var text_brokefloor    = Sprite ("text_brokefloor2");
  var text_pissplanet    = Sprite ("text_pissplanet2");
  var text_pisscritical  = Sprite ("text_pisscritical2");

  var result_background  = Sprite ("result_background");
  var result_greatjob    = Sprite ("result_greatjob2");
  var result_waytogo     = Sprite ("result_waytogo2");
  var result_uh          = Sprite ("result_uh2");
  var result_hygenic     = Sprite ("result_hygenic2");
  var result_noone       = Sprite ("result_noone2");
  var result_problem     = Sprite ("result_problem2");
  var result_whatthehell = Sprite ("result_whatthehell2");
  var result_publicpool  = Sprite ("result_publicpool2");

  var sound_break_floor  = new Audio ("sounds/break_floor.mp3");
  var sound_break_toilet = new Audio ("sounds/break_toilet.mp3");
  var sound_break_wall   = new Audio ("sounds/break_wall.mp3");
  var sound_cough1       = new Audio ("sounds/cough1.mp3");
  var sound_cough2       = new Audio ("sounds/cough2.mp3");
  var sound_ew1          = new Audio ("sounds/ew1.mp3");
  var sound_ew2          = new Audio ("sounds/ew2.mp3");
  var sound_explosion    = new Audio ("sounds/explosion.mp3");
  var sound_floor_hit1   = new Audio ("sounds/floor_hit1.mp3");
  var sound_floor_hit2   = new Audio ("sounds/floor_hit2.mp3");
  var sound_floor_hit3   = new Audio ("sounds/floor_hit3.mp3");
  var sound_floor_hit4   = new Audio ("sounds/floor_hit4.mp3");
  var sound_floor_hit5   = new Audio ("sounds/floor_hit5.mp3");
  var sound_floor_hit6   = new Audio ("sounds/floor_hit6.mp3");
  var sound_glug1        = new Audio ("sounds/glug1.mp3");
  var sound_glug2        = new Audio ("sounds/glug2.mp3");
  var sound_hmm1         = new Audio ("sounds/hmm1.mp3");
  var sound_shit1        = new Audio ("sounds/shit1.mp3");
  var sound_shit2        = new Audio ("sounds/shit2.mp3");
  var sound_shit3        = new Audio ("sounds/shit3.mp3");
  var sound_uhoh1        = new Audio ("sounds/uhoh1.mp3");
  var sound_uhoh2        = new Audio ("sounds/uhoh2.mp3");
  var sound_woo1         = new Audio ("sounds/woo1.mp3");
  var sound_yeah1        = new Audio ("sounds/yeah1.mp3");
  var sound_yeah2        = new Audio ("sounds/yeah2.mp3");
  var sound_yup1         = new Audio ("sounds/yup1.mp3");
  var sound_zip3         = new Audio ("sounds/zip3.mp3");
  var sound_zip4         = new Audio ("sounds/zip4.mp3");

  notification = new notification_object();

  var piss_level_limit = 300;
  var total_piss = 0;
  var total_piss_on_seat = 0;
  var total_piss_on_floor = 0;
  var total_piss_on_tank = 0;
  var total_piss_on_wall = 0;
  var seat_piss_warning = 40;
  var floor_piss_warning = 40;
  var tank_piss_warning = 40;
  var wall_piss_warning = 40;
  var warning_everywhere = false;
  var warning_control = false;
  var warning_asshole = false;
  var warning_pissingoff = false;
  var warning_pissplanet = false;
  var total_warnings = 0;

  var max_drops = 50;
  var piss_delay = 2;
  var piss_delay_counter = 0;
  var piss_cycle = 0;
  var piss_drop = [];

  var max_puddles = 75;
  //var total_puddles = 0;
  //var total_puddles_in_array = 0;
  var puddle_cycle = 0;
  var puddle = [];//new Array();

  var end_text1 = new sprite_fade_object ("end_text1");
  var end_text2 = new sprite_fade_object ("end_text2");
  var end_text3 = new sprite_fade_object ("end_text3");
  var end_text4 = new sprite_fade_object ("end_text4");
  var end_text5 = new sprite_fade_object ("end_text5");

  ////////////////////////////////////////////////////////////////////////////////

  function wobblypiss ()
    {
    this.init();
    }

  wobblypiss_namespace.wobblypiss = wobblypiss;

  ////////////////////////////////////////////////////////////////////////////////

  wobblypiss.prototype.init = function ()
    {
    canvas_2d = document.getElementById ("canvas").getContext ("2d");
    canvas_html = document.getElementById ("canvas");

    canvas_html.addEventListener   ("mousedown",   function() {mouse_down (false)}, false);
    canvas_html.addEventListener   ("mousemove",   function() {mouse_move (false)}, false);
    canvas_html.addEventListener   ("touchstart",  function() {mouse_down (true)},  false);
    canvas_html.addEventListener   ("touchmove",   function() {mouse_move (true)},  true);
    canvas_html.addEventListener   ("touchend",    function() {mouse_up (true)},    false);
    document.body.addEventListener ("mouseup",     function() {mouse_up (false)},   false);
    document.body.addEventListener ("touchcancel", function() {mouse_up (true)},    false);
    document.body.addEventListener ('touchmove',   function (event) {event.preventDefault()}, false);

    init_sound();

    if (game_state === "title") fade_direction = "out";
    else if (game_state === "game") beer_level = 1;
    else if (game_state === "end1") screen_wobble = 1;

    end_delay1[0] = 90;   // shaking - drifting
    end_delay1[1] = 150;  // drifting - text 1
    end_delay1[2] = 90;   // text 1 - text 2
    end_delay1[3] = 30;   // text 2 - fade
    end_delay1[4] = 60;   // fade out

    end_delay2[0] = 90;
    end_delay2[1] = 90;
    end_delay2[2] = 90;
    }

  ////////////////////////////////////////////////////////////////////////////////

  function init_sound()
    {
    if (!createjs.Sound.initializeDefaultPlugins()) 
      {
      console.log ("Sound not available on this device.");
      sound_loaded();
      return;
      }

    var sounds =
      [
      {id: "mmhmm1",       src: "mmhmm1.mp3"},
      {id: "mmhmm2",       src: "mmhmm2.mp3"},
      {id: "water_hit1",   src: "water_hit1.mp3"},
      {id: "water_hit2",   src: "water_hit2.mp3"},
      {id: "water_hit3",   src: "water_hit3.mp3"},
      {id: "water_hit4",   src: "water_hit4.mp3"},
      {id: "water_hit5",   src: "water_hit5.mp3"},
      {id: "water_hit6",   src: "water_hit6.mp3"},
      {id: "floor_hit1",   src: "floor_hit1.mp3"},
      {id: "floor_hit2",   src: "floor_hit2.mp3"},
      {id: "floor_hit3",   src: "floor_hit3.mp3"},
      {id: "floor_hit4",   src: "floor_hit4.mp3"},
      {id: "floor_hit5",   src: "floor_hit5.mp3"},
      {id: "floor_hit6",   src: "floor_hit6.mp3"},
      {id: "glug1",        src: "glug1.mp3"},
      {id: "glug2",        src: "glug2.mp3"},
      {id: "break_floor",  src: "break_floor.mp3"},
      {id: "break_toilet", src: "break_toilet.mp3"},
      {id: "break_wall",   src: "break_wall.mp3"},
      {id: "cough1",       src: "cough1.mp3"},
      {id: "cough2",       src: "cough2.mp3"},
      {id: "ew1",          src: "ew1.mp3"},
      {id: "ew2",          src: "ew2.mp3"},
      {id: "explosion",    src: "explosion.mp3"},
      {id: "hmm1",         src: "hmm1.mp3"},
      {id: "shit1",        src: "shit1.mp3"},
      {id: "shit2",        src: "shit2.mp3"},
      {id: "shit3",        src: "shit3.mp3"},
      {id: "uhoh1",        src: "uhoh1.mp3"},
      {id: "uhoh2",        src: "uhoh2.mp3"},
      {id: "woo1",         src: "woo1.mp3"},
      {id: "yeah1",        src: "yeah1.mp3"},
      {id: "yeah2",        src: "yeah2.mp3"},
      {id: "yup1",         src: "yup1.mp3"},
      {id: "zip3",         src: "zip3.mp3"},
      {id: "zip4",         src: "zip4.mp3"}
      ];
    
    title_screen_message = "LOADING SOUND";
    createjs.Sound.addEventListener ("fileload", sound_loaded);
    createjs.Sound.registerSounds (sounds, "sounds/");
    }

  ////////////////////////////////////////////////////////////////////////////////

  function sound_loaded (event)
    {
    title_screen_message = "CLICK TO START";
    // canvas_html.onclick = handle_click;
    play_sound ("great");
    createjs.Sound.removeEventListener ("fileload", sound_loaded);
    }

  ////////////////////////////////////////////////////////////////////////////////

  // function handle_click()
  //   {
  //   canvas_html.onclick = null;
  //   }

  ////////////////////////////////////////////////////////////////////////////////

  function create_droplet ()
    {
    var new_drop = new Piss_Drop (origin_x, origin_y, main_target_x, main_target_y, piss_wobble, wobble_target_x_diff, wobble_target_y_diff);
    new_drop.activate ();
    piss_drop.push (new_drop);
    total_piss += 1;
    // if (next_drop_creates_puddle === true) next_drop_creates_puddle = false;
    // else next_drop_creates_puddle = true;
    }

  ////////////////////////////////////////////////////////////////////////////////

  function create_puddle (x, y)
    {
    if (puddle.length < max_puddles)
      {
      new_puddle = new Puddle;
      new_puddle.activate (x, y);
      puddle.push (new_puddle);
      }
    }

  ////////////////////////////////////////////////////////////////////////////////

  function mouse_down (finger)
    {
    if (game_state === "title")
      {
      fade_direction = "out";
      // play_sound ("great");
      }
    else if (game_state === "beer")
      {
      game_state = "game";
      if (piss_start === false) piss_start = true;
      }
    pointer_down = true;
    mouse_move (finger);
    }

  //////////////////////////////////////////////////////////////////////////////// 

  function mouse_move (finger, e)
    {
    if (!e) var e = event;
    if (finger === true) e.preventDefault();

    main_target_x = e.pageX - canvas_html.offsetLeft;
    main_target_y = e.pageY - canvas_html.offsetTop;
    }

  //////////////////////////////////////////////////////////////////////////////// 

  function mouse_up (finger)
    {
    pointer_down = false;
    if (finger === false) mouse_move (false);
    }
   
  ////////////////////////////////////////////////////////////////////////////////

  wobblypiss.prototype.update = function ()
    {
    var r;  // random number
    var s;  // random sound
    
    if (game_state === "game")
      {
      // cheat
      if (keydown.right && key_right === false)
        {
        key_right = true;
        //next_level();
        }
      else if (keydown.right === false && key_right === true) key_right = false;

      // create droplet stream
      if (piss_start === true && total_piss < piss_level_limit)
        {
        piss_delay_counter += 1;
        if (piss_delay_counter >= piss_delay)
          {
          piss_delay_counter = 0;
          create_droplet();
          }
        }

      // update droplets
      var d = 0;
      while (d < piss_drop.length && piss_drop.length > 0)
        {
        if (piss_drop[d].check_active() === true)
        	{
        	piss_drop[d].update();
        	d += 1;
          }
        else piss_drop.splice (d, 1);
        }

      // update puddles
      if (total_piss < piss_level_limit)
        {
        // for (var p = 0; p < max_puddles; p += 1)
        var p = 0;
        while (p < puddle.length && puddle.length > 0)
          {
          if (puddle[p].check_active() === true)
          	{
          	puddle[p].update();
          	p += 1;
            }
          else puddle.splice (p, 1);
          }
        }

      // update wobble target
      wobble_target_x_diff += wobble_target_x_velocity;
      wobble_target_y_diff += wobble_target_y_velocity;
      wobble_target_counter += 1;
      if (wobble_target_counter >= wobble_target_delay
          || wobble_target_x_diff > target_wobble
          || wobble_target_x_diff < -target_wobble
          || wobble_target_y_diff > target_wobble
          || wobble_target_y_diff < -target_wobble)
        {
        wobble_target_counter = 0;
        wobble_target_x_velocity = Math.floor ((Math.random() * ((wobble_target_max_velocity * 2) + 1)) - wobble_target_max_velocity) / 10;
        wobble_target_y_velocity = Math.floor ((Math.random() * ((wobble_target_max_velocity * 2) + 1)) - wobble_target_max_velocity) / 10;
        }
        
      // update screen wobble
      update_screen_wobble();

      // red alert
      if (beer_level === 5 && total_piss > piss_level_limit * 0.8)
        {
        if (red_increase === false)
          {
          red_opacity -= .02;
          if (red_opacity <= 0.0)
            {
            red_opacity = 0.0;
            red_increase = true;
            }
          }
        else if (red_increase === true)
          {
          red_opacity += .02;
          if (red_opacity >= 0.5)
            {
            red_opacity = 0.5;
            red_increase = false;
            }
          }
        }

      // breakage
      if (toilet_broken === false && beer_level === 4 && seat_piss_warning + tank_piss_warning > 90)  // toilet break
        {
        toilet_broken = true;
        notification.show (text_broketoilet);
        //createjs.Sound.play ("sound_break_toilet");
        play_sound ("break toilet");
        }
      if (toilet_broken === false && beer_level === 5 && seat_piss_warning + tank_piss_warning > 80)  // toilet break
        {
        toilet_broken = true;
        notification.show (text_broketoilet);
        //createjs.Sound.play ("sound_break_toilet");
        play_sound ("break toilet");
        }
      if (toilet_broken === true && wall_broken === false && beer_level === 5 && wall_piss_warning > 40)  // wall break
        {
        wall_broken = true;
        notification.show (text_brokewall);
        //createjs.Sound.play ("sound_break_wall");
        play_sound ("break wall");
        }
      if (toilet_broken === true && floor_broken === false && beer_level === 5 && floor_piss_warning > 55)  // floor break
        {
        floor_broken = true;
        notification.show (text_brokefloor);
        //createjs.Sound.play ("sound_break_floor");
        play_sound ("break floor");
        }

      update_notification();

      if (beer_level === 5 && total_piss > piss_level_limit * 0.97 && shit_yell === false)
        {
        shit_yell = true;

        play_sound ("panic");
        // s = Math.floor (Math.random() * 3);
             // if (s === 0) createjs.Sound.play ("sound_shit1");
        // else if (s === 0) createjs.Sound.play ("sound_shit2");
        // else createjs.Sound.play ("sound_shit3");
        }

      // check for end of level
      if (total_piss >= piss_level_limit)
        {
        delay_counter += 1;

        if (beer_level === 5)
          {
          game_state = "end1";
          end_sequence = 0;
          end_counter = 0;
          screen_wobble = 1;
          end_text1.reset();
          end_text2.reset();
          end_text3.reset();
          end_text4.reset();
          end_text5.reset();
          white_opacity = 1.0;
          explosion_opacity = 1.0;
          createjs.Sound.stop();
          }

        else if (delay_counter >= level_result_delay && level_result === "none")
          {
          notification.reset();
          delay_counter = 0;
          r = Math.floor (Math.random() * 2);

          if (points > previous_points + 1800)
            {
            if (r === 0) level_result = "great job";
            else level_result = "way to go";

            play_sound ("great");
            }
          else if (points > previous_points + 500)
            {
            if (r === 0) level_result = "uh";
            else level_result = "hygenic";
            
            play_sound ("good");
            }
          else if (points > previous_points - 500)
            {
            if (r === 0) level_result = "no one";
            else level_result = "problem";

            play_sound ("ok");
            }
          else
            {
            if (r === 0) level_result = "what the hell";
            else level_result = "public pool";

            play_sound ("bad");
            }
          }
        if (delay_counter >= level_end_delay && level_result != "none") fade_direction = "out";
        }
      }
      
    else if (game_state === "beer")
      {
      if (big_beer_y < 430) big_beer_y += 1.6;

      click_here_counter += 1;
      if (click_here_counter >= click_here_delay)
        {
        click_here_counter = 0;
        if (click_here_onoff === true) click_here_onoff = false;
        else click_here_onoff = true;
        }
      }

    else if (game_state === "title")
      {
      logo_counter += 1;
      if (logo_counter >= logo_delay)
        {
        logo_counter = 0;
        logo_frame += 1;
        if (logo_frame >= 3) logo_frame = 0;
        }

      click_here_counter += 1;
      if (click_here_counter >= click_here_delay)
        {
        click_here_counter = 0;
        if (click_here_onoff === true) click_here_onoff = false;
        else click_here_onoff = true;
        }
      }

    else if (game_state === "end1")
      {
      if (end_sequence <= end_max1)
        {
        end_counter += 1
        if (end_counter > end_delay1[end_sequence])
          {
          end_counter = 0;
          end_sequence += 1;
          //if (end_sequence === 1) createjs.Sound.play ("sound_explosion");
           if (end_sequence === 1) play_sound ("explosion");
          }
        }

      if (end_sequence === 0)
        {
        screen_wobble = 1;
        update_screen_wobble();  // shaking
        }
      if (end_sequence >= 1)  // drifting
        {
        earth1_x -= .05;
        earth2_x += .05;
        earth2_y += .05;

        shard2_x -= .2;
        shard2_y += .1;
        shard1_y += .3;
        shard3_x -= .2;
        shard3_y += .2;

        if (white_opacity > 0.0) white_opacity -= 0.05;
        if (explosion_opacity > 0.0) explosion_opacity -= .015;

        explosion_counter += 1;
        if (explosion_counter >= explosion_delay)
          {
          explosion_counter = 0;
          explosion_frame += 1;
          if (explosion_frame > 7) explosion_frame = 5;
          }
        }
      if (end_sequence === 4)  // fade out
        {
        fade_direction = "out";
        fade_opacity = 0.0;
        }
      }

    else if (game_state === "end2")
      {
      if (end_sequence <= end_max2)
        {
        end_counter += 1
        if (end_counter > end_delay2[end_sequence])
          {
          end_counter = 0;
          end_sequence += 1;
          }
        }

      if (end_sequence === 3) fade_direction = "out";
      }

    // update_fade
    if (fade_direction != "none")
      {
      if (fade_direction === "in")
        {
        fade_opacity -= 0.02;
        if (fade_opacity <= 0)
          {
          fade_direction = "none";
          }
        }
      else if (fade_direction === "out")
        {
        fade_opacity += 0.02;
        if (fade_opacity >= 1.0)
          {
          fade_direction = "in";
          if (game_state === "game" && beer_level === 5)
            {
            beer_level = 0;
            game_state = "title";
            points = 0;
            previous_points = 0;
            }
          else if (game_state === "title" || game_state === "game")
            {
            next_level();
            game_state = "beer";
            //createjs.Sound.play ("sound_glug2");
            //play_sound ("glug");
            sound_glug1.play();
            }
          else if (game_state === "end1")
            {
            game_state = "end2";
            end_counter = 0;
            end_sequence = 0;
            }
          else if (game_state === "end2")
            {
            beer_level = 0;
            game_state = "title";
            end_text1.reset();
            end_text2.reset();
            end_text3.reset();
            end_text4.reset();
            end_text5.reset();
            }
          }
        }
      }
    }
    
  ////////////////////////////////////////////////////////////////////////////////

  function update_notification ()
    {
    if (notification.check_active() === true) notification.update();
    if (total_piss_on_wall >= wall_piss_warning)// && wall_broken === false)
      {
      total_piss_on_wall = 0;
      if (warning_chooser() === false)
        {
        wall_piss_warning += 5;
        notification.show (text_wall);
        total_warnings += 1;
        }
      }
    if (toilet_broken === false && total_piss_on_tank >= tank_piss_warning)
      {
      total_piss_on_tank = 0;
      if (warning_chooser() === false)
        {
        tank_piss_warning += 5;
        notification.show (text_tank);
        total_warnings += 1;
        }
      }
    if (total_piss_on_floor >= floor_piss_warning)// && floor_broken === false)
      {
      total_piss_on_floor = 0;
      if (warning_chooser() === false)
        {
        floor_piss_warning += 5;
        notification.show (text_floor);
        total_warnings += 1;
        }
      }
    if (toilet_broken === false && total_piss_on_seat >= seat_piss_warning)
      {
      total_piss_on_seat = 0;
      if (warning_chooser() === false)
        {
        seat_piss_warning += 5;
        notification.show (text_seat);
        total_warnings += 1;
        }
      }
    }

  ////////////////////////////////////////////////////////////////////////////////

  function update_screen_wobble ()
    {
    if (screen_wobble > 0 && (total_piss < piss_level_limit || game_state === "end1"))
      {
      screen_x_offset = Math.floor ((Math.random() * screen_wobble) + 1 - (screen_wobble / 2));
      screen_y_offset = Math.floor ((Math.random() * screen_wobble) + 1 - (screen_wobble / 2));
      }
    }

  ////////////////////////////////////////////////////////////////////////////////

  function warning_chooser ()
    {
    var choice = false;
    
    if (beer_level === 5 && total_piss > piss_level_limit * 0.8)
      {
      notification.show (text_pisscritical);
      total_warnings += 1;
      choice = true;
      }
    else if (warning_pissplanet === false && beer_level === 5 && wall_broken === true && floor_broken === true && total_warnings > 6)
      {
      notification.show (text_pissplanet);
      warning_pissplanet = true;
      total_warnings += 1;
      choice = true;
      }
    else if (warning_pissingoff === false && beer_level >= 4 && total_warnings > 5)
      {
      notification.show (text_pissingoff);
      warning_pissingoff = true;
      total_warnings += 1;
      choice = true;
      }
    else if (warning_asshole === false && beer_level >= 3 && total_warnings > 4)
      {
      notification.show (text_asshole);
      warning_asshole = true;
      total_warnings += 1;
      choice = true;
      }
    else if (warning_control === false && beer_level >= 3 && total_warnings > 3)
      {
      notification.show (text_outofcontrol);
      warning_control = true;
      total_warnings += 1;
      choice = true;
      }
    else if (warning_everywhere === false && total_warnings > 2)
      {
      notification.show (text_everywhere);
      warning_everywhere = true;
      total_warnings += 1;
      choice = true;
      }
    return choice;
    }

  ////////////////////////////////////////////////////////////////////////////////

  function next_level ()
    {
    beer_level += 1;
    if (beer_level > 5) beer_level = 1;
    
    total_piss = 0;
    delay_counter = 0;
    wobble_target_x_diff = 0;
    wobble_target_y_diff = 0;
    wobble_target_x_velocity = 0;
    wobble_target_y_velocity = 0;
    total_piss_on_seat = 0;
    total_piss_on_floor = 0;
    total_piss_on_tank = 0;
    total_piss_on_wall = 0;
    piss_cycle = 0;
    seat_piss_warning = 40;
    floor_piss_warning = 40;
    tank_piss_warning = 40;
    wall_piss_warning = 40;
    warning_everywhere = false;
    warning_control = false;
    warning_asshole = false;
    warning_pissingoff = false; 
    total_warnings = 0;
    previous_points = points;
    water_opacity = 0.0;//floor_opacity = 0.0;
    level_result = "none";
    big_beer_y = 305;
    toilet_broken = false;
    floor_broken = false;
    wall_broken = false;
    shit_yell = false;
    notification.reset();

    // for (var p = 0; p < max_puddles; p += 1)
    //   {
    //   puddle[p].active = false;
    //   }
    puddle = [];

    if (beer_level === 1)
      {
      piss_level_limit = 350;
      piss_wobble = 2;
      target_wobble = 5;
      wobble_target_max_velocity = 0;
      wobble_target_delay = 100;
      screen_wobble = 0;
      }
    else if (beer_level === 2)
      {
      piss_level_limit = 500;
      piss_wobble = 10;
      target_wobble = 80;
      wobble_target_max_velocity = 10;
      wobble_target_delay = 100;
      screen_wobble = 0;
      }
    else if (beer_level === 3)
      {
      piss_level_limit = 650;
      piss_wobble = 20;
      target_wobble = 120;
      wobble_target_max_velocity = 15;
      wobble_target_delay = 100;
      screen_wobble = 0;
      }
    else if (beer_level === 4)
      {
      piss_level_limit = 800;
      piss_wobble = 40;
      target_wobble = 140;
      wobble_target_max_velocity = 20;
      wobble_target_delay = 75;
      screen_wobble = 1;
      }
    else if (beer_level === 5)
      {
      piss_level_limit = 950;
      piss_wobble = 60;
      target_wobble = 160;
      wobble_target_max_velocity = 25;
      wobble_target_delay = 50;
      screen_wobble = 3;
      }
    }

  ////////////////////////////////////////////////////////////////////////////////

  wobblypiss.prototype.draw = function ()
    {
    if (game_state === "title")
      {
      title_screen.draw (canvas_2d, 0, 0);
      if (logo_frame === 1) title_animation2.draw (canvas_2d, 0, 0);
      if (logo_frame === 2) title_animation3.draw (canvas_2d, 0, 0);
      canvas_2d.fillStyle = "#FFFF00";
      canvas_2d.font = "24px impact";
      if (click_here_onoff === true) canvas_2d.fillText (title_screen_message, 90, 225);
      }
    else if (game_state === "beer")
      {
      // white background
      canvas_2d.fillStyle = "#FFFFFF";
      canvas_2d.rect (0, 0, screen_width, screen_height);
      canvas_2d.fill();
      
      // beer mugs
      if (beer_level === 1) beermug_sprite.draw (canvas_2d, 110, 130);
      else if (beer_level === 2)
        {
        beermug_sprite.draw (canvas_2d,  80, 130);
        beermug_sprite.draw (canvas_2d, 140, 130);
        }
      else if (beer_level === 3)
        {
        beermug_sprite.draw (canvas_2d,  50, 130);
        beermug_sprite.draw (canvas_2d, 110, 130);
        beermug_sprite.draw (canvas_2d, 170, 130);
        }
      else if (beer_level === 4)
        {
        beermug_sprite.draw (canvas_2d,  80,  60);
        beermug_sprite.draw (canvas_2d, 140,  60);
        beermug_sprite.draw (canvas_2d,  80, 130);
        beermug_sprite.draw (canvas_2d, 140, 130);
        }
      else if (beer_level === 5)
        {
        beermug_sprite.draw (canvas_2d,  50,  60);
        beermug_sprite.draw (canvas_2d, 110,  60);
        beermug_sprite.draw (canvas_2d, 170,  60);
        beermug_sprite.draw (canvas_2d,  80, 130);
        beermug_sprite.draw (canvas_2d, 140, 130);
        }

      big_beer_sprite.draw (canvas_2d, 107, big_beer_y);
      big_mug_sprite.draw  (canvas_2d,  65, 340);
      
      // text
      canvas_2d.fillStyle = "#000000";
      canvas_2d.font = "26px impact";
      if (click_here_onoff === true) canvas_2d.fillText ("CLICK TO START", 80, 60);
      canvas_2d.fillText("BEER " + beer_level, 120, 260);
      }
    else if (game_state === "game")
      {
      floor_sprite.draw (canvas_2d, screen_x_offset, screen_y_offset);
      if (wall_broken === true)   wall_hole_sprite.draw     (canvas_2d, screen_x_offset + 100, screen_y_offset + 30);
      if (floor_broken === true)  floor_hole_sprite.draw    (canvas_2d, screen_x_offset + 100, screen_y_offset + 280);
      if (toilet_broken === true) toilet_broken_sprite.draw (canvas_2d, screen_x_offset - 195, screen_y_offset + 120);
      else
        {
        toilet_sprite.draw (canvas_2d, screen_x_offset + 52, screen_y_offset + 29);
        canvas_2d.globalAlpha = water_opacity;
        yellow_water_sprite.draw (canvas_2d, 115 + screen_x_offset, 258 + screen_y_offset);
        }

      for (var p = 0; p < puddle.length; p += 1)
        {
        if (puddle[p].active === true)
          {
          canvas_2d.globalAlpha = puddle[p].alpha;//0.4;
          if (puddle[p].sprite === 2) puddle_2_sprite.draw (canvas_2d, puddle[p].x + screen_x_offset, puddle[p].y + screen_y_offset);
          else puddle_1_sprite.draw (canvas_2d, puddle[p].x + screen_x_offset, puddle[p].y + screen_y_offset);
          }
        }
      canvas_2d.globalAlpha = 1.0;

      if (beer_level === 5 && total_piss > piss_level_limit * 0.8)
        {
        canvas_2d.globalAlpha = red_opacity;
        red_sprite.draw (canvas_2d, 0, 0);
        canvas_2d.globalAlpha = 1.0;
        }
    
      // points
      canvas_2d.fillStyle = "#FFFFFF";
      canvas_2d.font = "26px impact";
      canvas_2d.fillText("POINTS:  " + points, 90, 35);
    
      // level
      canvas_2d.fillStyle = "#FFFF00";
      canvas_2d.font = "20px impact";
      canvas_2d.fillText ("LEVEL", 12, 21);
      canvas_2d.font = "26px impact";
      canvas_2d.fillText (beer_level, 25, 50);

      // bullseye
      //canvas_2d.fillStyle = "#FF0000";
      //canvas_2d.strokeStyle = "#FF0000";
      //canvas_2d.beginPath();
      //canvas_2d.arc (bullseye_x, bullseye_y, 10, 0, Math.PI * 2, false); 
      //canvas_2d.closePath();
      //canvas_2d.fill();

      // main target
      //canvas_2d.fillStyle = "#00FF00";
      //canvas_2d.strokeStyle = "#00FF00";
      //canvas_2d.beginPath();
      //canvas_2d.arc (main_target_x, main_target_y, 10, 0, Math.PI * 2, false); 
      //canvas_2d.closePath();
      //canvas_2d.fill();

      // wobble target
      //canvas_2d.fillStyle = "#0000FF";
      //canvas_2d.strokeStyle = "#0000FF";
      //canvas_2d.beginPath();
      //canvas_2d.arc (main_target_x + wobble_target_x_diff, main_target_y + wobble_target_y_diff, 10, 0, Math.PI * 2, false); 
      //canvas_2d.closePath();
      //canvas_2d.fill();

      // bullseye square
      //canvas_2d.strokeStyle = "#FF0000";
      //canvas_2d.rect (bullseye_x - 50, bullseye_y - 50, 100, 100);
      //canvas_2d.stroke();

      // seat square
      //canvas_2d.strokeStyle = "#FF0000";
      //canvas_2d.rect (bullseye_x - 70, bullseye_y - 70, 140, 140);
      //canvas_2d.stroke();

      // tank square
      //canvas_2d.strokeStyle = "#FF0000";
      //canvas_2d.rect (160 - 85, 135 - 85, 170, 170);
      //canvas_2d.stroke();

      for (var d = 0; d < piss_drop.length; d += 1)
        {
        piss_drop[d].draw (piss_sprite);
        }

      // notification text
      if (notification.check_active() === true) notification.draw();

      if (level_result != "none")               result_background.draw  (canvas_2d, 0, 100);
        
           if (level_result === "great job")     result_greatjob.draw    (canvas_2d, 5, 100);
      else if (level_result === "way to go")     result_waytogo.draw     (canvas_2d, 5, 100);
      else if (level_result === "uh")            result_uh.draw          (canvas_2d, 5, 100);
      else if (level_result === "hygenic")       result_hygenic.draw     (canvas_2d, 5, 100);
      else if (level_result === "no one")        result_noone.draw       (canvas_2d, 5, 100);
      else if (level_result === "problem")       result_problem.draw     (canvas_2d, 5, 100);
      else if (level_result === "what the hell") result_whatthehell.draw (canvas_2d, 5, 100);
      else if (level_result === "public pool")   result_publicpool.draw  (canvas_2d, 5, 100);
      }
    else if (game_state === "end1")
      {
      space_sprite.draw (canvas_2d, 0, 0);

      if (end_sequence === 0) earth_sprite.draw (canvas_2d, screen_x_offset + 40, screen_y_offset + 50);
      if (end_sequence >= 1)
        {
        earth_broken1_sprite.draw (canvas_2d, earth1_x, earth1_y);
        earth_broken2_sprite.draw (canvas_2d, earth2_x, earth2_y);
        earth_shard1_sprite.draw (canvas_2d, shard1_x, shard1_y);
        earth_shard2_sprite.draw (canvas_2d, shard2_x, shard2_y);
        earth_shard3_sprite.draw (canvas_2d, shard3_x, shard3_y);

        if (explosion_opacity > 0.0)
          {
          canvas_2d.globalAlpha = explosion_opacity;
          explosion_sprite[explosion_frame].draw (canvas_2d, 190, 10);
          canvas_2d.globalAlpha = 1.0;
          }
        }
      if (end_sequence === 1)
        {
        if (white_opacity > 0.0)
          {
          canvas_2d.globalAlpha = white_opacity;
          white_sprite.draw (canvas_2d, 0, 0);
          canvas_2d.globalAlpha = 1.0;
          }
        }
      if (end_sequence >= 2)
        {
        end_text1.draw_fade (20, 300);
        }
      if (end_sequence >= 3)
        {
        end_text2.draw_fade (20, 350);
        }
      }
    else if (game_state === "end2")
      {
      black_sprite.draw (canvas_2d, 0, 0);
      end_text3.draw_fade (20, 150);

      if (end_sequence >= 1) end_text4.draw_fade (20, 225);
      if (end_sequence >= 2) end_text5.draw_fade (20, 300);
      }
    if (fade_direction != "none")
      {
      canvas_2d.globalAlpha = fade_opacity;
      black_sprite.draw (canvas_2d, 0, 0);
      canvas_2d.globalAlpha = 1.0;
      }

    // mouse coordinates
    //var str = main_target_x + ", " + main_target_y;
    //if (pointer_down)  str += " down";
    //if (!pointer_down) str += " up";

    // piss sound counter
    //var str = "piss_sound_counter: " + piss_sound_counter;

    // draw text at center, max length to fit on canvas
    //canvas_2d.globalAlpha = 1.0;
    //canvas_2d.fillStyle = "#0000FF";
    //canvas_2d.font = "18pt Helvetica";
    //canvas_2d.fillText (str, 10, 440);

    // plot cursor
    //canvas_2d.fillStyle = "white";
    //canvas_2d.fillRect(main_target_x -5, main_target_y -5, 10, 10
    }

  ////////////////////////////////////////////////////////////////////////////////

  $(document).ready (function()
    {
    $("canvas").mousemove (function (event)
      {
      if (game_state === "game")
        {
        main_target_x = event.pageX - this.offsetLeft;
        main_target_y = event.pageY - this.offsetTop;
        }
      });
    });

  ////////////////////////////////////////////////////////////////////////////////

  function play_sound (sound)
    {
    var s;
    
    if (sound === "great")
      {
      s = Math.floor (Math.random() * 2);
      if (s === 0) createjs.Sound.play ("mmhmm1");
      else createjs.Sound.play ("mmhmm2");
      }
    else if (sound === "good")
      {
      s = Math.floor (Math.random() * 3);
           if (s === 0) createjs.Sound.play ("cough1");
      else if (s === 1) createjs.Sound.play ("cough2");
      else createjs.Sound.play ("hmm1");
      }
    else if (sound === "ok")
      {
      s = Math.floor (Math.random() * 2);
      if (s === 0) createjs.Sound.play ("ew1");
      else createjs.Sound.play ("ew2");
      }
    else if (sound === "bad")
      {
      s = Math.floor (Math.random() * 2);
      if (s === 0) createjs.Sound.play ("uhoh1");
      else createjs.Sound.play ("uhoh2");
      }
    else if (sound === "drop water")
      {
      if (piss_sound_counter === 0)
        {
        s = Math.floor ((Math.random() * 6) + 1);
             if (s === 1) createjs.Sound.play ("water_hit1");
        else if (s === 2) createjs.Sound.play ("water_hit2");
        else if (s === 3) createjs.Sound.play ("water_hit3");
        else if (s === 4) createjs.Sound.play ("water_hit4");
        else if (s === 5) createjs.Sound.play ("water_hit5");
        else if (s === 6) createjs.Sound.play ("water_hit6");
        }
      }
    else if (sound === "drop floor")
      {
      if (piss_sound_counter === 0)
        {
        s = Math.floor ((Math.random() * 6) + 1);
             if (s === 1) createjs.Sound.play ("floor_hit1");
        else if (s === 2) createjs.Sound.play ("floor_hit2");
        else if (s === 3) createjs.Sound.play ("floor_hit3");
        else if (s === 4) createjs.Sound.play ("floor_hit4");
        else if (s === 5) createjs.Sound.play ("floor_hit5");
        else if (s === 6) createjs.Sound.play ("floor_hit6");
        }
      }
    else if (sound === "glug")
      {
      s = Math.floor (Math.random() * 2);
      if (s === 0) createjs.Sound.play ("glug1");
      else createjs.Sound.play ("glug2");
      }
    else if (sound === "explosion")
      {
      createjs.Sound.play ("explosion");
      }
    else if (sound === "break toilet")
      {
      createjs.Sound.play ("break_toilet");
      }
    else if (sound === "break wall")
      {
      createjs.Sound.play ("break_wall");
      }
    else if (sound === "break floor")
      {
      createjs.Sound.play ("break_floor");
      }
    else if (sound === "panic")
      {
      s = Math.floor (Math.random() * 3);
           if (s === 0) createjs.Sound.play ("shit1");
      else if (s === 1) createjs.Sound.play ("shit2");
      else createjs.Sound.play ("shit3");
      }
    }

  ////////////////////////////////////////////////////////////////////////////////

  wobblypiss.prototype.splatter = function (x, y)
    {
    if (next_drop_creates_puddle === true) next_drop_creates_puddle = false;
    else next_drop_creates_puddle = true;

    //this.active = false;
    if (toilet_broken === false && this.close_enough (x, y, bullseye_x, bullseye_y, 50) === true)  // in the bowl!
      {
      points += 7;
      if (water_opacity < 1.0) water_opacity += 0.003;
      play_sound ("drop water");
      }
    else if (toilet_broken === false && this.close_enough (x, y, bullseye_x, bullseye_y, 70) === true)  // on the seat
      {
      points -= 5;
      total_piss_on_seat += 1;
      if (next_drop_creates_puddle === true) create_puddle (x, y);
      play_sound ("drop floor");
      }
    else if (y > 220)  // on the floor
      {
      points -= 6;
      total_piss_on_floor += 1;
      if (next_drop_creates_puddle === true) create_puddle (x, y);
      play_sound ("drop floor");
      }
    else if (toilet_broken === false && this.close_enough (x, y, 160 - 85, 135 - 85, 170) === true)  // on the tank
      {
      points -= 7;
      total_piss_on_tank += 1;
      if (next_drop_creates_puddle === true) create_puddle (x, y);
      play_sound ("drop floor");
      }
    else if (y <= 220 && (wall_broken === false || this.close_enough (x, y, 100 + 75, 30 + 75, 75) === false))  // on the wall
      {
      points -= 8;
      total_piss_on_wall += 1;
      if (next_drop_creates_puddle === true) create_puddle (x, y);
      play_sound ("drop floor");
      }
    else if (wall_broken === true && this.close_enough (x, y, 100 + 75, 30 + 75, 75) === true)  // through the wall hole
      {
      this.active = false;
      points -= 6;
      }
    else points -= 6;  // anywhere else

    // create delay in between water droplet sounds
    piss_sound_counter += 1;
    if (piss_sound_counter >= piss_sound_delay) piss_sound_counter = 0;
    }

  ////////////////////////////////////////////////////////////////////////////////

  // crappy distance checker, does not slow game down
  wobblypiss.prototype.close_enough = function (x1, y1, x2, y2, distance)
    {
    if (x1 > x2 - distance && x1 < x2 + distance
        && y1 > y2 - distance && y1 < y2 + distance) return true;
    else return false;
    }

  }());
