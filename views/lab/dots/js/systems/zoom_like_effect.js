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

                    zoomFactor = 1 - zoomable.DisplayShape.shape.scale.x;
                    zoomDelta = 0.02;
                } else {

                    nextX = (zoomable.ZoomLikeEffect._originalPosition.x - localTargetX) - zoomable.Position.x;
                    nextY = (zoomable.ZoomLikeEffect._originalPosition.y - localTargetY) - zoomable.Position.y;

                    zoomFactor = zoomable.ZoomLikeEffect.zoomFactor - zoomable.DisplayShape.shape.scale.x;
                    zoomDelta = 0.9;

                    zoomable.TintFader._tintIndex = 0;

                    SerpentityApp.game.world.bringToTop(zoomable.DisplayShape.shape);
                }

                // nextX = zoomable.ZoomLikeEffect._originalPosition.x - localTargetX;
                // nextY = zoomable.ZoomLikeEffect._originalPosition.y - localTargetY;

                // console.log('>>', nextX, nextY);

                zoomable.Position.x = zoomable.Position.x + (nextX * 0.2);
                zoomable.Position.y = zoomable.Position.y + (nextY * 0.2);

                // zoomable.Position.x = nextX;
                // zoomable.Position.y = nextY;

                zoomable.DisplayShape.shape.scale.x = zoomable.DisplayShape.shape.scale.x + (zoomFactor * zoomDelta);
                zoomable.DisplayShape.shape.scale.y = zoomable.DisplayShape.shape.scale.y + (zoomFactor * zoomDelta);


                // SerpentityApp.game.debug.geom( new Phaser.Line(zoomable.Position.x, zoomable.Position.y, zoomable.ZoomLikeEffect._originalPosition.x, zoomable.ZoomLikeEffect._originalPosition.y) );

            });
        }
    }
});
