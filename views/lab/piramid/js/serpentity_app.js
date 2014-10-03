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
        this.engine.addSystem(new SerpentityApp.Systems.MouseFollowerRestricted());
    },

    _initializeEntities : function _initializeEntities(){
        var entity = this.entityFactory.createPiramidEntity({
            topFloorWidth   : 100,
            topFloorPadding : 100,
            howManyFloors   : 30,
            // colorScale      : chroma.scale(['#FFCF40', '#FF9F40', '#FF6F40', '#A1283B' ,'#3D2040']).mode('lab') //oranges over purple
            colorScale      : chroma.scale(['#E5FCC2', '#9DE0AD', '#45ADA8', '#547980']).mode('lab') //beige to teal
        });
    }

});