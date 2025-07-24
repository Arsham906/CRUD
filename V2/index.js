const express = require("express");
const cors = require("cors");
const app = express();
const { mongoGCPError } = require("mongodb");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/crud")
    .then(() => {
        console.log("CONNECTION OPEN!");
    })
    .catch(e => {
        console.log("ERROR!!!");
        console.log(e);
    })

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    uni: {
        type: String,
        required: true,
        maxlength: 50
    },
    field: {
        type: String,
        required: true,
        maxlength: 50
    }
})

const Student = mongoose.model("Student", studentSchema);

const newStudent = (name, uni, field) => {
    const s = new Student({
        name: name,
        uni: uni,
        field: field
    });
    s.save();
}


const findStudent = async (filter = {}) => {
    let result;
    await Student.find(filter).then((d) => {
        // console.log(d);
        result = d;
    });
    // console.log(result);
    return result;
}

const updateStudent = async (filter, update) => {
    const result = await Student.updateOne(filter, update);
}

const deleteStudent = async (filter) => {
    const result = await Student.deleteOne(filter);
    return result;
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    let students;
    await findStudent().then((d) => {
        students = d;
        // console.log(d);
        // console.log(students);
    });
    // console.log(students);
    res.send(JSON.stringify(students));
})

app.get("/:id", async (req, res) => {
    console.log("in getID");
    console.log(req.params);
    const { id } = await req.params;
    console.log(id);
    // console.log(req.params);
    let result;
    await findStudent({ _id: id }).then((d) => {
        result = d;
        // console.log(d);
    });
    console.log(result);
    res.send(JSON.stringify(result));
})

app.put("/", (req, res) => {
    console.log("in put");
    const { id, newName, newUni, newField } = req.body;
    console.log(id, newName, newUni, newField);
    updateStudent({ _id: id }, { name: newName, uni: newUni, field: newField });
    res.send()
})

app.post("/", (req, res) => {
    // console.dir(req);
    console.log(req.body);
    const { name, uni, field } = req.body;
    newStudent(name, uni, field);
    res.send("student added");
});

app.delete("/:id", (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    console.log(id);
    deleteStudent({_id: id});
    res.send("delete");
});

app.listen(8080, () => {
    console.log("listening on port 8080...");
});