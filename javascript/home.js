var canvas = new fabric.Canvas('canvas');
canvas.selection = false;
canvas.hoverCursor = "pointer";

//22 vertical boxes (22 notes, 3 octaves & 4 tonics)
//24 horizontal boxes (6 measures of 4/4)

var mouseDown = 0;
document.body.onmousedown = function(){
    ++mouseDown;
}
document.body.onmouseup = function(){
    --mouseDown;
}

var defaultColor = '#4C4C4C';
var hoverColor = '#AEAEAE';
var selectedColor = ['#E825C6','#9144FF','#5AADF5','#4FF593','#FFF343','#FF923C','#E80D06'];

for (var vert = 0; vert < 22; vert++){ // horizontal different time
    for (var hor = 0; hor < 24; hor++){ // vertical diff notes  
        var rect = new fabric.Rect({
            left: 28*hor+16,
            top: 28*vert+16,
            fill: defaultColor,
            width: 23,
            height: 23,
            selected: 0,
            row: vert%7
            });
            
        rect.hasControls = rect.hasBorders = false;
        rect.lockRotation = rect.lockScalingX = rect.lockScalingY = true;
        rect.lockMovementX = rect.lockMovementY = true;

        canvas.add(rect);
    
    }
}

canvas.on({
    'mouse:down': function(e){ //color when you click on a square
        if (e.target){
            if (e.target.selected == 0){
                e.target.fill = selectedColor[e.target.row];
                e.target.opacity = 0.75;
                e.target.selected = 1;
                canvas.renderAll();
            }else{
                e.target.fill = defaultColor;
                e.target.selected = 0;
                canvas.renderAll();
            }
        }
    },
    'mouse:over': function(e){ //color when you hover over a square
        if(e.target){
            if (e.target.selected == 0){
                e.target.setFill(hoverColor);
                canvas.renderAll();
            }
            else{
                e.target.opacity = 0.5;
                canvas.renderAll();
            }
        }
        if(mouseDown){
            if (e.target){
                if (e.target.selected == 0){
                    e.target.fill = selectedColor[e.target.row];
                    e.target.opacity = 0.75;
                    e.target.selected = 1;
                    canvas.renderAll();
                }else{
                    e.target.fill = defaultColor;
                    e.target.selected = 0;
                    canvas.renderAll();
                }
            }
        }
    },
    'mouse:out': function(e){ //color when you're done hovering over a square
        if(e.target){
            if (e.target.selected == 0){
                e.target.setFill(defaultColor);
                e.target.opacity = 1.0;
                canvas.renderAll();
            }else{
                e.target.opacity = 0.75;
                canvas.renderAll();
            }
        }
    }
});
//this.__canvases.push(canvas);