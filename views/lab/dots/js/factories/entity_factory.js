Module(SerpentityApp, "EntityFactory")({

    createFadingDotEntity : function createFadingDotEntity(config){

        var entity = new (Serpentity.Entity)();

        entity.addComponent(new SerpentityApp.Components.Position({
            x: 20,
            y: 20
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
    }

});
