//Final em que o usuário perde

class endScene extends Phaser.Scene {
    constructor() {
        super({ key: 'finalScene' })
    }

    preload () {
        this.load.image('sadFinal', 'assets/finalImage.png');
    }

    create() {
        this.background1 = this.add.image(0, 0, 'sadFinal')
        .setOrigin(0, 0)
        .setScale(0.5);
    }
}