Class(Serpentoids.Components, "MouseFollower")({
    prototype : {

        speed : null,
        input : null,

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
