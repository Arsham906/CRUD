
function showData(objects) {
    let newRow = '';
    for (object of objects) {
        // console.log(typeof(object._id));
        newRow += `<tr id="${object._id}">`;
        newRow += `<td> ${object.name} </td>`;
        newRow += `<td> ${object.uni} </td>`;
        newRow += `<td> ${object.field} </td>`;
        newRow += `<td><div class="btn-group"><button class="btn btn-info" onclick="showEdit('${object._id}')">Edit</button>`;
        newRow += `<button class="btn btn-danger" onclick="deleteRow('${object._id}')">Delete</button></div></td>`;
        newRow += `</tr>`;
    }
    const table = document.getElementById("myTable").innerHTML = newRow;
}

function read() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:8080");
    req.send();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            const objects = JSON.parse(this.responseText);
            showData(objects)
        }
    }
}
// read();

function clearForm(form) {
    for (input of form) {
        input.value = "";
    }
}


const form = document.querySelector("form");
function create() {
    const nameElement = document.getElementById("name");
    const uniElement = document.getElementById("uni");
    const fieldElement = document.getElementById("field");
    nameElement.classList.remove("is-invalid");
    uniElement.classList.remove("is-invalid");
    fieldElement.classList.remove("is-invalid");
    const name = nameElement.value;
    const uni = uniElement.value;
    const field = fieldElement.value;
    // console.log(typeof (name));
    // console.log(parseInt(name));
    // console.log(parseInt(name) === String(name) || parseInt(name) !== NaN);
    if (!name || !uni || !field) {
        const elements = [nameElement, uniElement, fieldElement];
        for (element of elements) {
            if (!element.value) {
                element.classList.add("is-invalid");
            }
        }
        alert("fill the fileds");
        return;
    } else if (parseInt(name) || parseInt(uni) || parseInt(field)) {
        const elements = [nameElement, uniElement, fieldElement];
        for (element of elements) {
            if (parseInt(element.value)) {
                element.classList.add("is-invalid");
            }
        }
        alert("input not valid");
        return;
    } else {
        clearForm(form);
    }

    const req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080");
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
    // const id = obj._id;
    // console.log(id);
    console.log(id);
    const req = new XMLHttpRequest();
    req.open("GET", `http://localhost:8080/${id}`);
    req.send()
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            const object = JSON.parse(this.responseText);
            console.log("the object is", object);
            const id = document.querySelector("#id");
            const nameInput = document.querySelector("#new_name");
            const nameLabel = nameInput.nextElementSibling;
            // nameLabel.removeAttribute("hidden");
            // console.dir(nameLabel);
            const uniInput = document.querySelector("#new_uni");
            const uniLabel = uniInput.nextElementSibling;
            const fieldInput = document.querySelector("#new_field");
            const fieldLabel = fieldInput.nextElementSibling;
            const editButton = document.querySelector("#edit_form button")

            console.dir(nameInput);

            if (nameInput.hasAttribute("hidden")) {
                id.value = `${object[0]._id}`;
                nameInput.value = `${object[0].name}`;
                uniInput.value = `${object[0].uni}`;
                fieldInput.value = `${object[0].field}`;
                nameInput.removeAttribute("hidden");
                nameLabel.removeAttribute("hidden");
                uniInput.removeAttribute("hidden");
                uniLabel.removeAttribute("hidden");
                fieldInput.removeAttribute("hidden");
                fieldLabel.removeAttribute("hidden");
                editButton.removeAttribute("hidden");
                editButton.onclick = () => {
                    nameInput.setAttribute("hidden", "");
                    nameLabel.setAttribute("hidden", "");
                    uniInput.setAttribute("hidden", "");
                    uniLabel.setAttribute("hidden", "");
                    fieldInput.setAttribute("hidden", "");
                    fieldLabel.setAttribute("hidden", "");
                    editButton.setAttribute("hidden", "");
                    console.log(id.value, nameInput.value, uniInput.value, fieldInput.value);
                    edit(id.value, nameInput.value, uniInput.value, fieldInput.value);
                }
            } else {
                alert("first submit current changes!");

            }
        }
    }
}

function edit(id, newName, newUni, newField) {
    const req = new XMLHttpRequest();
    req.open("PUT", "http://localhost:8080");
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
    req.open("DELETE", `http://localhost:8080/${id}`);
    req.setRequestHeader("content-type", "application/json");
    req.send();
    req.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            read();
        }
    }
}

function chackValidation(fieldList) {
    for (field of fieldList) {
        if (field.classList.contains("is-invalid")) {
            field.classList.remove("is-invalid");
        }

        if (!field.value || field.value == "NULL") {
            alert("fill the fields");
            field.classList.add("is-invalid");
            return false;
        }
    }
    return true;
}

const filterBtn = document.querySelector("#filter_button");
const removeFilterBtn = document.querySelector("#remove_filter_button");
function filter() {
    const filterOpt = document.querySelector("#filter_on");
    const search = document.querySelector("#search");
    // console.dir(filterBtn);
    if (!chackValidation([filterOpt, search])) return;

    const filterOptValue = filterOpt.value;
    const searchValue = search.value;
    const tagsArr = searchValue.split(",");
    console.log(tagsArr);
    let queryString = "";
    for (tag of tagsArr){
        queryString += `values=${tag}&`;
    }
    // console.log(queryString);

    const req = new XMLHttpRequest();
    req.open("GET", `http://localhost:8080?${queryString}key=${filterOptValue}`);
    req.send();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            showData(objects)
        }
    }
}

filterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filter();
})
removeFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearForm(document.querySelector("#filter_form"));
    read();
})

window.onload = () => {
    read();
}