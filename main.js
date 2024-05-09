Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img src="+data_uri+" id='captureImage'>";
    });
}

console.log("ml5 version : ",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Rri-ilatd/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}
var prediction1="";

function speak(){
    var synth=window.speechSynthesis;
    speakdata1="The first prediction is " + prediction1;
    var utterthis=new SpeechSynthesisUtterance(speakdata1);
    synth.speak(utterthis);
}

function predictEmotion(){
    capturedImage=document.getElementById("captureImage");
    classifier.classify(capturedImage,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("emotion_name_1").innerHTML=results[0].label;
        prediction1=results[0].label;

        if(prediction1=="best"){
            document.getElementById("emoji_1").innerHTML="&#128077;";
        }
        if(prediction1=="amazing"){
            document.getElementById("emoji_1").innerHTML="&#128076;";
        }
        if(prediction1=="victory"){
            document.getElementById("emoji_1").innerHTML="&#9996;";
        }
    }
}