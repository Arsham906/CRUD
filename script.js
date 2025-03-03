var myArray = [
    {'sn':'232646642', 'name':'mamad', 'fn':'asghar nezhad',
    'uni':'CLS', 'sf':'Civil Rights', 'dob':'1954-1-4'}
    ];
    
    
const formEl = document.querySelector("form");
const tableEL = document.querySelector('table');

formEl.addEventListener("submit", onAddStudent);
tableEL.addEventListener("click", onDeleteBtn);
addTable(myArray)
    
function Student(sn, name, fn, uni, sf, dob){
    this.sn = sn;
    this.name = name;
    this.fn = fn;
    this.uni = uni;
    this.sf = sf;
    this.dob = dob;
}

function addTable(data){
    for (let i = 0; i < data.length; i++){
        let row = ` <tr>
                        <td>${data[i].sn}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].fn}</td>
                        <td>${data[i].uni}</td>
                        <td>${data[i].sf}</td>
                        <td>${data[i].dob}</td>
                        <td><button class="deleteBtn">Delete</button></td>
                    </tr>`;
        tableEL.innerHTML += row;
    };
}

function onAddStudent(e){
    e.preventDefault();

    var sn = document.getElementById("sn").value;
    var fn = document.getElementById("fn").value;
    var ln = document.getElementById("ln").value;
    var u = document.getElementById("u").value;
    var fos = document.getElementById("fos").value;
    var dob = document.getElementById("dob").value;

    if (sn && fn && ln && u && fos && dob){
        let student = new Student(sn, fn, ln, u, fos, dob);
        myArray.push(student)
        addTable([student]);
        formEl.reset()
    } else{
        alert("fill out all the fileds")
    }
}

function onDeleteBtn(e){
    if(!e.target.classList.contains('deleteBtn'))
    {
        return;
    }

    e.target.closest('tr').remove();
}