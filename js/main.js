/**
 * ★ Playing with drag n'drop
 * @author Alister Lewis-Bowen <alister@different.com>
 */

var width = 0,
    height = 0,
    terminalGroups = 4,
    origin = { x: 0, y: 0 }
    current = { x: 0, y: 0 }
    wireLayer = null,
    wire = null;

function init() {
    var padding = parseInt($('#board').css('padding'))*2;
    width = $('#board').innerWidth() - padding;
    height = $('#board').innerHeight() - padding;
    wireLayer = d3.select('#board').append('svg:svg')
        .attr('width', width)
        .attr('height', height);
    layoutTerminals();
    initDragDrop();
}

function layoutTerminals() {
    var x = 0;
    var y = 0;
    var x1 = 16;
    var y1 = 16;
    var w = width-x1
    var h = height-y1;
    var xSteps = 20;
    var ySteps = 8;
    var xInc = Math.floor(w/xSteps);
    var yInc = Math.floor(h/ySteps);
    var id = 0;
    for (var i=0; i<xSteps+1; i++) {
        for (var j=0; j<ySteps+1; j++) {
            if ((Math.floor(Math.random()*2)) == 1) {
                x = x1 + (xInc*i);
                y = y1 + (yInc*j);
                id++
                $('#board').append('<div id="t'+ id +'" class="terminal"><i class="icon-circle-blank"></i></div>');
                $('#t'+ id).css({ 'left': x, 'top': y }).addClass('group'+ (Math.floor(Math.random()*terminalGroups)));
            }
        }
    }
}

function initDragDrop() {
    $('.terminal').draggable({
        containment: 'parent',  // keep terminal on the board
        cursor: 'pointer',      // change cursor while dragging
        helper: terminalHelper, // function to create draggable helper
        start: startHandler,    // fired when draggable element first dragged
        drag: dragHandler,      // fired when draggable element dragged
        stop: stopHandler       // fired when draggable element dropped
    });
    $('.terminal').droppable({
        activeClass: 'active',  // class of droppable while an acceptable draggable is being dragged
        hoverClass: 'dropit',   // class of droppable while an acceptable draggable is being hovered over the droppable
        tolerance: 'intersect', // draggable overlaps the droppable at least 50% in both directions
        drop: dropHandler       // fired when an accepted draggable is dropped on the droppable
    });
    for (var group=0; group<terminalGroups; group++) {
        var selector = '.terminal.group'+ group;
        $(selector).droppable({ accept: selector }); // tie together draggable and droppable
    }
}

function terminalHelper(e) {
    return '<div id="terminal-helper" class="terminal"><i class="icon-circle-blank"></i></div>';
}

function startHandler(e, o) {
    origin.x = o.originalPosition.left - 9;
    origin.y = o.originalPosition.top - 5;
    wire = wireLayer.append('svg:line')
        .property('id','connection')
        .attr('x1', origin.x).attr('y1', origin.y)
        .attr('x2', origin.x).attr('y2', origin.y)
        .style('stroke', '#bfff00')
        .style('stroke-width', '4px')
        .style('stroke-opacity', 0.3);
}

function dragHandler(e, o) {
    current.x = o.position.left - 9;
    current.y = o.position.top - 5;
    wire.attr('x2', current.x).attr('y2', current.y);
}

function stopHandler(e, o) {
    wire.remove();
}

function dropHandler(e, o) {
    wireLayer.append('svg:line')
        .property('class','wire')
        .attr('x1', origin.x).attr('y1', origin.y)
        .attr('x2', current.x).attr('y2', current.y)
        .style('stroke', '#bfff00')
        .style('stroke-width', '4px')
        .style('stroke-opacity', 0.8);
}

$(function() {
    init();
});

