function calculate(){
    let heightInput=document.getElementById("height");
    let widthInput=document.getElementById("width");

    let height=heightInput.value;
    let width=widthInput.value;

    let area=height*width;
    let perimeter=2*height+2*width;


    document.getElementById("area").innerHTML = "area: "+area.toFixed(2);
    document.getElementById("perimeter").innerHTML ="perimeter: "+ perimeter.toFixed(2);
}