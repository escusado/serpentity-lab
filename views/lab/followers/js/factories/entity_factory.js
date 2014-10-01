Module(Serpentoids, "EntityFactory")({

    createDotMouseFollowerEntity : function createDotMouseFollowerEntity(speed){

        var entity;
        //     circle = Serpentoids.game.add.graphics(0, 0);

        // // draw a dot
        // circle.lineStyle(0);
        // circle.beginFill(0x8A9B0F);
        // circle.drawCircle(0,0,5);

        entity = new (Serpentity.Entity)();

        entity.addComponent(new Serpentoids.Components.Position({
            x: 100,
            y: 100
        }));


        // entity.addComponent(new Serpentoids.Components.DisplayShape({
        //     shape : circle
        // }));

        entity.addComponent(new Serpentoids.Components.MouseFollower({
            speed : speed,
            input : Serpentoids.game.input.mousePointer
        }));

        Serpentoids.engine.addEntity(entity);

        this.createDotEntityFollowerEntity(0.1, entity);

        return entity;
    },

    createDotEntityFollowerEntity : function createDotEntityFollowerEntity(speed, followedEntity){
        var entity;
        //     circle = Serpentoids.game.add.graphics(0, 0);

        // // draw a dot
        // circle.lineStyle(0);
        // circle.beginFill(0x0000FF);
        // circle.drawCircle(0,0,3);

        entity = new (Serpentity.Entity)();

        entity.addComponent(new Serpentoids.Components.Position({
            x: 100,
            y: 100
        }));



        // entity.addComponent(new Serpentoids.Components.DisplayShape({
        //     shape : circle
        // }));

        entity.addComponent(new Serpentoids.Components.EntityFollower({
            speed : speed,
            entity : followedEntity
        }));

        Serpentoids.engine.addEntity(entity);

        return entity;
    },

    createLineEntity : function createLineEntity(config){
        var entity;

        entity = new (Serpentity.Entity)();

        entity.addComponent(new Serpentoids.Components.Line({
            entity_from : config.entity_from,
            entity_to : config.entity_to,
            graphic : new Phaser.Line(0, 0, 10, 10)
        }));

        Serpentoids.engine.addEntity(entity);

        return entity;
    }
});
