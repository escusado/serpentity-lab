Class(SerpentityApp.Systems, "ZoomLikeEffect").inherits(Serpentity.System)({
    prototype : {

        _zoomables : null,

        added : function added(engine) {
            this._zoomables = engine.getNodes(SerpentityApp.Nodes.ZoomLikeEffect);
        },

        removed : function removed(engine) {
            this._zoomables = null;
        },

        update : function update(dt) {
            this._zoomables.forEach(function (zoomable) {

                if(zoomable.ZoomLikeEffect._originalPosition === null){
                    zoomable.ZoomLikeEffect._originalPosition = {
                        x : zoomable.Position.x,
                        y : zoomable.Position.y
                    }
                }

                var nextX, nextY,
                    zoomableX = zoomable.Position.x,
                    zoomableY = zoomable.Position.y,

                    targetX = zoomable.ZoomLikeEffect.targetEntity.getComponent(SerpentityApp.Components.Position).x,
                    targetY = zoomable.ZoomLikeEffect.targetEntity.getComponent(SerpentityApp.Components.Position).y

                    localTargetX = targetX - zoomable.ZoomLikeEffect._originalPosition.x,
                    localTargetY = targetY - zoomable.ZoomLikeEffect._originalPosition.y,
                    distanceToTarget = Phaser.Math.distance(zoomable.ZoomLikeEffect._originalPosition.x, zoomable.ZoomLikeEffect._originalPosition.y, targetX, targetY);

                // console.log('>>>>', zoomableX,
                //                     zoomableY,
                //                     targetX,
                //                     targetY,
                //                     localTargetX,
                //                     localTargetY,
                //                     distanceToTarget,
                //                     zoomable.ZoomLikeEffect.effectDistance
                //                     );

                if(distanceToTarget > zoomable.ZoomLikeEffect.effectDistance){
                    nextX = zoomable.ZoomLikeEffect._originalPosition.x - zoomable.Position.x;
                    nextY = zoomable.ZoomLikeEffect._originalPosition.y - zoomable.Position.y;
                } else {
                    nextX = (zoomable.ZoomLikeEffect.effectDistance - localTargetX) - zoomable.Position.x;
                    nextY = (zoomable.ZoomLikeEffect.effectDistance - localTargetY) - zoomable.Position.y;
                }

                zoomable.Position.x = zoomable.Position.x + (nextX * 0.5);
                zoomable.Position.y = zoomable.Position.y + (nextY * 0.5);

            });
        }
    }
});
