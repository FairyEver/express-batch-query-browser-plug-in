if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

var js = [
    'http://localhost:7879/xlsx.full.min.js',
    'http://localhost:7879/plug-in.js'
]
js.forEach(function (e) {
    var s= document.createElement("script");
    s.type = "text/javascript";
    s.src = e;
    document.body.appendChild(s);
})

var link = [
    'http://localhost:7879/plug-in.css',
    'https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css'
]
link.forEach(function (e) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = e;
    document.head.appendChild(link);
})