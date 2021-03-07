var idk = /** @class */ (function () {
    function idk() {
        var _this = this;
        var button = document.getElementById("generate");
        button.addEventListener("click", function () { return _this.generate(); });
    }
    idk.prototype.generate = function () {
        var _this = this;
        var quantity = +document.getElementById("quantity").value;
        console.log(quantity);
        var cont = document.getElementById("container");
        for (var i = 1; i <= quantity; i++) {
            var newInp = document.createElement("input");
            newInp.id = "inputValue" + i;
            cont.appendChild(newInp);
        }
        var buttonEl = document.createElement("button");
        buttonEl.innerHTML = "Calculate";
        buttonEl.addEventListener("click", function () { return _this.calculateAndShow(quantity); });
        cont.appendChild(buttonEl);
    };
    idk.prototype.sum = function (arr) {
        var sum = 0;
        arr.forEach(function (element) {
            sum += element;
        });
        return sum;
    };
    idk.prototype.avg = function (arr) {
        var sum = 0;
        arr.forEach(function (element) {
            sum += element;
        });
        return sum / arr.length;
    };
    idk.prototype.min = function (arr) {
        var _min = arr[0];
        arr.forEach(function (element) {
            if (element < _min) {
                _min = element;
            }
        });
        return _min;
    };
    idk.prototype.max = function (arr) {
        var _min = arr[0];
        arr.forEach(function (element) {
            if (element > _min) {
                _min = element;
            }
        });
        return _min;
    };
    idk.prototype.calculateAndShow = function (quantity) {
        var varr = new Array();
        console.log(quantity);
        for (var i = 1; i <= quantity; i++) {
            var valData = document.getElementById("inputValue" + i).value;
            //console.log(valData);
            varr.push(+valData);
        }
        var _sum = this.sum(varr);
        var sumBox = document.getElementById("sum");
        sumBox.value = _sum.toString();
        var _min = this.min(varr);
        var minBox = document.getElementById("min");
        minBox.value = _min.toString();
        var _max = this.max(varr);
        var maxBox = document.getElementById("max");
        maxBox.value = _max.toString();
        var _avg = this.avg(varr);
        var avgBox = document.getElementById("avg");
        avgBox.value = _avg.toString();
    };
    return idk;
}());
var obj = new idk();
