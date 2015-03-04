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
            height: 23
            });
            
        rect.hasControls = rect.hasBorders = false;
        rect.lockRotation = rect.lockScalingX = rect.lockScalingY = true;
        rect.lockMovementX = rect.lockMovementY = true;

        canvas.add(rect);
    
    }
}

