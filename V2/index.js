const express = require("express");
const cors = require("cors");
// const multer = require("multer");
const app = express();
// const upload = multer();

const arr = [
    { "id": 0, "name": "arsham", "uni": "sbu", "field": "stat" },
    { "id": 1, "name": "mamad", "uni": "tehran", "field": "maths" },
    { "id": 2, "name": "ali", "uni": "sut", "field": "cs" },
    { "id": 3, "name": "hasan", "uni": "khawrazmee", "field": "ce" },
    { "id": 4, "name": "hosein", "uni": "sbu", "field": "ee" },
]

const addToArr = function (name, uni, field) {
    arr.push({ "id": arr.length, "name": name, "uni": uni, "field": field });
}

const flushArr = function () {
    for (let obj of arr) {
        console.log(obj.name, obj.uni, obj.field);
    }
}

const updateArr = function (id, newName, newUni, newField) {
    arr.splice(id, 1, {"id": parseInt(id), "name": newName, "uni": newUni, "field": newField});
}

const delStudent = function (id) {
    arr.splice(id, 1);
    const func = (e) => e.id > id ? e.id-- : null;
    arr.forEach(func);
}

app.use(cors());
// app.use(upload.none());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res) => {
//     console.dir(req);
//     // res.send("hello");
// });

app.get("/", (req, res) => {
    flushArr();
    res.send(JSON.stringify(arr));
})

app.get("/:id", (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    // console.log(id);
    const wantedElement = arr.find(element => element.id == id);
    // console.log(wantedElement);
    res.send(JSON.stringify(wantedElement));
})

app.put("/", (req, res) => {
    const { id, newName, newUni, newField } = req.body;
    // const oldElement = arr.find(element => element.id == id);
    console.log(id, newName, newUni, newField);
    // console.log(oldElement);
    updateArr(id, newName, newUni, newField);
    // console.log(oldElement)
    res.send()
    console.log(arr)
})

app.post("/", (req, res) => {
    // console.dir(req);
    console.log(req.body);
    const { name, uni, field } = req.body;
    addToArr(name, uni, field);
    res.send("student added");
    console.log(arr);
});

app.delete("/:id", (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    res.send("delete");
    delStudent(id);
});

app.listen(3000, () => {
    console.log("listening on port 3000...");
});