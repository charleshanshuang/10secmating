function Preload(game) {
  this.preload = function () {
   game.load.image('bar', 'assets/visual/awkward_bar.png');
        game.load.image('locker', 'assets/visual/locker.png');
        game.load.spritesheet('boy', 'assets/visual/boy.png', 50, 80, 3);
        game.load.spritesheet('girl', 'assets/visual/girl.png', 50, 80, 3);
  };
  this.create = function() {
    game.state.start("main");
  };
}