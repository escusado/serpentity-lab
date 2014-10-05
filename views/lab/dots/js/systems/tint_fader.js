Class(SerpentityApp.Systems, "TintFader").inherits(Serpentity.System)({
    prototype : {

        _faders : null,

        added : function added(engine) {
            this._faders = engine.getNodes(SerpentityApp.Nodes.FadingTint);
        },

        removed : function removed(engine) {
            this._faders = null;
        },

        update : function update(dt) {
            this._faders.forEach(function (fader) {

                if(fader.TintFader._tintIndex > 100 || fader.TintFader._tintIndex < 0){
                    fader.TintFader.fadingSpeed *= -1;
                }

                fader.Tint.tint = Phaser.Color.hexToRGB( fader.ColorScale.colorScale(fader.TintFader._tintIndex/100).hex() );

                fader.TintFader._tintIndex += fader.TintFader.fadingSpeed;
            });
        }
    }
});
