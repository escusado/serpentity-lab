Class(SerpentityApp.Systems, "MouseFollower").inherits(Serpentity.System)({
    prototype : {
        _followers : null,
        init : function init(config) {
            var property;

            for (property in config) {
                if (config.hasOwnProperty(property)) {
                    this[property] = config[property];
                }
            }
        },
        added : function added(engine) {
            this._followers = engine.getNodes(SerpentityApp.Nodes.MouseFollower);
        },
        removed : function removed(engine) {
            this._followers = null;
        },
        update : function update(dt) {
            this._followers.forEach(function (follower) {

                var x1 = follower.Position.x,
                    y1 = follower.Position.y,

                    x2 = follower.MouseFollower.input.x,
                    y2 = follower.MouseFollower.input.y,

                    dx = x2 - x1,
                    dy = y2 - y1;

                follower.Position.x = follower.Position.x + (dx * follower.MouseFollower.speed);
                follower.Position.y = follower.Position.y + (dy * follower.MouseFollower.speed);

            }.bind(this));
        }
    }
});
