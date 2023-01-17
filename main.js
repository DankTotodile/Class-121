function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}
function modelLoaded()
{
  console.log("Model has been loaded");
}
function draw()
{
image(video, 0, 0, 300, 300);
classifier.classify(video, gotResults);
}
function gotResults(error, results)
{
  if(error)
  {
    console.error(error);
  }
  else
  {
    pr = ""
    if(results[0].confidence > 0.5 && pr != results[0].label)
    {
      pr = results[0].label;
      document.getElementById("object").innerHTML = results[0].label;
      p = Math.floor(results[0].confidence*100);
      document.getElementById("accuracy").innerHTML = p+" %";
      synth = window.speechSynthesis;
      speak_data = "The object is "+pr;
      UtterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(UtterThis);
    }
  }
}


