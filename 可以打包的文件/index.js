console.log('ZTO-batch loaded')

const js = [
    'http://app.d2collection.com/ZTO-batch-load/load.js'
]
js.forEach(function (e) {
    var s= document.createElement("script");
    s.type = "text/javascript";
    s.src = e;
    document.body.appendChild(s);
})

console.log('ZTO-batch script tag add')

const link = [
    'http://app.d2collection.com/ZTO-batch-load/load.css'
]
link.forEach(function (e) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = e;
    document.head.appendChild(link);
})

console.log('ZTO-batch style tag add')