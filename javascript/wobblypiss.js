// Wobbly Piss
// 2014 Nightmare Games
// Zach Bowman

var canvas;
var canvas_html;
var preload;

var screen_width = 320;
var screen_height = 480;
var boundary = 50;
var fps = 30;

var click_to_start_sound = false;
var piss_start = false;
var pointer_down = false;
var beer_level = 0;
var points = 0;
var previous_points = 0;
var game_state = "title";
//var game_state = "end1";
var delay_counter = 0;
var level_end_delay = 75;
var level_result_delay = 50;
var level_result = "none";
var fade_opacity = 1.0;
var fade_direction = "none";
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

var logo_counter = 0;
var logo_delay = 3;
var logo_frame = 0;
var click_here_counter = 0;
var click_here_delay = 20;
var click_here_onoff = true;

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

var title_screen         = Sprite ("title3");
var title_animation2     = Sprite ("title_animation2");
var title_animation3     = Sprite ("title_animation3");
var beermug_sprite       = Sprite ("beermug2");
var bathroom_sprite      = Sprite ("toilet4");
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

////////////////////////////////////////////////////////////////////////////////

function notification_object ()
  { 
  this.active = false;
  this.x = 35;
  this.y = 385;
  this.sprite = text_seat;
  this.delay = 100;
  this.counter = 0;

  this.reset = function ()
    {
    this.active = false;
    }
    
  this.show = function (new_sprite)
    {
    this.active = true;
    this.sprite = new_sprite;
    this.counter = 0;
    }

  this.update = function ()
    {
    if (this.active == true)
      {
      this.counter += 1;
      if (this.counter >= this.delay) this.active = false;
      }
    }

  this.check_active = function ()
    {
    return this.active;
    }

  this.draw = function ()
    {
    this.sprite.draw (canvas_2d, this.x, this.y);
    }
  }

notification = new notification_object();

////////////////////////////////////////////////////////////////////////////////

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

function piss_object ()
  {
  this.active = false;
  this.x = origin_x;
  this.y = origin_y;
  this.speed = 8;
  this.x_velocity = 0;
  this.y_velocity = -this.speed;
  this.target_x = main_target_x + Math.floor ((Math.random() * ((piss_wobble * 2) + 1)) - piss_wobble) + wobble_target_x_diff;
  this.target_y = main_target_y + Math.floor ((Math.random() * ((piss_wobble * 2) + 1)) - piss_wobble) + wobble_target_y_diff;
  this.direction = get_direction (this.x, this.y, this.target_x, this.target_y);
  this.x_velocity = this.speed * Math.cos (this.direction);
  this.y_velocity = this.speed * Math.sin (this.direction);

  this.activate = function ()
    {
    this.active = true;
    this.x = origin_x;
    this.y = origin_y;
    this.target_x = main_target_x + Math.floor ((Math.random() * ((piss_wobble * 2) + 1)) - piss_wobble) + wobble_target_x_diff;
    this.target_y = main_target_y + Math.floor ((Math.random() * ((piss_wobble * 2) + 1)) - piss_wobble) + wobble_target_y_diff;
    this.direction = get_direction (this.x, this.y, this.target_x, this.target_y);
    this.x_velocity = this.speed * Math.cos (this.direction);
    this.y_velocity = this.speed * Math.sin (this.direction);
    }

  this.in_boundary = function ()
    {
    if (this.x >= 0 - boundary && this.x <= screen_width + boundary
        && this.y >= 0 - boundary && this.y <= screen_height + boundary) return true;
    else return false;
    }

  this.draw = function ()
    {
    piss_sprite.draw (canvas_2d, this.x - 6, this.y - 9);
    }

  this.update = function ()
    {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
    if (close_enough (this.x, this.y, this.target_x, this.target_y, 5) == true) this.splatter();   // hit assigned target
    else if (this.active == true && this.in_boundary == false) this.splatter();              // out of bounds
    }

  this.splatter = function ()
    {
    //var sound = 0;

    // create delay in between water droplet sounds
    if (piss_sound_counter >= piss_sound_delay) piss_sound_counter = 0;

    this.active = false;
    if (toilet_broken == false && close_enough (this.x, this.y, bullseye_x, bullseye_y, 50) == true)  // in the bowl!
      {
      points += 7;
      if (water_opacity < 1.0) water_opacity += 0.003;

      if (piss_sound_counter == 0) play_sound ("drop water");
      }
    else if (toilet_broken == false && close_enough (this.x, this.y, bullseye_x, bullseye_y, 70) == true)  // on the seat
      {
      points -= 5;
      total_piss_on_seat += 1;
      create_puddle (this.x, this.y);
      drop_floor_sound (sound);
      }
    else if (this.y > 220)                                                            // on the floor
      {
      points -= 6;
      total_piss_on_floor += 1;
      create_puddle (this.x, this.y);
      if (piss_sound_counter == 0) play_sound ("drop floor");
      }
    else if (toilet_broken == false && close_enough (this.x, this.y, 160 - 85, 135 - 85, 170) == true)  // on the tank
      {
      points -= 7;
      total_piss_on_tank += 1;
      create_puddle (this.x, this.y);
      if (piss_sound_counter == 0) play_sound ("drop floor");
      }
    else if (this.y <= 220 && (wall_broken == false || close_enough (this.x, this.y, 100 + 75, 30 + 75, 75) == false))  // on the wall
      {
      points -= 8;
      total_piss_on_wall += 1;
      create_puddle (this.x, this.y);
      if (piss_sound_counter == 0) play_sound ("drop floor");
      }
    else points -= 6;                                                              // anywhere else

    piss_sound_counter += 1;
    }

  this.check_active = function ()
    {
    return this.active;
    }

  return this;
  }

var max_drops = 50;
//var total_drops_in_array = 50;//0;
var piss_delay = 2;
var piss_delay_counter = 0;
var piss_cycle = 0;
var piss_drop = new Array();

////////////////////////////////////////////////////////////////////////////////

// function drop_floor_sound (sound)
  // {
       // if (sound == 1) createjs.Sound.play ("sound_floor_hit1");
  // else if (sound == 2) createjs.Sound.play ("sound_floor_hit2");
  // else if (sound == 3) createjs.Sound.play ("sound_floor_hit3");
  // else if (sound == 4) createjs.Sound.play ("sound_floor_hit4");
  // else if (sound == 5) createjs.Sound.play ("sound_floor_hit5");
  // else if (sound == 6) createjs.Sound.play ("sound_floor_hit6");
  // }

////////////////////////////////////////////////////////////////////////////////

function create_droplet ()
  {
  piss_drop[piss_cycle].activate();
  total_piss += 1;
  piss_cycle += 1;
  if (piss_cycle >= max_drops) piss_cycle = 0;
  }

////////////////////////////////////////////////////////////////////////////////

function puddle_object ()
  {
  this.active = false;
  this.x = 0;
  this.y = 0;
  this.alpha = 0.4;
  this.sprite = 1;

  this.activate = function (x, y)
    {
    this.active = true;
    this.x = x - 5;
    this.y = y - 5;
    this.alpha = 0.4;
    if (Math.floor ((Math.random() * 2) + 1) == 2) this.sprite = 2;
    else this.sprite = 1;
    }

  this.check_active = function()
    {
    return this.active;
    }

  this.update = function ()
    {
    if (this.active == true) this.alpha -= 0.001;
    if (this.alpha <= 0.0) this.active = false;
    if (this.y < 220) this.y += .2;
    //if (wall_broken == true && close_enough (p.x, p.y, 100 + 75, 30 + 75, 75) == true) this.active = false;
    if (wall_broken == true && close_enough (this.x, this.y, 100 + 75, 30 + 75, 75) == true) this.active = false;
    }

  this.draw = function()
    {
    canvas_2d.globalAlpha = this.alpha;
    if (this.sprite == 2) puddle_2_sprite.draw (canvas_2d, this.x + screen_x_offset, this.y + screen_y_offset);
    else puddle_1_sprite.draw (canvas_2d, this.x + screen_x_offset, this.y + screen_y_offset);
    }

  return this;
  }

var max_puddles = 75;
var total_puddles = 0;
var total_puddles_in_array = 0;
var puddle_cycle = 0;
var puddle = new Array();

////////////////////////////////////////////////////////////////////////////////

function create_puddle (x, y)
  {
  puddle[puddle_cycle].activate (x, y);
  puddle_cycle += 1;
  if (puddle_cycle >= max_puddles) puddle_cycle = 0;
  }

////////////////////////////////////////////////////////////////////////////////

function sprite_fade_object (sprite_file)
  {
  this.x = 0;
  this.y = 0;
  this.sprite = Sprite (sprite_file);
  this.opacity = 0.0;
  //this.active = false;

  this.draw_fade = function (x, y)
    {
    if (this.opacity < 1.0) this.opacity += .01;
    canvas_2d.globalAlpha = this.opacity;
    this.sprite.draw (canvas_2d, x, y);
    canvas_2d.globalAlpha = 1.0;
    }

  this.draw = function (x, y)
    {
    this.sprite.draw (canvas_2d, x, y);
    }

  this.reset = function ()
    {
    this.opacity = 0.0;
    }
  }

var end_text1 = new sprite_fade_object ("end_text1");
var end_text2 = new sprite_fade_object ("end_text2");
var end_text3 = new sprite_fade_object ("end_text3");
var end_text4 = new sprite_fade_object ("end_text4");
var end_text5 = new sprite_fade_object ("end_text5");

////////////////////////////////////////////////////////////////////////////////

setInterval (function()
  {
  update();
  draw();
  }, 1000/fps);

////////////////////////////////////////////////////////////////////////////////

function init()
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

  if (!createjs.Sound.initializeDefaultPlugins())
    {
    document.getElementById ("canvas_div").style.display = "none";
    return;
    }

  var manifest = [
                  {id:"sound_break_floor",  src:"sounds/break_floor.mp3"},
                  {id:"sound_break_toilet", src:"sounds/break_toilet.mp3"},
                  {id:"sound_break_wall",   src:"sounds/break_wall.mp3"},
                  {id:"sound_cough1",       src:"sounds/cough1.mp3"},
                  {id:"sound_cough2",       src:"sounds/cough2.mp3"},
                  {id:"sound_ew1",          src:"sounds/ew1.mp3"},
                  {id:"sound_ew2",          src:"sounds/ew2.mp3"},
                  {id:"sound_explosion",    src:"sounds/explosion.mp3"},
                  {id:"sound_floor_hit1",   src:"sounds/floor_hit1.mp3"},
                  {id:"sound_floor_hit2",   src:"sounds/floor_hit2.mp3"},
                  {id:"sound_floor_hit3",   src:"sounds/floor_hit3.mp3"},
                  {id:"sound_floor_hit4",   src:"sounds/floor_hit4.mp3"},
                  {id:"sound_floor_hit5",   src:"sounds/floor_hit5.mp3"},
                  {id:"sound_floor_hit6",   src:"sounds/floor_hit6.mp3"},
                  {id:"sound_glug1",        src:"sounds/glug2.mp3"},
                  {id:"sound_glug2",        src:"sounds/glug2.mp3"},
                  {id:"sound_hmm1",         src:"sounds/hmm1.mp3"},
                  {id:"sound_mmhmm1",       src:"sounds/mmhmm1.mp3"},
                  {id:"sound_mmhmm2",       src:"sounds/mmhmm2.mp3"},
                  {id:"sound_shit1",        src:"sounds/shit1.mp3"},
                  {id:"sound_shit2",        src:"sounds/shit2.mp3"},
                  {id:"sound_shit3",        src:"sounds/shit3.mp3"},
                  {id:"sound_uhoh1",        src:"sounds/uhoh1.mp3"},
                  {id:"sound_uhoh2",        src:"sounds/uhoh2.mp3"},
                  {id:"sound_water_hit1",   src:"sounds/water_hit1.mp3"},
                  {id:"sound_water_hit2",   src:"sounds/water_hit2.mp3"},
                  {id:"sound_water_hit3",   src:"sounds/water_hit3.mp3"},
                  {id:"sound_water_hit4",   src:"sounds/water_hit4.mp3"},
                  {id:"sound_water_hit5",   src:"sounds/water_hit5.mp3"},
                  {id:"sound_water_hit6",   src:"sounds/water_hit6.mp3"},
                  {id:"sound_woo1",         src:"sounds/woo1.mp3"},
                  {id:"sound_yeah1",        src:"sounds/yeah1.mp3"},
                  {id:"sound_yeah2",        src:"sounds/yeah2.mp3"},
                  {id:"sound_yup1",         src:"sounds/yup1.mp3"},
                  {id:"sound_zip3",         src:"sounds/zip3.mp3"},
                  {id:"sound_zip4",         src:"sounds/zip4.mp3"}];

  preload = new createjs.LoadQueue();
  preload.installPlugin(createjs.Sound);
	preload.addEventListener("complete", doneLoading); // add an event listener for when load is completed
  preload.loadManifest (manifest);

  for (var d = 0; d < max_drops; d += 1)
    {
    piss_drop[d] = new piss_object();
    }

  for (var p = 0; p < max_puddles; p += 1)
    {
    puddle[p] = new puddle_object();
    }

  if (game_state == "title") fade_direction = "in";
  else if (game_state == "game") beer_level = 1;
  else if (game_state == "end1") screen_wobble = 1;

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

function doneLoading(event)
  {
	canvas_html.onclick = handleClick;
  }

////////////////////////////////////////////////////////////////////////////////

function handleClick()
  {
	canvas_html.onclick = null;
	sound_play ("great");
	//createjs.Sound.play ("sound_mmhmm1");
	}

////////////////////////////////////////////////////////////////////////////////

function mouse_down (finger)
  {
  if (game_state == "title")
    {
    fade_direction = "out";
    }
  else if (game_state == "beer")
    {
    game_state = "game";
    if (piss_start == false) piss_start = true;
    }
  pointer_down = true;
  mouse_move (finger);
  }

//////////////////////////////////////////////////////////////////////////////// 

function mouse_move (finger, e)
  {
  if (!e) var e = event;
  //if (finger == true) e.preventDefault();

  main_target_x = e.pageX - canvas_html.offsetLeft;
  main_target_y = e.pageY - canvas_html.offsetTop;
  }

//////////////////////////////////////////////////////////////////////////////// 

function mouse_up (finger)
  {
  pointer_down = false;
  if (finger == false) mouse_move (false);
  }
 
////////////////////////////////////////////////////////////////////////////////

function update ()
  {
  var r;  // random number
  var s;  // random sound
  
  if (game_state == "game")
    {
    // cheat
    if (keydown.right && key_right == false)
      {
      key_right = true;
      //next_level();
      }
    else if (keydown.right == false && key_right == true) key_right = false;

    // create droplet stream
    if (piss_start == true && total_piss < piss_level_limit)
      {
      piss_delay_counter += 1;
      if (piss_delay_counter >= piss_delay)
        {
        piss_delay_counter = 0;
        create_droplet();
        }
      }

    // update droplets
    for (var d = 0; d < max_drops; d += 1)
      {
      if (piss_drop[d].check_active()) piss_drop[d].update();
      }

    // update puddles
    if (total_piss < piss_level_limit)
      {
      for (var p = 0; p < max_puddles; p += 1)
        {
        if (puddle[p].check_active() == true) puddle[p].update();
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
    if (beer_level == 5 && total_piss > piss_level_limit * 0.8)
      {
      if (red_increase == false)
        {
        red_opacity -= .02;
        if (red_opacity <= 0.0)
          {
          red_opacity = 0.0;
          red_increase = true;
          }
        }
      else if (red_increase == true)
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
    if (toilet_broken == false && beer_level == 4 && seat_piss_warning + tank_piss_warning > 90)  // toilet break
      {
      toilet_broken = true;
      notification.show (text_broketoilet);
      //createjs.Sound.play ("sound_break_toilet");
      play_sound ("break toilet");
      }
    if (toilet_broken == false && beer_level == 5 && seat_piss_warning + tank_piss_warning > 80)  // toilet break
      {
      toilet_broken = true;
      notification.show (text_broketoilet);
      //createjs.Sound.play ("sound_break_toilet");
      play_sound ("break toilet");
      }
    if (toilet_broken == true && wall_broken == false && beer_level == 5 && wall_piss_warning > 40)  // wall break
      {
      wall_broken = true;
      notification.show (text_brokewall);
      //createjs.Sound.play ("sound_break_wall");
      play_sound ("break wall");
      }
    if (toilet_broken == true && floor_broken == false && beer_level == 5 && floor_piss_warning > 55)  // floor break
      {
      floor_broken = true;
      notification.show (text_brokefloor);
      //createjs.Sound.play ("sound_break_floor");
      play_sound ("break floor");
      }

    update_notification();

    if (beer_level == 5 && total_piss > piss_level_limit * 0.97 && shit_yell === false)
      {
      shit_yell = true;

      play_sound ("panic");
      // s = Math.floor (Math.random() * 3);
           // if (s == 0) createjs.Sound.play ("sound_shit1");
      // else if (s == 0) createjs.Sound.play ("sound_shit2");
      // else createjs.Sound.play ("sound_shit3");
      }

    // check for end of level
    if (total_piss >= piss_level_limit)
      {
      delay_counter += 1;

      if (beer_level == 5)
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

      else if (delay_counter >= level_result_delay && level_result == "none")
        {
        notification.reset();
        delay_counter = 0;
        r = Math.floor (Math.random() * 2);

        if (points > previous_points + 1800)
          {
          if (r == 0) level_result = "great job";
          else level_result = "way to go";

          play_sound ("great");
          // s = Math.floor (Math.random() * 2);
          // if (s == 0) createjs.Sound.play ("sound_mmhmm1");
          // else createjs.Sound.play ("sound_mmhmm2");
          }
        else if (points > previous_points + 500)
          {
          if (r == 0) level_result = "uh";
          else level_result = "hygenic";
          
          play_sound ("good");
          // s = Math.floor (Math.random() * 3);
          // if (s == 0) createjs.Sound.play ("sound_cough1");
          // else if (s == 1) createjs.Sound.play ("sound_cough2");
          // else createjs.Sound.play ("sound_hmm1");
          }
        else if (points > previous_points - 500)
          {
          if (r == 0) level_result = "no one";
          else level_result = "problem";

          play_sound ("ok");
          // s = Math.floor (Math.random() * 2);
          // if (s == 0) createjs.Sound.play ("sound_ew1");
          // else createjs.Sound.play ("sound_ew2");
          }
        else
          {
          if (r == 0) level_result = "what the hell";
          else level_result = "public pool";

          play_sound ("bad");
          // s = Math.floor (Math.random() * 2);
          // if (s == 0) createjs.Sound.play ("sound_uhoh1");
          // else createjs.Sound.play ("sound_uhoh2");
          }
        }
      if (delay_counter >= level_end_delay && level_result != "none")
        {
        fade_direction = "out";
        }
      }
    }
    
  else if (game_state == "beer")
    {
    if (big_beer_y < 430) big_beer_y += 1.6;

    click_here_counter += 1;
    if (click_here_counter >= click_here_delay)
      {
      click_here_counter = 0;
      if (click_here_onoff == true) click_here_onoff = false;
      else click_here_onoff = true;
      }
    }

  else if (game_state == "title")
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
      if (click_here_onoff == true) click_here_onoff = false;
      else click_here_onoff = true;
      }
    }

  else if (game_state == "end1")
    {
    if (end_sequence <= end_max1)
      {
      end_counter += 1
      if (end_counter > end_delay1[end_sequence])
        {
        end_counter = 0;
        end_sequence += 1;
        //if (end_sequence == 1) createjs.Sound.play ("sound_explosion");
        if (end_sequence == 1) play_sound ("explosion");
        }
      }

    if (end_sequence == 0)
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
    if (end_sequence == 4)  // fade out
      {
      fade_direction = "out";
      fade_opacity = 0.0;
      }
    }

  else if (game_state == "end2")
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

    if (end_sequence == 3) fade_direction = "out";
    }

  // update_fade
  if (fade_direction != "none")
    {
    if (fade_direction == "in")
      {
      fade_opacity -= 0.02;
      if (fade_opacity <= 0)
        {
        fade_direction = "none";
        }
      }
    else if (fade_direction == "out")
      {
      fade_opacity += 0.02;
      if (fade_opacity >= 1.0)
        {
        fade_direction = "in";
        if (game_state == "game" && beer_level == 5)
          {
          beer_level = 0;
          game_state = "title";
          points = 0;
          previous_points = 0;
          }
        else if (game_state == "title" || game_state == "game")
          {
          next_level();
          game_state = "beer";
          //createjs.Sound.play ("sound_glug2");
          play_sound ("glug");
          }
        else if (game_state == "end1")
          {
          game_state = "end2";
          end_counter = 0;
          end_sequence = 0;
          }
        else if (game_state == "end2")
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
  if (notification.check_active() == true) notification.update();
  if (total_piss_on_wall >= wall_piss_warning)// && wall_broken == false)
    {
    total_piss_on_wall = 0;
    if (warning_chooser() == false)
      {
      wall_piss_warning += 5;
      notification.show (text_wall);
      total_warnings += 1;
      }
    }
  if (toilet_broken == false && total_piss_on_tank >= tank_piss_warning)
    {
    total_piss_on_tank = 0;
    if (warning_chooser() == false)
      {
      tank_piss_warning += 5;
      notification.show (text_tank);
      total_warnings += 1;
      }
    }
  if (total_piss_on_floor >= floor_piss_warning)// && floor_broken == false)
    {
    total_piss_on_floor = 0;
    if (warning_chooser() == false)
      {
      floor_piss_warning += 5;
      notification.show (text_floor);
      total_warnings += 1;
      }
    }
  if (toilet_broken == false && total_piss_on_seat >= seat_piss_warning)
    {
    total_piss_on_seat = 0;
    if (warning_chooser() == false)
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
  if (screen_wobble > 0 && (total_piss < piss_level_limit || game_state == "end1"))
    {
    screen_x_offset = Math.floor ((Math.random() * screen_wobble) + 1 - (screen_wobble / 2));
    screen_y_offset = Math.floor ((Math.random() * screen_wobble) + 1 - (screen_wobble / 2));
    }
  }

////////////////////////////////////////////////////////////////////////////////

function warning_chooser ()
  {
  var choice = false;
  
  if (beer_level == 5 && total_piss > piss_level_limit * 0.8)
    {
    notification.show (text_pisscritical);
    total_warnings += 1;
    choice = true;
    }
  else if (warning_pissplanet == false && beer_level == 5 && wall_broken == true && floor_broken == true && total_warnings > 6)
    {
    notification.show (text_pissplanet);
    warning_pissplanet = true;
    total_warnings += 1;
    choice = true;
    }
  else if (warning_pissingoff == false && beer_level >= 4 && total_warnings > 5)
    {
    notification.show (text_pissingoff);
    warning_pissingoff = true;
    total_warnings += 1;
    choice = true;
    }
  else if (warning_asshole == false && beer_level >= 3 && total_warnings > 4)
    {
    notification.show (text_asshole);
    warning_asshole = true;
    total_warnings += 1;
    choice = true;
    }
  else if (warning_control == false && beer_level >= 3 && total_warnings > 3)
    {
    notification.show (text_outofcontrol);
    warning_control = true;
    total_warnings += 1;
    choice = true;
    }
  else if (warning_everywhere == false && total_warnings > 2)
    {
    notification.show (text_everywhere);
    warning_everywhere = true;
    total_warnings += 1;
    choice = true;
    }
  return choice;
  }

////////////////////////////////////////////////////////////////////////////////

// crappy distance checker, does not slow game down
function close_enough (x1, y1, x2, y2, distance)
  {
  if (x1 > x2 - distance && x1 < x2 + distance
      && y1 > y2 - distance && y1 < y2 + distance) return true;
  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

// SLOWS DOWN GAME LIKE HELL!
function get_distance (x1, y1, x2, y2)
  {
  var h, x, y;

  x = x2 - x1;
  y = y2 - y1;
  h = Math.sqrt ((x * x) + (y * y));

  if (h < 0) h = h * -1;  // absolute value

  return h;
  }

////////////////////////////////////////////////////////////////////////////////

function get_direction (x1, y1, x2, y2)
  {
  var dir_radians;
  var x_distance, y_distance;

  x_distance = x2 - x1;
  y_distance = y2 - y1;

  // get radians of direction
  if (x_distance > 0 && y_distance >= 0) dir_radians = Math.atan (y_distance / x_distance);
  else if (x_distance > 0 && y_distance < 0) dir_radians = Math.atan (y_distance / x_distance) + (2 * Math.PI);
  else if (x_distance < 0) dir_radians = Math.atan (y_distance / x_distance) + Math.PI;
  else if (x_distance == 0 && y_distance > 0) dir_radians = 90 * Math.PI / 180;
  else if (x_distance == 0 && y_distance < 0) dir_radians = 270 * Math.PI / 180;
  else dir_radians = 0;  // x_distance = 0, y_distance = 0

  return dir_radians;
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

  for (var p = 0; p < max_puddles; p += 1)
    {
    puddle[p].active = false;
    }

  if (beer_level == 1)
    {
    piss_level_limit = 350;
    piss_wobble = 2;
    target_wobble = 5;
    wobble_target_max_velocity = 0;
    wobble_target_delay = 100;
    screen_wobble = 0;
    }
  else if (beer_level == 2)
    {
    piss_level_limit = 500;
    piss_wobble = 10;
    target_wobble = 80;
    wobble_target_max_velocity = 10;
    wobble_target_delay = 100;
    screen_wobble = 0;
    }
  else if (beer_level == 3)
    {
    piss_level_limit = 650;
    piss_wobble = 20;
    target_wobble = 120;
    wobble_target_max_velocity = 15;
    wobble_target_delay = 100;
    screen_wobble = 0;
    }
  else if (beer_level == 4)
    {
    piss_level_limit = 800;
    piss_wobble = 40;
    target_wobble = 140;
    wobble_target_max_velocity = 20;
    wobble_target_delay = 75;
    screen_wobble = 1;
    }
  else if (beer_level == 5)
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

function draw ()
  {
  if (game_state == "title")
    {
    title_screen.draw (canvas_2d, 0, 0);
    if (logo_frame == 1) title_animation2.draw (canvas_2d, 0, 0);
    if (logo_frame == 2) title_animation3.draw (canvas_2d, 0, 0);
    canvas_2d.fillStyle = "#FFFF00";
    canvas_2d.font = "24px impact";
    if (click_here_onoff == true) canvas_2d.fillText ("CLICK TO PLAY", 90, 225);
    }
  else if (game_state == "beer")
    {
    // white background
    canvas_2d.fillStyle = "#FFFFFF";
    canvas_2d.rect (0, 0, screen_width, screen_height);
    canvas_2d.fill();
    
    // beer mugs
    if (beer_level == 1) beermug_sprite.draw (canvas_2d, 110, 130);
    else if (beer_level == 2)
      {
      beermug_sprite.draw (canvas_2d,  80, 130);
      beermug_sprite.draw (canvas_2d, 140, 130);
      }
    else if (beer_level == 3)
      {
      beermug_sprite.draw (canvas_2d,  50, 130);
      beermug_sprite.draw (canvas_2d, 110, 130);
      beermug_sprite.draw (canvas_2d, 170, 130);
      }
    else if (beer_level == 4)
      {
      beermug_sprite.draw (canvas_2d,  80,  60);
      beermug_sprite.draw (canvas_2d, 140,  60);
      beermug_sprite.draw (canvas_2d,  80, 130);
      beermug_sprite.draw (canvas_2d, 140, 130);
      }
    else if (beer_level == 5)
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
    if (click_here_onoff == true) canvas_2d.fillText ("CLICK TO START", 80, 60);
    canvas_2d.fillText("BEER " + beer_level, 120, 260);
    }
  else if (game_state == "game")
    {
    floor_sprite.draw (canvas_2d, screen_x_offset, screen_y_offset);
    if (wall_broken == true)   wall_hole_sprite.draw     (canvas_2d, screen_x_offset + 100, screen_y_offset + 30);
    if (floor_broken == true)  floor_hole_sprite.draw    (canvas_2d, screen_x_offset + 100, screen_y_offset + 280);
    if (toilet_broken == true) toilet_broken_sprite.draw (canvas_2d, screen_x_offset - 195, screen_y_offset + 120);
    else
      {
      toilet_sprite.draw (canvas_2d, screen_x_offset + 52, screen_y_offset + 29);
      canvas_2d.globalAlpha = water_opacity;
      yellow_water_sprite.draw (canvas_2d, 115 + screen_x_offset, 258 + screen_y_offset);
      }

    canvas_2d.globalAlpha = 0.4;
    for (var p = 0; p < max_puddles; p += 1)
      {
      if (puddle[p].check_active()) puddle[p].draw();
      }
    canvas_2d.globalAlpha = 1.0;

    if (beer_level == 5 && total_piss > piss_level_limit * 0.8)
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

    for (var d = 0; d < max_drops; d += 1)
      {
      if (piss_drop[d].check_active()) piss_drop[d].draw();
      }

    // notification text
    if (notification.check_active() == true) notification.draw();

    if (level_result != "none")               result_background.draw  (canvas_2d, 0, 100);
      
         if (level_result == "great job")     result_greatjob.draw    (canvas_2d, 5, 100);
    else if (level_result == "way to go")     result_waytogo.draw     (canvas_2d, 5, 100);
    else if (level_result == "uh")            result_uh.draw          (canvas_2d, 5, 100);
    else if (level_result == "hygenic")       result_hygenic.draw     (canvas_2d, 5, 100);
    else if (level_result == "no one")        result_noone.draw       (canvas_2d, 5, 100);
    else if (level_result == "problem")       result_problem.draw     (canvas_2d, 5, 100);
    else if (level_result == "what the hell") result_whatthehell.draw (canvas_2d, 5, 100);
    else if (level_result == "public pool")   result_publicpool.draw  (canvas_2d, 5, 100);
    }
  else if (game_state == "end1")
    {
    space_sprite.draw (canvas_2d, 0, 0);

    if (end_sequence == 0) earth_sprite.draw (canvas_2d, screen_x_offset + 40, screen_y_offset + 50);
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
    if (end_sequence == 1)
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
  else if (game_state == "end2")
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
    if (game_state == "game")
      {
      main_target_x = event.pageX - this.offsetLeft;
      main_target_y = event.pageY - this.offsetTop;
      }
    });
  });

////////////////////////////////////////////////////////////////////////////////
