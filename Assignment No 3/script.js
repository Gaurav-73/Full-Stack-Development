function studdata() {

    let name = document.getElementById("name").value;
    let science = Number(document.getElementById("science").value);
    let math = Number(document.getElementById("math").value);
    let english = Number(document.getElementById("english").value);

    let total = science + math + english;
    let percentage = (total) / 3;

    let table = document.getElementById("stable");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = science;
    row.insertCell(2).innerHTML = math;
    row.insertCell(3).innerHTML = english;
    row.insertCell(4).innerHTML = total;
    row.insertCell(5).innerHTML = percentage.toFixed(2) + "%";

    
    document.getElementById("name").value = "";
    document.getElementById("science").value = "";
    document.getElementById("math").value = "";
    document.getElementById("english").value = "";

}