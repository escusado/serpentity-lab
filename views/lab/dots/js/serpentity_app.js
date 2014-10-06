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
        this.game.stage.backgroundColor = '#333333';
    },

    _update : function update(game) {
        this.engine.update(game.time.elapsed);
    },

    _initializeSystems : function initializeSystems() {
        this.engine.addSystem(new SerpentityApp.Systems.PhaserShapeRenderer());
        this.engine.addSystem(new SerpentityApp.Systems.TintFader());
        this.engine.addSystem(new SerpentityApp.Systems.TintedShapeRenderer());
        this.engine.addSystem(new SerpentityApp.Systems.MouseFollower());
        this.engine.addSystem(new SerpentityApp.Systems.ZoomLikeEffect());
    },

    _initializeEntities : function _initializeEntities(){

        this.entityFactory.createDotGrid({
            padding : 20
        });

    }

});