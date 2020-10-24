function getTempTextFromId(id) {
  switch(id){
    case "gk":
      return "Kaleci";
    case "f1-r":
      return "Sağ Bek";
    case "f1-m":
      return "Stoper";
    case "f1-l":
      return "Sol Bek";
    case "f2-r":
      return "Ofansif Sağ Bek";
    case "f2-m":
      return "Orta Saha";
    case "f2-l":
      return "Ofansif Sol Bek";
    case "f3-r":
      return "Sağ Kanat";
    case "f3-m":
      return "Ofansif Orta Saha";
    case "f3-l":
      return "Sol Kanat";
    case "f4-r":
      return "Sağ Forvet";
    case "f4-m":
      return "Santrafor";
    case "f4-l":
      return "Sol Forvet";
  }
}
function onDragStart(event) {
  console.log("onDragStart");
  event.dataTransfer.setData("text/plain", event.target.id);
}

function onDragOver(event) {
  console.log("onDragOver");
  event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  
  var pElemId = event.currentTarget.id+"_tempPId";
  if(!document.getElementById(pElemId)){
    var pElem = document.createElement("p");
    var node = document.createTextNode(getTempTextFromId(event.currentTarget.id));
    pElem.appendChild(node);
    pElem.id = pElemId;
    pElem.style.position = "absolute";
    pElem.style.top = "50%";
    pElem.style.left = "50%";
    pElem.style.transform = "translate(-50%, -50%)";
    pElem.style.textShadow = "2px 2px black";
    pElem.style.family = "Courier New"
    pElem.style.fontSize = "xx-large"
    pElem.style.color = "rgba(255, 255, 255, 0.8)"
    event.currentTarget.appendChild(pElem);
  }
  
  event.preventDefault();
}

function onDragLeave(event) {
  console.log("onDragOver");
  event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0)";
  var pElemId = event.currentTarget.id+"_tempPId";
  var pElem = document.getElementById(pElemId)
  if(pElem){
    event.currentTarget.removeChild(pElem);
  }
  event.preventDefault();
}

function onDrop(event) {
  console.log("onDrop");
  event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0)";
  var pElemId = event.currentTarget.id+"_tempPId";
  var pElem = document.getElementById(pElemId)
  if(pElem){
    event.currentTarget.removeChild(pElem);
  }
  const id = event.dataTransfer.getData("text");

  const draggableElement = document.getElementById(id);

  const dropzone = event.target;

  dropzone.appendChild(draggableElement);

  event.dataTransfer.clearData();
}

