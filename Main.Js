function tool_circle() {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
        if (!tool.started) {
            return;
        }

        context.fillStyle = 'red';

        var distance = Math.sqrt(Math.pow(tool.x0 - ev._x, 2) + Math.pow(tool.y0 - ev._y));
        context.beginPath();
    
        context.arc(tool.x0, tool.y0,15, 0, Math.PI * 2, false);
        context.stroke();
        context.fill();
    };

    this.mouseup = function (ev) {
        if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            img_update();
        }
    };
}
function drawEllipse(x1, y1, x2, y2) {

    var radiusX = (x2 - x1) * 0.5,   
        radiusY = (y2 - y1) * 0.5,   
        centerX = x1 + radiusX,      
        centerY = y1 + radiusY,
        step = 0.01,                 
        a = step,                    
        pi2 = Math.PI * 2 - step;    
    
    ctx.beginPath();

    ctx.moveTo(centerX + radiusX * Math.cos(0),
               centerY + radiusY * Math.sin(0));
    
    for(; a < pi2; a += step) {
        ctx.lineTo(centerX + radiusX * Math.cos(a),
                   centerY + radiusY * Math.sin(a));
    }
    
    ctx.closePath();
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width,
    h = canvas.height,
    x1,                
    y1,
    isDown = false;     
   
canvas.onmousedown = function(e) {

    var rect = canvas.getBoundingClientRect();
    x1 = e.clientX - rect.left;
    y1 = e.clientY - rect.top;
    isDown = true;
}

canvas.onmouseup = function() {
    isDown = false;
}

canvas.onmousemove = function(e) {

    if (!isDown) return;
    
    var rect = canvas.getBoundingClientRect(),
        x2 = e.clientX - rect.left,
        y2 = e.clientY - rect.top;
    
    ctx.clearRect(0, 0, w, h);

    drawEllipse(x1, y1, x2, y2);
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var scribble_canvasx = $(canvas).offset().left;
var scribble_canvasy = $(canvas).offset().top;
var scribble_last_mousex = scribble_last_mousey = 0;
var scribble_mousex = scribble_mousey = 0;
var scribble_mousedown = false;


$(canvas).on('mousedown', function(e) {
    scribble_last_mousex = parseInt(e.clientX-scribble_canvasx);
	scribble_last_mousey = parseInt(e.clientY-scribble_canvasy);
    scribble_mousedown = true;
});


$(canvas).on('mouseup', function(e) {
    scribble_mousedown = false;
});


$(canvas).on('mousemove', function(e) {
    scribble_mousex = parseInt(e.clientX-scribble_canvasx);
	scribble_mousey = parseInt(e.clientY-scribble_canvasy);
    if(scribble_mousedown) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.beginPath();
        var scalex = 1*((scribble_mousex-scribble_last_mousex)/2);
        var scaley = 1*((scribble_mousey-scribble_last_mousey)/2);
        var centerx = (scribble_last_mousex/scalex)+1;
        var centery = (scribble_last_mousey/scaley)+1;
        ctx.arc(centerx, centery, 1, 0, 2*Math.PI);
        ctx.restore();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    $('#output').html('current: '+scribble_mousex+', '+scribble_mousey+'<br/>last: '+scribble_last_mousex+', '+scribble_last_mousey+'<br/>mousedown: '+scribble_mousedown);
});
canvas {
    cursor: crosshair;
    border: 1px solid #000000;
}