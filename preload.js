function Preload(game) {
  this.preload = function () {
        game.load.image('bar', 'assets/visual/awkward_bar.png');
        game.load.image('barbell', 'assets/visual/barbell.png');
        game.load.image('container', 'assets/visual/awkward_container.png');
        game.load.image('grunt_face', 'assets/visual/grunt_face.png');
        game.load.image('hand', 'assets/visual/hand.png');
        game.load.image('lame_barbell', 'assets/visual/lame_barbell.png');
        game.load.image('lifter_arm', 'assets/visual/lifter_arm.png');
        game.load.image('lifter_body', 'assets/visual/lifter_body.png');
        game.load.image('locker', 'assets/visual/locker.png');
        game.load.image('sweat', 'assets/visual/sweat.png');
        game.load.image('bee', 'assets/visual/bee.png');
        game.load.image('bump', 'assets/visual/bump.png');  
        game.load.image('flowers', 'assets/visual/flowers.png');  
        game.load.image('clyde_logo', 'assets/visual/clyde_logo.png');
        game.load.spritesheet('girl_face', 'assets/visual/girl_face.png', 28, 22);
        game.load.spritesheet('boy_face', 'assets/visual/boy_face.png', 28, 22);
        game.load.image('track', 'assets/visual/track.png');
        game.load.spritesheet('boy', 'assets/visual/boy.png', 50, 80);
        game.load.spritesheet('fast_runner', 'assets/visual/fast_runner.png', 50, 80);
        game.load.spritesheet('girl', 'assets/visual/girl.png', 50, 80);
        game.load.spritesheet('push_button', 'assets/visual/push_button.png', 100, 50);
        game.load.spritesheet('main_menu_background', 'assets/visual/main_menu_background.png', 200, 200);
      
        game.load.audio('grunt', 'assets/audio/grunt.wav');
        game.load.audio('buzz', 'assets/audio/buzz.wav');
        game.load.audio('ow', 'assets/audio/ow.wav');
  };
  this.create = function() {
    game.state.start("menu");
  };
}