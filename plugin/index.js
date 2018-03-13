const js = [
    'http://localhost:3000/load.js'
]
js.forEach(function (e) {
    var s= document.createElement("script");
    s.type = "text/javascript";
    s.src = e;
    document.body.appendChild(s);
})

const link = [
    'http://localhost:3000/load.css'
]
link.forEach(function (e) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = e;
    document.head.appendChild(link);
})