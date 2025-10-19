import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Criar sprites simples usando gráficos coloridos
    this.load.image('ground', 'data:image/svg+xml;base64,' + btoa(`
      <svg width="400" height="32" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="32" fill="#8B4513"/>
      </svg>
    `));
    
    this.load.image('player', 'data:image/svg+xml;base64,' + btoa(`
      <svg width="32" height="48" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="48" fill="#3498db" rx="4"/>
      </svg>
    `));
  }

  create() {
    // Criar plataformas
    this.platforms = this.physics.add.staticGroup();
    
    // Chão principal
    this.platforms.create(400, 568, 'ground').setScale(2, 2).refreshBody();
    
    // Plataformas flutuantes
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    // Criar jogador
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Colisão entre jogador e plataformas
    this.physics.add.collider(this.player, this.platforms);

    // Controles
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Texto de instruções
    this.add.text(16, 16, 'Guardião do Conhecimento', {
      fontSize: '32px',
      color: '#000'
    });
    
    this.add.text(16, 60, 'Use as setas para mover', {
      fontSize: '16px',
      color: '#000'
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body!.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}