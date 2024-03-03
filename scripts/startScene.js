// Var Globais


//Criando a cena extendendo ela do Phaser.js

class startScene extends Phaser.Scene {
    constructor() {
        super({ key: 'startScene'})
    }

    preload() {
        this.load.image('background', "assets/cloudedSky.jpg");
        this.load.image('celsinho', "assets/celsinho.png");
        this.load.image('title', "assets/meuAmigoDragao.png");
    }

    create() {

        this.add.image(640, 360, 'background').setScale(1);
        this.add.sprite(170, 165, 'celsinho').setScale(0.6);

        this.add.image(500, 350, 'title').setScale(2.5);
        this.input.on('pointerdown', () => {
            this.scene.stop('startScene')
            this.scene.start('gameScene')
        })
    }
}