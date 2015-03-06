var canvas = new fabric.Canvas('canvas');
canvas.selection = false;
canvas.hoverCursor = "pointer";

//22 vertical boxes (22 notes, 3 octaves & 4 tonics)
//24 horizontal boxes (6 measures of 4/4)

for (var hor = 0; hor < 24; hor++){ // vertical diff notes
    for (var vert = 0; vert < 22; vert++){ // horizontal different time
        var rect = new fabric.Rect({
            left: 28*hor+1,
            top: 28*vert+1,
            fill: '#E6E6E6',
            width: 23,
            height: 23,
            selected: 0
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
                e.target.fill = '#666666';
                e.target.selected = 1;
                canvas.renderAll();
            }else{
                e.target.fill = '#E6E6E6';
                e.target.selected = 0;
                canvas.renderAll();
            }
        }
    },
    'mouse:over': function(e){ //color when you hover over a square
        if(e.target){
            if (e.target.selected == 0){
                e.target.setFill('#DAFFB5');
                canvas.renderAll();
            }
            else{
                e.target.setFill('#007A00');
                canvas.renderAll();
            }
        }
    },
    'mouse:out': function(e){ //color when you're done hovering over a square
        if(e.target){
            if (e.target.selected == 0){
                e.target.setFill('#E6E6E6');
                canvas.renderAll();
            }else{
                e.target.setFill('#666666');
                canvas.renderAll();
            }
        }
    }
});
this.__canvases.push(canvas);


