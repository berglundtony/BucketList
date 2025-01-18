let activities = [];

function getLocalStorageItems() {
    const jsonFromStorage = localStorage.getItem('ActivitySave');
    // Returnerar Object Array från json, om de har värden annars tom array
    return jsonFromStorage ? JSON.parse(jsonFromStorage) : [];
}
// Spara värde i local storage
function setLocalStorageItems(activities) {
    localStorage.setItem('ActivitySave', JSON.stringify(activities));
}
// Formuläret med submit funktion
function createBucketListForm() {
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
}
// Skapa element Bucketlist med tillhörande barnelement
function createBucketListWithChildren(ul, buttonWrapper) {
    const theBucketList = document.getElementById('bucketLists');
    theBucketList.innerHTML = "";
    theBucketList.appendChild(ul);
    theBucketList.appendChild(buttonWrapper);
}
// Skapa en wrapper för clearButton
function createClearButtonWrapper(clearButton) {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.setAttribute('class', 'buttonWrapper');
    buttonWrapper.appendChild(clearButton);
    return buttonWrapper;
}
// Skapa en knapp för att radera aktiviteterna i listan
function createClearButtonAndClickEvent() {
    const clearbtn = document.createElement('button');
    clearbtn.textContent = 'Radera aktiviteter';
    clearbtn.setAttribute('id', 'clearbutton');
    clearbtn.addEventListener('click', () => clearBucketList());
    return clearbtn;
}
// Ta bort alla aktiviteterna i listan
function clearBucketList() {
    const bucketLists = document.getElementById("bucketLists");
    const choice = confirm("Är det säkert att du vill radera alla aktiviteterna?");
    if (choice) {
        bucketLists.innerHTML = "";
        activities = [];
        setLocalStorageItems(activities);
        console.log("Listan har rensats!");
    }
}

// Sortera aktiviteter på kategori i första hand och i kategorin på aktivitetsnamnet.
function sortActivities(activities) {
    activities.sort((a, b) => {
        const sortByCategory = a.category.localeCompare(b.category);
        if (sortByCategory !== 0) return sortByCategory;
        const sortByActivityName = a.name.localeCompare(b.name);
        if (sortByActivityName !== 0) return sortByActivityName;
    });
}

// Skapa endast en rubrik per kategori
function createOneCategoryOfEach(printedCategories, item, ul) {
    // Kontrollera om kategorin redan har skrivits ut
    if (!printedCategories.has(item.category)) {
        printedCategories.add(item.category);
        // Skapa en rubrik för kategorin
        const categoryHeader = document.createElement('h4');
        categoryHeader.textContent = `${item.category}`
        ul.appendChild(categoryHeader);
    }
}

// Skapa en label för status
function createLabelStatus() {
    const lblStatus = document.createElement('label');
    lblStatus.setAttribute('class', 'toggle');
    return lblStatus
}
// Label ovanför checkboxen ändrar text vid knapp trycknigns event
function toggleEventListener(toggles) {
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const onOff = toggle.parentNode.querySelector('.onOff');
            onOff.textContent = toggle.checked ? 'Klar' : 'Status';
        });
    })
}

// Skapa ett span element för checkboxToggle
function createSpanOffForCheckbox() {
    const span = document.createElement('span');
    span.setAttribute('class', 'onOff')
    span.textContent = 'Status';
    return span;
}
// Skapa ytterligare ett span element för checkboxToggle
function createSpanSlider() {
    const spanSld = document.createElement('span');
    spanSld.setAttribute('class', 'slider round');
    return spanSld
}

// Skapa en checkbox för status
function createStatusCheckbox(item, index) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.status;
    checkbox.setAttribute('Id', `status`);
    checkbox.setAttribute('name', `status`);
    return checkbox;
}

// Gör ett eventListener på change status
function changeStatusCheckboxEvent(statusCheckbox, labelActivityName, index) {
    statusCheckbox.addEventListener('change', (event) => {
        // const onOff = document.getElementsByClassName('onOff');
        const onOff = statusCheckbox.parentNode.querySelector('.onOff');
        onOff.style.color = 'black;'
        onOff.textContent = statusCheckbox.checked ? 'Klar' : 'Status';
        activities[index].status = event.target.checked;
        activities[index].status == true ?
            labelActivityName.setAttribute('class', 'activityDone') :
            labelActivityName.setAttribute('class', 'activityName');
        setLocalStorageItems(activities);
    });
}

// Skapa etikett för activtyName
function createLabelOfActivityName(item) {
    const label = document.createElement('label');
    label.setAttribute('class', 'activityName')
    if (item.status === true) {
        label.setAttribute('class', 'activityDone')
    }
    label.textContent = `${item.name}`;
    return label;
}

// Skapa en contentWrapper
function createContentWrapper(labelActivityName, labelStatus) {
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'content-wrapper';
    contentWrapper.appendChild(labelStatus);
    contentWrapper.appendChild(labelActivityName);
    return contentWrapper;
}

// Skapa delete knappen för att ta bort ett list item
function createDeleteButton(index) {
    const button = document.createElement('button');
    button.type = 'button'
    button.textContent = 'X'
    button.setAttribute('class', 'delete')
    button.addEventListener('click', () => deleteItem(index));
    return button;
}

// Ta bort en aktivitet
function deleteItem(index) {
    const choice = confirm('Vill du ta bort denna aktivitet?');
    if (choice) {
        activities.splice(index, 1);
        setLocalStorageItems(activities);
    }
    renderBucketList();
}

// Här skapas li och dess barn element
function createLiTagAndTheBlongingChildren(ul, contentWrapper, deleteButton) {
    const li = document.createElement('li');
    li.appendChild(contentWrapper);
    li.appendChild(deleteButton);
    ul.appendChild(li)
}

// Loopa genom listan "activities" och tillhörande element
function iterationOfActivities(ul, printedCategories) {
    console.log("Innehållet i listan:");
    activities.forEach((item, index) => {
        console.log(`${index + 1}: ${item.name} (${item.category})`);
        createOneCategoryOfEach(printedCategories, item, ul);
        const labelStatus = createLabelStatus();
        const spanOnOff = createSpanOffForCheckbox();
        const statusCheckbox = createStatusCheckbox(item, index);
        const spanSlider = createSpanSlider();
        labelStatus.appendChild(spanOnOff);
        labelStatus.appendChild(statusCheckbox);
        labelStatus.appendChild(spanSlider);
        const labelActivityName = createLabelOfActivityName(item);
        changeStatusCheckboxEvent(statusCheckbox, labelActivityName, index);
        const contentWrapper = createContentWrapper(labelActivityName, labelStatus);
        const deleteButton = createDeleteButton(index);
        createLiTagAndTheBlongingChildren(ul, contentWrapper, deleteButton);
    });
}

// Rendera listan
function renderBucketList() {
    const printedCategories = new Set();
    activities = getLocalStorageItems();
    sortActivities(activities);
    const ul = document.createElement('ul');
    const clearButton = createClearButtonAndClickEvent();
    const buttonWrapper = createClearButtonWrapper(clearButton);
    createBucketListWithChildren(ul,buttonWrapper);
    iterationOfActivities(ul, printedCategories);
};

// Kör funktionen när sidan laddas
window.onload = () => {
    activities = getLocalStorageItems();
    // Formulärhantering
    createBucketListForm();
    renderBucketList();
};