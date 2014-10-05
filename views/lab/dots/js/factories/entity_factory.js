Module(SerpentityApp, "EntityFactory")({

    createMouseFollower : function createMouseFollower(){

        var entity;

        entity = new (Serpentity.Entity)();

        entity.addComponent(new SerpentityApp.Components.Position({
            x: 100,
            y: 100
        }));

        entity.addComponent(new SerpentityApp.Components.MouseFollower({
            speed : 1,
            input : SerpentityApp.game.input.mousePointer
        }));

        return entity;

    },

    createFadingDot : function createFadingDot(config){

        var entity = new (Serpentity.Entity)();

        entity.addComponent(new SerpentityApp.Components.Position({
            x: config.position.x,
            y: config.position.y
        }));

        entity.addComponent(new SerpentityApp.Components.ColorScale({
            colorScale : config.colorScale
        }));

        entity.addComponent(new SerpentityApp.Components.Tint({
            tint : config.tint
        }));

        entity.addComponent(new SerpentityApp.Components.TintFader({
            fadingSpeed : config.fadingSpeed
        }));

        entity.addComponent(new SerpentityApp.Components.DisplayShape({
            shape : config.shape
        }));

        return entity;
    },

    createZoomableLikeDot : function createZoomableLikeDot(config){
        var circle = SerpentityApp.game.add.graphics(0, 0);

        // draw a dot
        circle.lineStyle(0);
        circle.beginFill(0xFFFFFF);
        circle.drawCircle(0,0,3);

        var entity = SerpentityApp.entityFactory.createFadingDot({
            // colorScale : chroma.scale(['#FFCF40', '#FF9F40', '#FF6F40', '#A1283B' ,'#3D2040']).mode('lab'),
            colorScale : chroma.scale(['#FF7357', '#FFED83', '#88FF74', '#8AADFF' ,'#AE8DFF', '#FF98FA']),

            fadingSpeed : 0.5,
            position : {
                x : 100,
                y : 100
            },
            shape : circle
        });

        circle.endFill();

        entity.addComponent(new SerpentityApp.Components.ZoomLikeEffect({
            zoomSize : config.zoomSize,
            effectDistance : config.effectDistance,
            targetEntity : config.targetEntity
        }))

        SerpentityApp.engine.addEntity(entity);
    }

});
