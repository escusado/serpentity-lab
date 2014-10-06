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
        // circle.lineStyle(1, 0x000000, 0.1);
        circle.lineStyle(0) ;
        circle.beginFill(0xFFFFFF);
        // circle.drawCircle(0,0,5);
        circle.drawRect(0,0,20, 20);

        var entity = SerpentityApp.entityFactory.createFadingDot({
            colorScale : chroma.scale(['#FFCF40', '#FF9F40', '#FF6F40', '#A1283B' ,'#3D2040']).mode('lab').domain([0,1], 10),
            // colorScale : chroma.scale(['#FF7357', '#FFED83', '#88FF74', '#8AADFF' ,'#AE8DFF', '#FF98FA']),

            fadingSpeed : 2, //Math.random()
            position : {
                x : config.position.x,
                y : config.position.y
            },
            shape : circle
        });

        circle.endFill();

        entity.addComponent(new SerpentityApp.Components.ZoomLikeEffect({
            zoomFactor : config.zoomFactor,
            effectDistance : config.effectDistance,
            targetEntity : config.targetEntity
        }))

        return entity;
    },

    createDotGrid : function createDotGrid(config){
        var rows = (SerpentityApp.game.width / config.padding) -1,
            cols = (SerpentityApp.game.height / config.padding) -1,
            mouseFollowerEntity = SerpentityApp.entityFactory.createMouseFollower();

        SerpentityApp.engine.addEntity(mouseFollowerEntity);

        for(var i=1;i<=cols;i+=1){
            for(var j=1;j<=rows;j+=1){

                var entity = SerpentityApp.entityFactory.createZoomableLikeDot({
                    position : {
                        x : config.padding * j,
                        y : config.padding * i
                    },
                    zoomFactor : 2,
                    effectDistance : 80,
                    targetEntity : mouseFollowerEntity
                });

                SerpentityApp.engine.addEntity(entity);

            }
        }





        return entity;
    }

});
