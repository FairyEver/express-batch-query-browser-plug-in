[
    'http://localhost:7879/xlsx.full.min.js',
    'http://localhost:7879/plug-in.js'
].forEach(function (e) {
    var s= document.createElement("script");
    s.type = "text/javascript";
    s.src = e;
    document.body.appendChild(s);
})

[
    'http://localhost:7879/plug-in.css',
    'http://localhost:7879/bootstrap.min.css'
].forEach(function (e) {
    console.log(e)
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = e;
    document.head.appendChild(link);
})