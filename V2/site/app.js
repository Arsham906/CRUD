function read() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000");
    req.send();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            const objects = JSON.parse(this.responseText);
            let newRow = '';
            for (object of objects) {
                console.log(object.id);
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
// window.addEventListener("onload", () => {
//     read();
// })

function create() {
    const name = document.getElementById("name").value;
    const uni = document.getElementById("uni").value;
    const field = document.getElementById("field").value;

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

function showEdit(id) {
    const req = new XMLHttpRequest();
    req.open("GET", `http://localhost:3000/${id}`);
    req.send()
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            const object = JSON.parse(this.responseText);
            const lastChild = document.body.lastChild;
            let editForm = '';
            editForm += `<form action="#"> `;
            editForm += `<input id="id" value="${id}" type="hidden"> `;
            editForm += `<input id="newName" value="${object.name}"> `;
            editForm += `<input id="newUni" value="${object.uni}"> `;
            editForm += `<input id="newField" value="${object.field}"> `;
            editForm += `<button onclick="edit()">submit</button>`;
            editForm += `</form> `;
            const newForm = document.createElement("form");
            newForm.innerHTML = editForm;
            document.body.insertBefore(newForm, lastChild);
        }
    }
}

function edit() {
    const id = document.getElementById("id");
    const newName = document.getElementById("newName");
    const newUni = document.getElementById("newUni");
    const newField = document.getElementById("newField");

    const req = new XMLHttpRequest();
    req.open("PUT", "http://localhost:3000");
    req.setRequestHeader("content-type", "application/json");
    req.send(JSON.stringify({
        "id": id.value,
        "newName": newName.value,
        "newUni": newUni.value,
        "newField": newField.value,
    }));
    req.onreadystatechange = function (e) {
        // e.preventDefault();
        if (this.readyState == 4 && this.status == 200) {
            // id.remove();
            // newName.remove();
            // newUni.remove();
            // newField.remove();
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
        if(this.readyState == 4 && this.status == 200)
        {
            read();
        }
    }
}

// const myReq = new XMLHttpRequest()
// const submit = document.querySelector("form button");
// const table = document.querySelector("table");
// let deleteButtons;
// let data = [];


// myReq.onload = function () {
//     // console.log("onLoad")
//     const oldLength = data.length;
//     // console.log(JSON.parse(this.responseText));
//     data = JSON.parse(this.responseText);

//     for (let i = oldLength; i < data.length; i++) {
//         const tr = document.createElement("tr");
//         const name = document.createElement("td");
//         const uni = document.createElement("td");
//         const field = document.createElement("td");
//         const btn = document.createElement("button");
//         name.append(data[i].name);
//         uni.append(data[i].uni);
//         field.append(data[i].field);
//         tr.append(name);
//         tr.append(uni);
//         tr.append(field);
//         btn.textContent = "delete";
//         btn.id = "deleteBtn" + i;
//         tr.append(btn);
//         table.append(tr);
//     }
//     deleteButtons = document.querySelector("#deleteBtn1");
//     console.dir(deleteButtons);
// }

// myReq.onerror = function (err) {
//     console.log("onError", err);
// }

// submit.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("submitted");

//     const form = document.querySelector("form");
//     const formData = new FormData(form);
//     const req = new XMLHttpRequest();
//     req.open("POST", "http://localhost:3000/");
//     req.send(formData);

//     myReq.open("GET", "http://localhost:3000/");
//     myReq.send();

//     // console.dir(formData);
//     // console.dir(form);
// })

// // deleteButtons.addEventListener("click", () => {
// // })

// window.addEventListener("load", () => {
//     console.log("loaded");
//     myReq.open("GET", "http://localhost:3000/");
//     myReq.send();
//     deleteButtons.addEventListener("click", () => {
//         console.log("delete");
//     })
// })
