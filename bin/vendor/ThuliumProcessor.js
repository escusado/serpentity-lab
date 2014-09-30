var ThuliumProcessor = Class('ThuliumProcessor')({

    _currentViews : [],

    currentView : function () {
      return this._currentViews[this._currentViews.length - 1];
    },

    result : function( templateString, context ){
        var currentView;
        currentView = new Thulium( { template: templateString } );
        this._currentViews.push(currentView);
        currentView.parseSync().renderSync( context );
        this._currentViews.pop();
        return currentView.view;
    }

});

module.exports.ThuliumProcessor = ThuliumProcessor;