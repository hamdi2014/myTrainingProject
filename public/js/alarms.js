
const boxNo = document.getElementById('boxNo');
const lampNo = document.getElementById('lampNo');
const section = document.getElementById('section');
const sectionList  = ['Turbine', 'Boiler', 'Electric', 'Aux Equipments', 'Common'];

for (let i = 1; i <= 100; i++) {
    const opt = document.createElement('option');
    opt.innerText = i;
    boxNo.appendChild(opt);
};

for (let i = 1; i <= 8; i++) {
    const opt = document.createElement('option');
    opt.innerText = i;
    lampNo.appendChild(opt);
};

for (let i = 0; i <= sectionList.length-1; i++) {
    const opt = document.createElement('option');
    opt.innerText = sectionList[i];
    opt.value = sectionList[i].toLowerCase();
    section.appendChild(opt);
};

document.getElementById('clear').onclick = function() {
    document.getElementById('add-form').reset();
};

const form = document.getElementById("add-form");
 
form.addEventListener("submit", async(e) => {
    alert('Data successfully saved!')
})

//     const title = document.getElementById('title').value;
//     const kind = document.getElementById('kind').value;
//     const boxNo = document.getElementById('boxNo').value;
//     const lampNo = document.getElementById('lampNo').value;
//     const description = document.getElementById('description').value;
//     const section = document.getElementById('section').value;
//     const system = document.getElementById('system').value;
//     const device = document.getElementById('device').value;
//     const sensor = document.getElementById('sensor').value;
//     const limit = document.getElementById('limit').value;
//     const causes = document.getElementById('causes').value;
//     const reqActions = document.getElementById('reqActions').value;

//     e.preventDefault();

//     const formData = {
//         title,
//         kind,
//         boxNo,
//         lampNo,
//         description,
//         section,
//         system,
//         device,
//         sensor,
//         limit,
//         causes,
//         reqActions
//     };
//     alert(formData);
//     await fetch('http://localhost:3000/alarms/add', {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
// });

document.getElementById("frm").className += " load";