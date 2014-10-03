Module(SerpentityApp, "EntityFactory")({

    createEntity : function createEntity(speed){

        var entity,
            circle = SerpentityApp.game.add.graphics(0, 0);

        // draw a dot
        circle.lineStyle(0);
        circle.beginFill(0x8A9B0F);
        circle.drawCircle(0,0,5);

        entity = new (Serpentity.Entity)();

        entity.addComponent(new SerpentityApp.Components.Position({
            x: 20,
            y: 20
        }));

        entity.addComponent(new SerpentityApp.Components.DisplayShape({
            shape : circle
        }));

        SerpentityApp.engine.addEntity(entity);

        return entity;
    }

});
