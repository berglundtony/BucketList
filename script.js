let activities = [];

function clearBucketList() {
    const bucketLists = document.getElementById("bucketLists");
    bucketLists.innerHTML = "";
    activities = [];
    setLocalStorageItems(activities);
    console.log("Listan har rensats!");
}

function handleCheckboxChange(index, event) {
    console.log(event.target.checked);
    activities[index].status = event.target.checked;
    setLocalStorageItems(activities);
}

function deleteItem(index) {
    setLocalStorageItems(activities);
    activities.splice(index, 1);
    setLocalStorageItems(activities);
    renderBucketList();
}

function getLocalStorageItems() {
    const jsonFromStorage = localStorage.getItem('ActivitySave');
    // Returnerar Object Array från json, om de har värden annars tom array
    return jsonFromStorage ? JSON.parse(jsonFromStorage) : [];
}

function setLocalStorageItems(activities) {
    localStorage.setItem('ActivitySave', JSON.stringify(activities));
}

function renderBucketList() {
    activities = getLocalStorageItems();
    // Sortera aktiviteter.
    activities.sort((a, b) => {
        const sortByCategory = a.category.localeCompare(b.category);
        if (sortByCategory !== 0) return sortByCategory;
        const sortByActivityName = a.name.localeCompare(b.name);
        if (sortByActivityName !==0) return sortByActivityName;
    });

    // Rendera listan
    const theBucketList = document.getElementById('bucketLists');
    theBucketList.innerHTML = "";

    const buttonWrapper = document.createElement('div');
    buttonWrapper.setAttribute('class', 'buttonWrapper');

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Radera lista';
    clearButton.setAttribute('id', 'clearbutton')
    const ul = document.createElement('ul');
    // Kategori
    const printedCategories = new Set();
    console.log("Innehållet i listan:");
    activities.forEach((item, index) => {
        console.log(`${index + 1}: ${item.name} (${item.category})`);
        // Kontrollera om kategorin redan har skrivits ut
        if (!printedCategories.has(item.category)) {
            printedCategories.add(item.category);
            // Skapa en rubrik för kategorin
            const categoryHeader = document.createElement('h4');
            const span = document.createElement('span');
            categoryHeader.textContent = `Kategori: `;
            span.setAttribute('class', 'category');
            span.textContent = `${item.category}`
            ul.appendChild(categoryHeader);
            categoryHeader.appendChild(span)
        }

        //Skapa en checkbox
        const labelStatus = document.createElement('label');
        labelStatus.setAttribute('class', 'labelstatus');
        labelStatus.textContent = 'Status:';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.status;
        checkbox.setAttribute('Id', 'status');
        checkbox.setAttribute('name', 'status');
        checkbox.addEventListener('change', (event) => {
            handleCheckboxChange(index, event);
        });

        //Skapa etikett och radera knapp
        const label = document.createElement('label');
        label.textContent = `${item.name}`;
        const li = document.createElement('li');
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'content-wrapper';
        contentWrapper.appendChild(labelStatus);
        contentWrapper.appendChild(checkbox);
        contentWrapper.appendChild(label);

        //Button
        const button = document.createElement('button');
        button.type = 'button'
        button.textContent = 'Delete'
        button.addEventListener('click', () => deleteItem(index));
        li.appendChild(contentWrapper);
        li.appendChild(button);
        ul.appendChild(li);

    });
    theBucketList.appendChild(ul);
    theBucketList.appendChild(buttonWrapper);
    buttonWrapper.appendChild(clearButton);
    clearButton.addEventListener('click', () => clearBucketList());
};

// Formulärhantering
const bucketForm = document.getElementById('bucketForm');
const elBucketName = document.getElementById('activityName');
const elSelectedCategory = document.getElementById('activityCategory');


bucketForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const activity = {
        name: elBucketName.value.trim(),
        category: elSelectedCategory.value,
        status: false
    };

    if (activity.name) {
        activities.push(activity);
        console.log(activities);
        setLocalStorageItems(activities);
        bucketForm.reset();
        renderBucketList();
    }

});

// Kör funktionen när sidan laddas
window.onload = () => {
    // clearBucketList();
    activities = getLocalStorageItems();
    renderBucketList();

};