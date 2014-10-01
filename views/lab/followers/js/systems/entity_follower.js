Class(Serpentoids.Systems, "EntityFollower").inherits(Serpentity.System)({
    prototype : {
        renderables : null,
        init : function init(config) {
            var property;

            for (property in config) {
                if (config.hasOwnProperty(property)) {
                    this[property] = config[property];
                }
            }
        },
        added : function added(engine) {
            this.renderables = engine.getNodes(Serpentoids.Nodes.EntityFollower);
        },
        removed : function removed(engine) {
            this.renderables = null;
        },
        update : function update(dt) {
            this.renderables.forEach(function (renderable) {

                var x1 = renderable.position.x,
                    y1 = renderable.position.y,

                    x2 = renderable.entity_follower.entity.getComponent(Serpentoids.Components.Position).x,
                    y2 = renderable.entity_follower.entity.getComponent(Serpentoids.Components.Position).y,

                    dx = x2 - x1,
                    dy = y2 - y1;

                renderable.position.x = renderable.position.x + (dx * renderable.entity_follower.speed);
                renderable.position.y = renderable.position.y + (dy * renderable.entity_follower.speed);

            }.bind(this));
        }
    }
});
