function f(x) {
return 2*x - Math.tan(x);
}
function visualize() {
    let values = [];
    for (let x = -5; x < 5; x += 0.1) {
    values.push({y: f(x), x: x});
    }
    let canvas = document.getElementById("function-canvas");
    let ctx = canvas.getContext("2d");

    values.toReversed();

    let maxX = 10;

    let pixelPerX = 300 / 20;
    let pixelPerY = 300 / 10;

    for (let i = 0; i < values.length; i++) {
        if (i == values.length -1) {
        return;
        }
        let coords1 = values[i];
        let coords2 = values[i+1];
        let xStart = coords1.x;
        if (xStart <= 0) {
        xStart = 10 + (-1 * xStart);
        }
        let yStart = coords1.y;
        if (yStart <= 0) {
            yStart = 10 + (-1 * yStart);
        }
        let xEnd = coords2.x;
        if (xEnd <= 0) {
            xEnd = 10 + (-1 * xEnd);
        }
        let yEnd = coords2.y;
        if (yEnd <= 0) {
            yEnd = 10 + (-1 * yEnd);
        }
        if (Math.abs(coords2 - coords1) > -10 && Math.abs(coords2 - coords1) < 10) {
        continue;
        }
        ctx.beginPath();
        ctx.moveTo(values[i].x * 2 + 100, values[i].y * 2 );
        ctx.lineTo(values[i + 1].x * 2 + 100, values[i + 1].y * 2 );
        ctx.stroke();
    }
}

