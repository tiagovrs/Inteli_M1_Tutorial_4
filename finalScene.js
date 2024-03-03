class finalScene extends Phaser.Scene {
    constructor() {
        super({ key: 'finalScene' })
    }

    preload() {
        this.load.image('finalImage', 'assets/finalImage.png');

    }

    create() {
        this.background1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'finalImage')
            .setOrigin(0, 0);
    }

    update() {
        this.background1.on('pointerdown', function () {
            this.scene.stop('finalScene');
            this.scene.start('startScene');
        })
    }
}