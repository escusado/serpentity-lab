Class(Serpentoids.Components, "EntityFollower")({
    prototype : {

        speed : null,
        target : null,

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
