class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = { sprite: {} };  // Object to hold sprites

        // Constants for monster location
        this.bodyX = 300;
        this.bodyY = 350;
        this.moveSpeed = 2;
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;

        // Main body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        // Legs (feet pointing outward)
        my.sprite.leg1 = this.add.sprite(this.bodyX - 50, this.bodyY + 80, "monsterParts", "leg_blueC.png").setFlipX(true);
        my.sprite.leg2 = this.add.sprite(this.bodyX + 50, this.bodyY + 80, "monsterParts", "leg_blueC.png");

        // Arms
        my.sprite.arm1 = this.add.sprite(this.bodyX - 90, this.bodyY + 10, "monsterParts", "arm_blueB.png").setFlipX(true);
        my.sprite.arm2 = this.add.sprite(this.bodyX + 90, this.bodyY + 10, "monsterParts", "arm_blueB.png");

        // Eyes
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 40, "monsterParts", "eye_angry_blue.png");

        // Mouth (smile & fangs, initially only smile visible)
        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY + 20, "monsterParts", "mouthE.png");
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 20, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.fangs.visible = false;

        // Head Accessories (antennae)
        my.sprite.antenna1 = this.add.sprite(this.bodyX - 40, this.bodyY - 110, "monsterParts", "detail_blue_antenna_large.png").setFlipX(true);
        my.sprite.antenna2 = this.add.sprite(this.bodyX + 40, this.bodyY - 110, "monsterParts", "detail_blue_antenna_large.png");

        // Keyboard input
        this.keys = this.input.keyboard.addKeys('A,D,S,F');
    }

    update() {
        let my = this.my;
    
        // Smile or fangs toggle
        if (Phaser.Input.Keyboard.JustDown(this.keys.S)) {
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keys.F)) {
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true;
        }
    
        // Movement handling
        let moveDirection = 0;
        if (this.keys.A.isDown) {
            moveDirection = -this.moveSpeed;
        } else if (this.keys.D.isDown) {
            moveDirection = this.moveSpeed;
        }
    
        // Move every sprite in my.sprite uniformly
        if (moveDirection !== 0) {
            Object.values(my.sprite).forEach(sprite => {
                sprite.x += moveDirection;
            });
        }
    }
    
}
