const studentslist = document.querySelector("#students-list");
const form = document.querySelector("#add-students-form");


function renderstudent(element){
    let li = document.createElement('li');
    let Name = document.createElement('span');
    let Age = document.createElement('span');
    let Cross = document.createElement('Div');

    li.setAttribute('data-id', element.id);
    Name.textContent = element.data().Name;
    Age.textContent = element.data().Age;
    Cross.textContent = 'x';

    li.appendChild(Name);
    li.appendChild(Age);
    li.appendChild(Cross);

    studentslist.appendChild(li);

    //Deleting data
    Cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('students').doc(id).delete();
    })
}

// query getting data
// db.collection('students').where('Name','==','Jagan').get().then((snapshot) => {
//     snapshot.docs.forEach(element => {
//        renderstudent(element); 
//     });
// })

// query getting data
// db.collection('students').get().then((snapshot) => {
//     snapshot.docs.forEach(element => {
//        renderstudent(element); 
//     });
// })

// saving data
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    db.collection('students').add({
        Name: form.name.value,
        Age:form.age.value 
    })
    form.name.value='',
    form.age.value = '' 
})

// real-time listener
db.collection('students').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderstudent(change.doc);
        } else if (change.type == 'removed'){
            let li = studentslist.querySelector('[data-id=' + change.doc.id + ']');
            studentslist.removeChild(li);
        }
    });
});