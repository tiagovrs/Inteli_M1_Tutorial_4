//Muda tudo para mostrar o final em que o usuário ganha

class happyEndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'happyFinalScene' })
    }

    preload () {
        this.load.image('happyFinal', 'assets/happyEnd.jpg');
    }

    create() {
        this.background1 = this.add.image(0, 0, 'happyFinal')
        .setOrigin(0, 0)
        .setScale(1.5);
    }
}