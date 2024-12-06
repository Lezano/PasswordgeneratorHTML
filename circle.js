function calculate(){
    let radius=document.getElementById("radius").value;

    let area=Math.PI*radius*radius;
    let circumference=2*Math.PI*radius;


    document.getElementById("area").innerHTML = "area:" + area.toFixed(2);
    document.getElementById("circumference").innerHTML = "circumference:" + circumference.toFixed(2);
}