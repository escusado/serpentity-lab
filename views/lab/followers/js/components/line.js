Class(Serpentoids.Components, "Line")({
    prototype : {
        entity_from : null,
        entity_to : null,

        graphic : null,

        init : function init(config) {
            var property;

            for (property in config) {
                if (config.hasOwnProperty(property)) {
                    this[property] = config[property];
                }
            }
        }
    }
});
