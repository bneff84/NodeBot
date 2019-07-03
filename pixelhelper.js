let io = require('./lib/io.js');

io.addMouseMoveHandler('colorpicker', function(event, io) {
    event.color = io.getScreenPixel(io.getMouseX(), io.getMouseY());
    console.log(event);
});

io.startListening();