Class(SerpentityApp.Components, "Position")({
    prototype : {
        x : 0,
        y : 0,

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
