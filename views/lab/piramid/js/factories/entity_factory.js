Module(SerpentityApp, "EntityFactory")({

    createPiramidEntity : function createPiramidEntity(config){
        var bottomFloorWidth = SerpentityApp.game.width * 2,
            widthDelta = (bottomFloorWidth)/config.howManyFloors,
            paddingDelta = config.topFloorPadding / config.howManyFloors,
            colorDelta = 100 / config.howManyFloors;


        for(var i = config.howManyFloors; i >= 0 ; i -= 1){
            this.createSquareFollowerRestrictedEntity({
                minWidth : widthDelta * i,
                padding : paddingDelta * i,
                color : config.colorScale((colorDelta * i)/100).hex(),
                speed : 0.1
            });
        }

    },

    createSquareFollowerRestrictedEntity : function createSquareFollowerRestrictedEntity(config){
        var minWidth = config.minWidth,
            viewPortSize = {
                width  : SerpentityApp.game.width,
                height : SerpentityApp.game.height
            },
            minHeight = (viewPortSize.height / viewPortSize.width) * minWidth,
            padding = config.padding;

        var rect = this.createRectEntity({
            color  : config.color,
            width  : minWidth,
            height : minHeight,
            pos    : {
                x : viewPortSize.width / 2,
                y : viewPortSize.height / 2
            }
        });

        // ((viewPortSize.height / 2) - (minHeight / 2)) + padding
        // ((viewPortSize.height / 2) + (minHeight / 2)) + padding

        rect.addComponent(new SerpentityApp.Components.FollowMouseRestricted({
            speed : config.speed,
            input : SerpentityApp.game.input.mousePointer,

            limitTop    : ((viewPortSize.height / 2) - (minHeight / 4)) - padding,
            limitBottom : ((viewPortSize.height / 2) + (minHeight / 4)) + padding,

            limitLeft  : ((viewPortSize.width / 2) - (minWidth / 4)) - padding,
            limitRight : ((viewPortSize.width / 2) + (minWidth / 4)) + padding

        }));

        SerpentityApp.engine.addEntity(rect);
    },

    createRectEntity : function createRectEntity(config){

        var entity,
            rect = SerpentityApp.game.add.graphics(0, 0);

        rect.lineStyle(0);
        rect.beginFill(Phaser.Color.hexToRGB(config.color));
        rect.drawRect((config.width/2)*-1, (config.height/2)*-1, config.width, config.height);

        entity = new (Serpentity.Entity)();

        entity.addComponent(new SerpentityApp.Components.Position({
            x: config.pos.x,
            y: config.pos.y
        }));

        entity.addComponent(new SerpentityApp.Components.DisplayShape({
            shape : rect
        }));

        return entity;
    }

});
