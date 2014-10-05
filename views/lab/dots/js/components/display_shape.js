Class(SerpentityApp.Components, "DisplayShape")({
    prototype : {
        shape : null,

        init : function (config) {
            var property;

            for (property in config) {
                if (config.hasOwnProperty(property)) {
                    this[property] = config[property];
                }
            }
        }
    }
});
