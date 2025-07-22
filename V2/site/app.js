function read() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000");
    req.send();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            const objects = JSON.parse(this.responseText);
            let newRow = '';
            for (object of objects) {
                // console.log(object.id);
                newRow += `<tr id="${object.id}">`;
                newRow += `<td> ${object.name} </td>`;
                newRow += `<td> ${object.uni} </td>`;
                newRow += `<td> ${object.field} </td>`;
                newRow += `<td><button onclick="showEdit(${object.id})">Edit</button></td>`;
                newRow += `<td><button onclick="deleteRow(${object.id})">Delete</button></td>`;
                newRow += `</tr>`;
            }
            const table = document.getElementById("myTable").innerHTML = newRow;
        }
    }
}
read();

function clearForm(form) {
    for (input of form) {
        input.value = "";
    }
}

const form = document.querySelector("form");
function create() {
    const name = document.getElementById("name").value;
    const uni = document.getElementById("uni").value;
    const field = document.getElementById("field").value;
    // console.log(typeof (name));
    // console.log(parseInt(name));
    // console.log(parseInt(name) === String(name) || parseInt(name) !== NaN);
    if (!name || !uni || !field) {
        alert("fill the fileds");
        return;
    } else if (parseInt(name) || parseInt(uni) || parseInt(field)) {
        alert("input not valid");
        return;
    } else {
        clearForm(form);
    }

    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3000");
    req.setRequestHeader("content-type", "application/json");
    req.send(JSON.stringify({
        "name": name,
        "uni": uni,
        "field": field,
    }));
    req.onreadystatechange = function (e) {
        e.preventDefault();
        if (this.readyState == 4 && this.status == 200) {
            read();
        }
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    create();
})

function showEdit(id) {
    const req = new XMLHttpRequest();
    req.open("GET", `http://localhost:3000/${id}`);
    req.send()
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            const object = JSON.parse(this.responseText);
            // console.log("the object is", object);
            const nameInput = document.querySelector("#edit_form #name");
            const uniInput = document.querySelector("#edit_form #uni");
            const fieldInput = document.querySelector("#edit_form #field");
            const editButton = document.querySelector("#edit_form button")

            if (nameInput.hasAttribute("hidden")) {
                nameInput.value = `${object.name}`;
                uniInput.value = `${object.uni}`;
                fieldInput.value = `${object.field}`;
                nameInput.removeAttribute("hidden");
                uniInput.removeAttribute("hidden");
                fieldInput.removeAttribute("hidden");
                editButton.removeAttribute("hidden");
                editButton.addEventListener("click", () => {
                    nameInput.setAttribute("hidden", "");
                    uniInput.setAttribute("hidden", "");
                    fieldInput.setAttribute("hidden", "");
                    editButton.setAttribute("hidden", "");

                    edit(id, nameInput.value, uniInput.value, fieldInput.value);
                });
            } else {
                alert("first submit current changes!");

            }
        }
    }
}

function edit(id, newName, newUni, newField) {
    const req = new XMLHttpRequest();
    req.open("PUT", "http://localhost:3000");
    req.setRequestHeader("content-type", "application/json");
    req.send(JSON.stringify({
        "id": id,
        "newName": newName,
        "newUni": newUni,
        "newField": newField,
    }));
    req.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            read();
        }
    }
}

function deleteRow(id) {
    const req = new XMLHttpRequest();
    req.open("DELETE", `http://localhost:3000/${id}`);
    req.setRequestHeader("content-type", "application/json");
    req.send();
    req.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            read();
        }
    }
}