/**
 * ★ Playing with a wiring metaphor
 * @author Alister Lewis-Bowen <alister@different.com>
 */

var jp = [],            // jsPlumb instance
    width = 0,          // width of baord
    height = 0,         // height of board
    terminalGroups = 4, // number of terminal groups
    terminals = [];     // array of terminals

var endpointOptions = {
        endpoint: [ 'Dot', { radius: 4 } ],
        paintStyle: {
            strokeStyle: 'rgba(191, 255, 0, 0.8)',
        },
        isSource: true,
        isTarget: true,
        reattach : true,
        connector: [ 'Flowchart', { midpoint: 0.38, cornerRadius: 16 } ],
        connectorStlye: {
            lineWidth: 3,
            strokeStyle: 'rgba(191, 255, 0, 0.8)',
            outlineColor: null,
            outlineWidth: 0
        },
        beforeDrop: function(i) { console.log('Connecting'); },
        dropOptions: dropOptions
    };

var dropOptions = {
        tolerance: 'touch',         // ??
        hoverClass: 'dropHover',    // jsPlumb_hover on connectors/endpoints on mouse hover
        activeClass: 'dragActive'   // ??
    };

function init() {
    var padding = parseInt($('#board').css('padding'))*2;
    width = $('#board').innerWidth() - padding;
    height = $('#board').innerHeight() - padding;

    jp = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        PaintStyle: { strokeStyle: '#ccc' },
        EndpointStyle: { width: 16, height: 16, strokeStyle: '#bfff00' },
        Anchors: [ 'Center', 'Center' ],
        Container: 'board'
    });

    jp.doWhileSuspended(function() {
        jp.bind('connection', function(i, e) { console.log('Connected'); });
        jp.bind('connectionDetached', function(i, e) { console.log('Detached'); });
    });

    layoutTerminals();
}

function drawTerminal(x, y, id, scope) {
    $('#board').append('<div id="t'+ id +'" class="terminal"></div>');
    $('#t'+ id).css({ 'left': x, 'top': y }).addClass('scope'+ scope);
    terminals.push(jp.addEndpoint('t'+ id, { scope: scope }, endpointOptions));
    //$('#t'+ id).css({ 'left': x, 'top': y });
}

function layoutTerminals() {
    var x1 = 16,
        y1 = 16,
        xSteps = 20,
        ySteps = 8,
        xInc = Math.floor((width-x1)/xSteps),
        yInc = Math.floor((height-y1)/ySteps),
        id = 0;
    for (var i=0; i<xSteps+1; i++) {
        for (var j=0; j<ySteps+1; j++) {
            if ((Math.floor(Math.random()*2)) == 1) {
                drawTerminal(
                    x1 + (xInc*i),
                    y1 + (yInc*j),
                    id++,
                    Math.floor(Math.random()*terminalGroups)
                );
            }
        }
    }
}

$(function() {
    jsPlumb.ready(function() {
        init();
    });
});

