var s= document.createElement("script");
s.type = "text/javascript";
// s.src="http://app.d2collection.com/zt-plug-in/plug-in.js";
s.src="http://localhost:7879/plug-in.js";
document.body.appendChild(s);


var link = document.createElement('link');
link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'http://localhost:7879/plug-in.css';
document.head.appendChild(link);


var link = document.createElement('link');
link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css';
document.head.appendChild(link);