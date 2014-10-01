Class(Serpentoids.Systems, "MouseFollower").inherits(Serpentity.System)({
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
            this.renderables = engine.getNodes(Serpentoids.Nodes.MouseFollower);
        },
        removed : function removed(engine) {
            this.renderables = null;
        },
        update : function update(dt) {
            this.renderables.forEach(function (renderable) {

                // renderable.position.x = renderable.follow_mouse.input.x + Phaser.Easing.Elastic.In(renderable.follow_mouse.speed);
                // renderable.position.y = renderable.follow_mouse.input.y + Phaser.Easing.Elastic.In(renderable.follow_mouse.speed);

                // renderable.position.x = renderable.follow_mouse.input.x - (renderable.follow_mouse.input.x*renderable.follow_mouse.speed);

                var x1 = renderable.position.x,
                    y1 = renderable.position.y,

                    x2 = renderable.mouse_follower.input.x,
                    y2 = renderable.mouse_follower.input.y,

                    dx = x2 - x1,
                    dy = y2 - y1;

                renderable.position.x = renderable.position.x + (dx * renderable.mouse_follower.speed);
                renderable.position.y = renderable.position.y + (dy * renderable.mouse_follower.speed);

            }.bind(this));
        }
    }
});
