Class(SerpentityApp.Systems, "MouseFollowerRestricted").inherits(Serpentity.System)({
    prototype : {
        followers : null,
        init : function init(config) {
            var property;

            for (property in config) {
                if (config.hasOwnProperty(property)) {
                    this[property] = config[property];
                }
            }
        },
        added : function added(engine) {
            this.followers = engine.getNodes(SerpentityApp.Nodes.MouseFollowerRestricted);
        },
        removed : function removed(engine) {
            this.followers = null;
        },
        update : function update(dt) {
            this.followers.forEach(function (follower) {

                var nextX, nextY,
                    x1 = follower.position.x,
                    y1 = follower.position.y,

                    x2 = follower.follow_mouse_restricted.input.x,
                    y2 = follower.follow_mouse_restricted.input.y,

                    dx = x2 - x1,
                    dy = y2 - y1;

                if( Math.round(x1) === Math.round(x2) && Math.round(y1) === Math.round(y2) ) { return; } //do not process if they are the same

                nextX = Math.round( follower.position.x + (dx * follower.follow_mouse_restricted.speed) )
                nextY = Math.round( follower.position.y + (dy * follower.follow_mouse_restricted.speed) )

                if(nextY < follower.follow_mouse_restricted.limitTop){
                    nextY = follower.follow_mouse_restricted.limitTop;
                }

                if(nextY > follower.follow_mouse_restricted.limitBottom){
                    nextY = follower.follow_mouse_restricted.limitBottom;
                }

                if(nextX < follower.follow_mouse_restricted.limitLeft){
                    nextX = follower.follow_mouse_restricted.limitLeft;
                }

                if(nextX > follower.follow_mouse_restricted.limitRight){
                    nextX = follower.follow_mouse_restricted.limitRight;
                }

                follower.position.x = nextX;
                follower.position.y = nextY;

            }.bind(this));
        }
    }
});
