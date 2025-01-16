let activities = [];

function clearBucketList() {
    const bucketLists = document.getElementById("bucketLists");
    bucketLists.innerHTML = "";
    activities = [];
    console.log("Listan har rensats!");
}
// Kör funktionen när sidan laddas
window.onload = () => {
    clearBucketList();
};

function handleCheckboxChange(index) {
    activities[index].status = !activities[index].status;
}

function renderTheBucketList() {
    activities.sort((a, b) => a.category.localeCompare(b.category));
    const theBucketList = document.getElementById('bucketLists');
    // Töm tidigare innehåll
    theBucketList.innerHTML = "";

    const ul = document.createElement('ul');
    const labelStatus = document.createElement('label');
    labelStatus.setAttribute('class', 'labelstatus');
    theBucketList.appendChild(labelStatus);
    theBucketList.appendChild(ul);
    labelStatus.textContent = 'Klar:';

    console.log("Innehållet i listan:");
    activities.forEach((item, index) => {
        console.log(`${index + 1}: ${item.activityName} (${item.category})`);
        //Skapa en checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.status;
        checkbox.setAttribute('Id', 'status');
        checkbox.setAttribute('name', 'status');
        checkbox.addEventListener('change', () => handleCheckboxChange(index)); 
   
        //Skapa etikett
        const label = document.createElement('label');
        label.textContent = `${item.activityName} Kategori: ${item.category}`;

        const li = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'delete'
        button.textContent = 'Delete'
        button.addEventListener('click', () => deleteItem(index)); 
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(button);
        ul.appendChild(li);
    });
    console.log("Ul-element:", ul.outerHTML); 
}
function deleteItem(index){
    activities.splice(index, 1);
    renderTheBucketList();
}

function clearBucketList() {
    const bucketLists = document.getElementById('bucketLists');
    bucketLists.innerHTML = "";
    activities = [];
    console.log("Listan har rensats!");
}
// Kör funktionen när sidan laddas
window.onload = () => {
    clearBucketList();
};



// Formulärhantering
const bucketForm = document.getElementById('bucketForm');
const selectBox = document.getElementById('activityCategory');


bucketForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const bucketName = document.getElementById('activityName').value.trim();
    const selectedValue = document.getElementById('activityCategory').value

    if (bucketName) {
        activities.push({ activityName: bucketName, category: selectedValue, status:false });
    }


    // Töm input-fältet
    document.getElementById("activityName").value = "";
    document.getElementById('activityCategory').selectedIndex = 0;
    // document.getElementById('bucketForm').reset();
    renderTheBucketList();
});
renderTheBucketList();



