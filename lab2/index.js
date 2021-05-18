var channel1 = [];
var channel2 = [];
var channelStates = [false, false];
var dateThen;
function makeNoise(key) {
    var sound = document.querySelector('[data-sound="' + key + '"]');
    sound.currentTime = 0;
    sound.play();
}
var CliksHandler = /** @class */ (function () {
    function CliksHandler() {
    }
    CliksHandler.prototype.appStart = function () {
        var _this = this;
        dateThen = Date.now();
        document.addEventListener('keypress', this.onKeyPress);
        var _loop_1 = function (letter) {
            var letterButton = document.querySelector('[data-button=' + letter + ']');
            letterButton.addEventListener('click', function () { return _this.onClickButton(letter); });
        };
        for (var _i = 0, _a = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']; _i < _a.length; _i++) {
            var letter = _a[_i];
            _loop_1(letter);
        }
        var recordButton = document.querySelector('[data-rec=a' + 1 + ']');
        recordButton.addEventListener('click', function () { return _this.onClickRec(1); });
        recordButton = document.querySelector('[data-rec=a' + 0 + ']');
        recordButton.addEventListener('click', function () { return _this.onClickRec(0); });
        var playChannel = document.querySelector('[data-channelplay=a' + 0 + ']');
        playChannel.addEventListener('click', function () { return _this.onPlayChannel(0); });
        playChannel = document.querySelector('[data-channelplay=a' + 0 + ']');
        playChannel.addEventListener('click', function () { return _this.onPlayChannel(0); });
    };
    CliksHandler.prototype.onPlayChannel = function (i) {
        if (i == 0) {
            console.log(channel1);
            channel1.forEach(function (sound) {
                setTimeout(function () { return makeNoise(sound.key); }, sound.time);
            });
        }
        else {
            console.log(channel2);
            channel1.forEach(function (sound) {
                setTimeout(function () { return makeNoise(sound.key); }, sound.time);
            });
        }
    };
    CliksHandler.prototype.onClickRec = function (i) {
        console.log("prze ifem");
        if (channelStates[i] == false) {
            console.log("false");
            channelStates[i] = true;
            console.log((i + 1) + " channel recording starts ");
            var recordButton = document.querySelector('[data-rec=a' + i + ']');
            recordButton.innerHTML = "stop";
        }
        else {
            console.log("true");
            channelStates[i] = false;
            console.log((i + 1) + " channel recording stops ");
            var recordButton = document.querySelector('[data-rec=a' + i + ']');
            recordButton.innerHTML = "Record on channel" + (i + 1);
        }
    };
    CliksHandler.prototype.onClickButton = function (key) {
        var time = Date.now() - dateThen;
        if (channelStates[0] == true)
            channel1.push({ key: key, time: time });
        if (channelStates[1] == true)
            channel2.push({ key: key, time: time });
        console.log(key + " click");
        makeNoise(key);
    };
    CliksHandler.prototype.onKeyPress = function (ev) {
        var key = ev.key;
        var time = ev.timeStamp;
        if (channelStates[0] == true)
            channel1.push({ key: key, time: time });
        if (channelStates[1] == true)
            channel2.push({ key: key, time: time });
        makeNoise(key);
    };
    return CliksHandler;
}());
;
var app = new CliksHandler();
app.appStart();
