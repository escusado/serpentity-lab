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

                renderable.DisplayShape.shape.position.x = renderable.Position.x;
                renderable.DisplayShape.shape.position.y = renderable.Position.y;

            }, this);
        }
    }
});
