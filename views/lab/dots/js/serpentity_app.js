Module('SerpentityApp')({
    Components : {},
    Systems : {},
    Nodes : {},
    engine : null,
    game : null,

    init : function init(config) {

      this.engine = new Serpentity();
      this.entityFactory = SerpentityApp.EntityFactory;
      this.game = new Phaser.Game(
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        Phaser.AUTO,
        '',
        {
          preload : this._preload.bind(this),
          create  : this._create.bind(this),
          update  : this._update.bind(this)
        },
        false,
        false
      );

    },

    _preload : function preload() {
        this._initializeSystems();
        this._initializeEntities();
        console.log("Preloading.");
    },

    _create : function create() {
        console.log("Creating.");
        this.game.stage.backgroundColor = '#211122';
    },

    _update : function update(game) {
        this.engine.update(game.time.elapsed);
    },

    _initializeSystems : function initializeSystems() {
        this.engine.addSystem(new SerpentityApp.Systems.PhaserShapeRenderer());
        this.engine.addSystem(new SerpentityApp.Systems.TintFader());
        this.engine.addSystem(new SerpentityApp.Systems.TintedShapeRenderer());
    },

    _initializeEntities : function _initializeEntities(){

        var circle = SerpentityApp.game.add.graphics(0, 0);

        // draw a dot
        circle.lineStyle(0);
        circle.beginFill(0xFFFFFF);
        circle.drawCircle(0,0,3);

        var entity = this.entityFactory.createFadingDotEntity({
            colorScale : chroma.scale(['#FFCF40', '#FF9F40', '#FF6F40', '#A1283B' ,'#3D2040']).mode('lab'),
            fadingSpeed : 0.2,
            position : {
                x : 100,
                y : 100
            },
            shape : circle
        });

        this.engine.addEntity(entity);
    }

});