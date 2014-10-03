Class(SerpentityApp.Components, "FollowMouseRestricted")({
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
