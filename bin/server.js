#! /usr/local/bin/node

//Config
var serverPort = process.env.PORT || 3000,
    experimentsPath = 'views/lab/';


//Dependencies
require('neon');
require('thulium');

var express = require('express'),
    http    = require('http'),
    app     = express(),
    server  = http.createServer(app),
    io      = require('socket.io').listen(server),
    fs      = require('fs'),
    TmProc  = require('./vendor/ThuliumProcessor').ThuliumProcessor;


//Application
Class('Server')({
    prototype : {
        init : function (){
            this._configureApp();
            this._setRoutes();
            this._setupSockets();
            this._serverStart();

            return this;
        },

        _configureApp : function _configureApp(){
            //neon
            app.use('/neon', express.static('node_modules/neon'));

            //CORS
            app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "X-Requested-With");
                next();
            });

            //Static routes
            app.use('/assets', express.static('assets/'));
            app.use('/lab', express.static(experimentsPath));

            return this;
        },

        _setRoutes : function _setRoutes(){
            app.get('/', function(req, res){
                res.sendFile('views/index.html', {'root': __dirname + '/..'});
            });

            app.get('/lab/:experiment', this._loadExperiment.bind(this));

            return this;
        },

        _loadExperiment : function _loadExperiment(req, res){

            // var experimentPath, experimentPageContent, renderedPage;

            // experimentPath = experimentsPath + req.params.experiment + '.ejs';
            // experimentPageContent = fs.readFileSync(experimentPath, 'utf-8');
            // renderedPage = TmProc.result(experimentPageContent, {Ctx : ThuliumContext, locals : {experiment : req.params.experiment}});

            renderedPage = ThuliumContext.render('experimentsTemplate' , {experiment : req.params.experiment});

            res.end(renderedPage);
        },

        _setupSockets : function _setupSockets(){
            var server = this;

            io.sockets.on('connection', function (socket) {
                socket.on('client:hello', server._clientHello.bind(this, socket));
            });
        },

        _clientHello : function(socket, data){
            data.message = 'Server echo: '+ data.message;
            socket.emit('server:echo', data);
        },

        _serverStart : function _serverStart(){
            console.log('Server ready');
            console.log('http://localhost:'+serverPort.toString());
            server.listen(serverPort);
        }
    }
});

Class('ThuliumContext')({

    render : function render( viewName, locals ){

        var experimentPath, experimentPageContent, renderedPage;

        experimentPath = experimentsPath + viewName + '.ejs';
        experimentPageContent = fs.readFileSync(experimentPath, 'utf-8');
        renderedPage = TmProc.result(experimentPageContent, {Ctx : this, locals : locals});

        return renderedPage;
    },

    renderExperimentDependencies : function renderExperimentDependencies(jsFilesArray, experiment){
        var dependenciesBuffer = '';

        console.log('///', experiment);

        jsFilesArray.forEach(function(fileName){
            dependenciesBuffer += '<script src="/lab/' + experiment + '/' + fileName +'.js"></script>';
        });

        console.log('>>>', dependenciesBuffer);

        return dependenciesBuffer;
    }

});

//Startup
var server = new Server();
