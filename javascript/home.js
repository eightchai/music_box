var canvas = new fabric.Canvas('canvas');
canvas.selection = false;
canvas.hoverCursor = "pointer";

//22 vertical boxes (22 notes, 3 octaves & 4 tonics)
//24 horizontal boxes (6 measures of 4/4)

var mouseDown = 0; //for when the mouse is clicked and dragged over the boxes
document.body.onmousedown = function(){
    mouseDown = 1;
}
document.body.onmouseup = function(){
    mouseDown = 0;
}

var defaultColor = '#4C4C4C';
var hoverColor = '#AEAEAE';
var selectedColor = ['#E825C6','#9144FF','#5AADF5','#4FF593','#FFF343','#FF923C','#E80D06'];

//makes the grid
var grid = [];
for (var hor = 0; hor < 24; hor++){ // vertical diff notes  
    grid[hor] = [];
    for (var vert = 0; vert < 22; vert++){ // horizontal different time
        var rect = new fabric.Rect({
            left: 28*hor+16,
            top: 28*vert+16,
            fill: defaultColor,
            opacity: 0.75,
            width: 23,
            height: 23,
            selectable: false,
            rx: 2,
            ry: 2,
            selected: 0,
            row: vert%7
            });
        grid[hor][vert] = rect;
            
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
                e.target.opacity = 0.75;
                canvas.renderAll();
            }else{
                e.target.opacity = 0.75;
                canvas.renderAll();
            }
        }
    }
});
//this.__canvases.push(canvas);

var i = 0; 
function timeout(){ //makes selected blocks glow on a timer
    setTimeout(function (){
        if (i > grid.length-1){
            i = 0;
        }
        for(var j = 0; j<grid[i].length; j++){
            if (grid[i][j].selected == 1){
                grid[i][j].opacity = 1;
            }
        }
        i++;        
        canvas.renderAll();
        setTimeout(turnoff, 250);
        timeout();
    }, 500);
}
timeout();

function turnoff(){
    for(var j = 0; j<grid[i-1].length; j++){
        grid[i-1][j].opacity = 0.75;
    }
    canvas.renderAll();
}