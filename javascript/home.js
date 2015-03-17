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

var sound1c = new Howl({
    urls: ['./mp3s/note1-c.mp3']
});
var sound2c = new Howl ({
    urls: ['./mp3s/note2-c.mp3']
});
var sound3c = new Howl ({
    urls: ['./mp3s/note3-c.mp3']
});
var sound4c = new Howl ({
    urls: ['./mp3s/note4-c.mp3']
});
var sound5c = new Howl ({
    urls: ['./mp3s/note5-c.mp3']
});
var sound6c = new Howl ({
    urls: ['./mp3s/note6-c.mp3']
});
var sound7c = new Howl ({
    urls: ['./mp3s/note7-c.mp3']
});
var sound8c = new Howl ({
    urls: ['./mp3s/note8-c.mp3']
});
var sound9c = new Howl ({
    urls: ['./mp3s/note9-c.mp3']
});
var sound10c = new Howl ({
    urls: ['./mp3s/note10-c.mp3']
});
var sound11c = new Howl ({
    urls: ['./mp3s/note11-c.mp3']
});
var sound12c = new Howl ({
    urls: ['./mp3s/note12-c.mp3']
});
var sound13c = new Howl ({
    urls: ['./mp3s/note13-c.mp3']
});
var sound14c = new Howl ({
    urls: ['./mp3s/note14-c.mp3']
});
var sound15c = new Howl ({
    urls: ['./mp3s/note15-c.mp3']
});
var sound16c = new Howl ({
    urls: ['./mp3s/note16-c.mp3']
});
var sound17c = new Howl ({
    urls: ['./mp3s/note17-c.mp3']
});
var sound18c = new Howl ({
    urls: ['./mp3s/note18-c.mp3']
});
var sound19c = new Howl ({
    urls: ['./mp3s/note19-c.mp3']
});
var sound20c = new Howl ({
    urls: ['./mp3s/note20-c.mp3']
});
var sound21c = new Howl ({
    urls: ['./mp3s/note21-c.mp3']
});
var sound22c = new Howl ({
    urls: ['./mp3s/note22-c.mp3']
});

var soundArray = [sound22c, sound21c, sound20c, sound19c, sound18c, sound17c, sound16c, sound15c, sound14c, sound13c, sound12c, sound11c, sound10c, sound9c, sound8c, sound7c, sound6c, sound5c, sound4c, sound3c, sound2c, sound1c];

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
function timeout(){ //makes selected blocks glow on a timer & makes them play a note
    setTimeout(function (){
        if (i > grid.length-1){
            i = 0;
        }
        for(var j = 0; j<grid[i].length; j++){
            if (grid[i][j].selected == 1){
                grid[i][j].opacity = 1;
                soundArray[j].stop().play();
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