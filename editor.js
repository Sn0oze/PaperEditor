var rects = [];
addRect();

var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
};

var type = "";
var rect;

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

function onKeyUp(event) {
    switch (event.key){
        case "+":
            addRect();
            break;
        case "backspace":
            project.activeLayer._children.find(function (item) {
                if(item.selected){
                    item.remove();
                }
            });
            break;
        case "left":
            project.activeLayer._children.find(function (item) {
                if(item.selected){
                    console.log("left");
                    item.rotate(5)
                }
            });
            break;
        case "right":
            project.activeLayer._children.find(function (item) {
                if(item.selected){
                    console.log("left");
                    item.rotate(-5)
                }
            });
            break;
        default:
            console.log("No listener: ", event.key);
    }
}

function onMouseMove(event) {
    if (event.item){
        project.activeLayer.selected = false;
        event.item.bringToFront();
        event.item.selected = true;
    }
}

function onMouseDown(event) {
    var hitResult = project.hitTest(event.point, hitOptions);
    if (hitResult){
        type = hitResult.type;
        rect = hitResult.item;
    }else{
        type = "";
        rect = null;
        project.activeLayer.selected = false;
    }
}

function onMouseDrag(event) {
    if (type ==="stroke") {
        var rectX = rect.position.x;
        var rectY = rect.position.y;
        var rectHeight = rect.bounds.height;
        var rectWidth = rect.bounds.width;
        var x =  event.event.clientX;
        var y = event.event.clientY;
        console.log(rectX, rectY, rect.bounds.x, rect.bounds.y);
        //resizeDimensions(rect,rectX-x,rectY- y)
        if(x >= rectX){
            console.log("from right")
        }
        else if(x <= rectX){
            console.log("from left")
        }
    } else if (type === "fill") {
        rect.position += event.delta;
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
    elem.position = prevPos + new Point(elem.bounds.width/2,elem.bounds.height/2);
}


