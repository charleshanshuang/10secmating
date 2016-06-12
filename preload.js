function Preload(game) {
  this.preload = function () {
        game.load.image('bar', 'assets/visual/awkward_bar.png');
        game.load.image('container', 'assets/visual/awkward_container.png');
        game.load.image('locker', 'assets/visual/locker.png');
        game.load.image('sweat', 'assets/visual/sweat.png');
        game.load.spritesheet('boy', 'assets/visual/boy.png', 50, 80);
        game.load.spritesheet('girl', 'assets/visual/girl.png', 50, 80);
        game.load.spritesheet('bee', 'assets/visual/bee.png');
  };
  this.create = function() {
    game.state.start("main");
  };
}