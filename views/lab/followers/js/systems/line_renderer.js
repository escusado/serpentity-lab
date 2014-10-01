Class(Serpentoids.Systems, "LineRenderer").inherits(Serpentity.System)({
    prototype : {
        keyboard : null,
        renderables : null,

        scale : chroma.scale(['#FFCF40', '#FF9F40', '#FF6F40', '#A1283B' ,'#3D2040']).mode('lab'), //theme oranges purple
        // scale : chroma.scale(['#8A9B0F', '#F8CA00', '#E97F02' ,'#BD1550']).mode('lab'), //oranges over purple
        // scale : chroma.scale(['#E5FCC2', '#9DE0AD', '#45ADA8', '#547980']).mode('lab'), //beige to teal

        init : function init(config) {
            var property;

            for (property in config) {
                if (config.hasOwnProperty(property)) {
                    this[property] = config[property];
                }
            }
        },
        added : function added(engine) {
            this.renderables = engine.getNodes(Serpentoids.Nodes.LineRenderer);
        },
        removed : function removed(engine) {
            this.renderables = null;
        },
        update : function update(dt) {

            this.renderables.forEach(function (renderable) {

                var color, length,
                    line = renderable.line.graphic,

                    x1 = renderable.line.entity_from.getComponent(Serpentoids.Components.Position).x,
                    y1 = renderable.line.entity_from.getComponent(Serpentoids.Components.Position).y,

                    x2 = renderable.line.entity_to.getComponent(Serpentoids.Components.Position).x,
                    y2 = renderable.line.entity_to.getComponent(Serpentoids.Components.Position).y;


                line.setTo(x1, y1, x2, y2);


                length = Math.sqrt( Math.pow( x2 - x1 , 2) + Math.pow( y2 - y1 , 2) );
                length = Math.floor(length) / 100;
                color = this.scale(length).hex(); // #FF7F7F

                // console.log('>>>', d);

                Serpentoids.game.debug.geom(line, color);



            }.bind(this));
        }
    }
});
