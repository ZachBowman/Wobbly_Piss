// Wobbly Piss
// 2014 Nightmare Games
// Zach Bowman

////////////////////////////////////////////////////////////////////////////////

function notification_object ()
  {
  this.active = false;
  this.x = 35;
  this.y = 385;
  this.sprite = null;//text_seat;
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
    if (this.active === true)
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

////////////////////////////////////////////////////////////////////////////////

function Piss_Drop (origin_x, origin_y, main_target_x, main_target_y, piss_wobble, wobble_target_x_diff, wobble_target_y_diff)
  {
  this.active = false;
  this.x = origin_x;
  this.y = origin_y;
  this.speed = 8;
  this.x_velocity = 0;
  this.y_velocity = -this.speed;
  this.target_x = main_target_x + Math.floor ((Math.random() * ((piss_wobble * 2) + 1)) - piss_wobble) + wobble_target_x_diff;
  this.target_y = main_target_y + Math.floor ((Math.random() * ((piss_wobble * 2) + 1)) - piss_wobble) + wobble_target_y_diff;
  this.direction = null;//this.get_direction (this.x, this.y, this.target_x, this.target_y);
  this.x_velocity = this.speed * Math.cos (this.direction);
  this.y_velocity = this.speed * Math.sin (this.direction);
  //this.creates_puddle = true;

  this.activate = function (creates_puddle)
    {
    this.active = true;
    this.x = origin_x;
    this.y = origin_y;
    this.target_x = main_target_x + Math.floor ((Math.random() * ((piss_wobble * 2) + 1)) - piss_wobble) + wobble_target_x_diff;
    this.target_y = main_target_y + Math.floor ((Math.random() * ((piss_wobble * 2) + 1)) - piss_wobble) + wobble_target_y_diff;
    this.direction = this.get_direction (this.x, this.y, this.target_x, this.target_y);
    this.x_velocity = this.speed * Math.cos (this.direction);
    this.y_velocity = this.speed * Math.sin (this.direction);
    //this.creates_puddle = creates_puddle;
    }

  this.in_boundary = function ()
    {
    if (this.x >= 0 - boundary && this.x <= screen_width + boundary
        && this.y >= 0 - boundary && this.y <= screen_height + boundary) return true;
    else return false;
    }

  this.draw = function (sprite)
    {
    sprite.draw (canvas_2d, this.x - 6, this.y - 9);
    }

  this.update = function ()
    {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
    if (this.close_enough (this.x, this.y, this.target_x, this.target_y, 5) === true) this.splatter();  // hit assigned target
    else if (this.active === true && this.in_boundary === false) this.splatter();  // out of bounds
    }

  this.check_active = function ()
    {
    return this.active;
    }

  this.get_direction = function (x1, y1, x2, y2)
    {
    var dir_radians;
    var x_distance, y_distance;

    x_distance = x2 - x1;
    y_distance = y2 - y1;

    // get radians of direction
    if (x_distance > 0 && y_distance >= 0) dir_radians = Math.atan (y_distance / x_distance);
    else if (x_distance > 0 && y_distance < 0) dir_radians = Math.atan (y_distance / x_distance) + (2 * Math.PI);
    else if (x_distance < 0) dir_radians = Math.atan (y_distance / x_distance) + Math.PI;
    else if (x_distance === 0 && y_distance > 0) dir_radians = 90 * Math.PI / 180;
    else if (x_distance === 0 && y_distance < 0) dir_radians = 270 * Math.PI / 180;
    else dir_radians = 0;  // x_distance = 0, y_distance = 0

    return dir_radians;
    }

  // crappy distance checker, does not slow game down
  this.close_enough = function (x1, y1, x2, y2, distance)
    {
    if (x1 > x2 - distance && x1 < x2 + distance
        && y1 > y2 - distance && y1 < y2 + distance) return true;
    else return false;
    }

  this.splatter = function ()
    {
    this.active = false;
    game.splatter (this.x, this.y);
    }

  return this;
  }

////////////////////////////////////////////////////////////////////////////////

function Puddle ()
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
    if (Math.floor ((Math.random() * 2) + 1) === 2) this.sprite = 2;
    else this.sprite = 1;
    }

  this.check_active = function()
    {
    return this.active;
    }

  this.update = function ()
    {
    if (this.active === true) this.alpha -= 0.001;
    if (this.alpha <= 0.01) this.active = false;
    if (this.y < 220) this.y += .2;
    // if (wall_broken === true && this.close_enough (this.x, this.y, 100 + 75, 30 + 75, 75) === true) this.active = false;
    }

  return this;
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
    //canvas_2d.globalAlpha = this.opacity;
    this.sprite.draw (canvas_2d, x, y);
    //canvas_2d.globalAlpha = 1.0;
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