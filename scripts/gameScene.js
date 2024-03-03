// Var Globais

//Extendendo Phaser.Scene para game.Scene

class gameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' })
    }

    preload() {

        // Carregando as imagens de cada objeto do jogo

        //Background
        this.load.image('background', 'assets/cloudedSky,jpg');

        //Obstáculo


        //sprite do jogador
        this.load.image('celsinho', 'assets/celsiho.png');
        this.load.spritesheet('Dragon', 'assets/flyingDragon.png', {
            frameWidth: 70,
            frameHeight: 50,
        });

        //coletáveis
        this.load.image('apple', 'assets/apple.png');

        //inimigos
        this.load.image('fireBall', 'assets/fireBall.png')
    }

    create() {
        // Criando o background no próprio jogo
        this.background1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background')
            .setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background')
            .setOrigin(0, 0);
        // velocidade que o background anda para dar sensação de movimento
        this.scrollSpeed = 3;

        //jogador
        this.dragon = this.physics.add.sprite(250, 400, 'Dragon').setScale(1.2);
        this.player = this.physics.add.sprite(270, 610, 'celsinho').setScale(0.35);

        // Criando a animação de voo do dragão
        this.anims.create({
            key: 'fly',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('Dragon', {
                start: 0,
                end: 3,
            }),
            repeat: -1,
        });

        this.dragon.play('fly');

        this.teclado = this.input.keyboard.createCursorKeys();

        //Criando um número pre definido de maçães que aparecem com o tempo
        this.apples = [];
        for (var i = 0; i < 30; i++){
            this.createColetavel(i);
        }

        //inimigos criados em um array
        this.fireballs = [];

        // loop para criar uma quantidade determinada (10) de inimigos
        for (var i = 0; i < 10; i++){
            this.createFire(i)
        }


        // Score inicial
        this.points = 0;

    }

    update() {
        this.background1.tilePositionX += this.scrollSpeed;
        this.background2.tilePositionX += this.scrollSpeed;

        // Se o background acaba, ele retorna para a posiçaõ inicial. Duas telas ficam andando dando a sensação de nunca acabar.

        if (this.background1.tilePositionX >= game.config.width) {
            this.background1.tilePositionX = 0;
        };
        if (this.background2.tilePositionX >= game.config.width) {
            this.background2.tilePositionX = 0;
        };

        // jogador sempre sobre o dragao
        this.player.y = this.dragon.y - 30;


        // Definindo o uso do teclado para movimentar o jogador
        if (this.teclado.up.isDown) {
            this.dragon.setVelocityY(-300);
        }
        else if (this.teclado.down.isDown) {
            this.dragon.setVelocityY(300);
        }
        else {
            this.dragon.setVelocityY(0);
        }

        // Se uma maça chegar ao final do mapa ela é destruida
        for (var i = 0; i < this.apples.length;i++){
            if (this.apples[i].x < 1){
                this.apples[i].destroy();
                this.apples.splice(i, 1);
            }
        }

        // Se o jogador chegar a 10 maçães ele ganha
        if (this.points === 10){
            this.scene.stop('gameScene');
            this.scene.start('happyFinalScene')
        }

    }

    // função de criação de maçães
    createColetavel(a) {

        let apple = this.physics.add.sprite(Phaser.Math.Between(1380, 4000), Phaser.Math.Between(100, 600), 'apple')
            .setScale(0.12);
        apple.setVelocityX(-155);

        this.apples.push(apple); // add as maçães no array de maçães

        this.physics.add.overlap(apple, this.dragon, this.scoring, null, this); // criando o overlap e chamando uma função por callback
    }


    // funçao de pontuação acionada no callback do overlap entre maçães e dragão
    scoring(apple, dragon) {
        apple.destroy();
        this.points += 1;
        console.log('Points: ' + this.points); 
    }

    // funalão de criação dos obstáculos
    createFire(a) {

        let fireball = this.physics.add.sprite(Phaser.Math.Between(1380, 4000), Phaser.Math.Between(100, 600), 'fireBall')
            .setScale(0.022);
        fireball.setVelocityX(-155);

        this.fireballs.push(fireball);

        this.physics.add.overlap(fireball, this.dragon, this.death, null, this); // overlap que tem callback para acabar o jogo
    }

    // função chamada no callbcak do dragao + bola de fogo
    death(fireball, dragon) {
        console.log('Ouch!');
        this.scene.stop('gameScene');
        this.scene.start('finalScene');
    }
}