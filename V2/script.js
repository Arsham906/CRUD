let arr = [
    {'id': 0, 'name': 'Arsham', 'sn': 123},
    {'id': 1, 'name': 'jafar', 'sn': 124},
    {'id': 2, 'name': 'mamd', 'sn': 126},
    {'id': 3, 'name': 'javad', 'sn': 129},
]

let button = document.querySelector('form')
let tableRow = document.querySelector('table');
button.addEventListener('submit', (event) => {
    event.preventDefault()
    addRow();
});

let ctr = 0;
function addRow()
{
    if(ctr < arr.length)
    {
        tableRow.innerHTML += 
            `<tr>
                <td>${arr[ctr]['id']}</td>
                <td>${arr[ctr]['name']}</td>
                <td>${arr[ctr]['sn']}</td>
            </tr>`;
    }
    ctr += 1
}