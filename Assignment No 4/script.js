function addNote(){
let title=document.getElementById("title").value;
let note=document.getElementById("note").value;

if(title==""||note==""){
alert("Please enter title and note");
return;
}

let div=document.createElement("div");
div.className="note-card";

div.innerHTML="<h3>"+title+"</h3>"+
"<p>"+note+"</p>"+
"<button class='delete' onclick='deleteNote(this)'>Delete</button>";

document.getElementById("notes").appendChild(div);

document.getElementById("title").value="";
document.getElementById("note").value="";
}


function deleteNote(button){
button.parentElement.remove();
}