Module("Serpentoids")({
    Components : {},
    Systems : {},
    Nodes : {},
    engine : null,
    game : null,
    init : function init(config) {

      this.engine = new Serpentity();
      this.entityFactory = Serpentoids.EntityFactory;
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
        this.engine.addSystem(new Serpentoids.Systems.PhaserShapeRenderer());
        this.engine.addSystem(new Serpentoids.Systems.MouseFollower());
        this.engine.addSystem(new Serpentoids.Systems.EntityFollower());
        this.engine.addSystem(new Serpentoids.Systems.LineRenderer());
    },

    _initializeEntities : function initializeEntities() {

        var prev_entity = this.entityFactory.createDotMouseFollowerEntity(0.3),
            entity_from = prev_entity,
            entity_to;

        for(var i=1;i< 20;i++){
            prev_entity = this.entityFactory.createDotEntityFollowerEntity(0.1, prev_entity);

            entity_to = prev_entity;

            this.entityFactory.createLineEntity({
                entity_from : entity_from,
                entity_to : entity_to
            });

            entity_from = entity_to;

        }

    }
});
