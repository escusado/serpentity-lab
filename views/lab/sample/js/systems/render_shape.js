Class(SerpentityApp.Systems, "PhaserShapeRenderer").inherits(Serpentity.System)({
    prototype : {
        renderables : null,
        added : function added(engine) {
            this.renderables = engine.getNodes(SerpentityApp.Nodes.ShapeRender);
        },
        removed : function removed(engine) {
            this.renderables = null;
        },
        update : function update(dt) {
            this.renderables.forEach(function (renderable) {
                // TODO: Give this guy the game instance on init...
                renderable.display_shape.shape.position.x = renderable.position.x;
                renderable.display_shape.shape.position.y = renderable.position.y;
            })
        }
    }
});
