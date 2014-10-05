Class(SerpentityApp.Systems, "TintedShapeRenderer").inherits(Serpentity.System)({
    prototype : {
        _renderables : null,

        added : function added(engine) {
            this._renderables = engine.getNodes(SerpentityApp.Nodes.TintedShape);
        },
        removed : function removed(engine) {
            this._renderables = null;
        },
        update : function update(dt) {
            this._renderables.forEach(function (renderable) {

                renderable.DisplayShape.shape.tint = renderable.Tint.tint;

            }, this);
        }
    }
});
