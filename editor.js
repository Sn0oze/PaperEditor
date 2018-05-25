var rects = [];
addRect();

var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
};

function onKeyUp(event) {
    switch (event.key){
        case "+":
            addRect();
            break;
        default:
            console.log("no listener")
    }
}

function addRect() {
    var rect = new Shape.Rectangle({
        point: [700, 250],
        size: [200, 100],
        strokeColor: "teal",
        fillColor: "teal",
        selectedColor: "orange",
        opacity:0.4
    });
    //rect.selected = true;
}

function onMouseMove(event) {
    project.activeLayer.selected = false;
    if (event.item){
        event.item.bringToFront();
        event.item.selected = true;
    }
}

var type = "";
var rect;
function onMouseDown(event) {
    var hitResult = project.hitTest(event.point, hitOptions);
    if (hitResult){
        type = hitResult.type;
        rect = hitResult.item;
    }
}

function onMouseDrag(event) {
    if (type ==="stroke") {
        resizeDimensions(rect, 210,100)
    } else if (type === "fill") {
        if(rect){
            rect.position += event.delta;
        }
    }
}

function resizeDimensions(elem,width,height){
    //calc scale coefficients and store current position
    var scaleX = width/elem.bounds.width;
    var scaleY = height/elem.bounds.height;
    var prevPos = new Point(elem.bounds.x,elem.bounds.y);

    //apply calc scaling
    elem.scale(scaleX,scaleY);

    //reposition the elem to previous pos(scaling moves the elem so we reset it's position);
    var newPos = prevPos + new Point(elem.bounds.width/2,elem.bounds.height/2);
    elem.position = newPos;
}
