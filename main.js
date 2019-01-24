const languagesAPI = {
    getAll() {
        return fetch("http://localhost:8088/languages")
            .then(response => response.json());

    //////////////////////////////////////////////////////
    /*
        let fetchResult = fetch("http://localhost:8088/languages");
        console.log("fetchResult", fetchResult);
        fetchResult.then(response => {
            console.log("response",response);

            let promise = response.json();
            console.log("promise", promise);

            promise.then(somethin => {
                console.log("somethin", somethin);
            });
        })
        */
    },
    get(id) { },
    add(language) { 
        return fetch("http://localhost:8088/languages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(language)
        });
    },
    update(id, language) { },
    delete(id) { }
}

function buildAddForm() {
    const addFormEl = document.querySelector("#add-form");
    clearElement(addFormEl);

    const nameEl = document.createElement("input");
    nameEl.placeholder = "Name"
    addFormEl.appendChild(nameEl);

    const yearEl = document.createElement("input");
    yearEl.placeholder = "Year Created"
    addFormEl.appendChild(yearEl);

    const creatorEl = document.createElement("input");
    creatorEl.placeholder = "Creator"
    addFormEl.appendChild(creatorEl);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", () => {
        languagesAPI.add({
            name: nameEl.value,
            yearCreated: yearEl.value,
            creator: creatorEl.value
        }).then(() => {
            main();
        });
    });
    addFormEl.appendChild(saveButton);
}

function buildLanguageList() {
    const languageListEl = document.querySelector("#language-list");
    clearElement(languageListEl);

    languagesAPI
        .getAll()
        .then(languages => {
            languages.forEach(language => {
                const languageEl = document.createElement("article");

                const nameEl = document.createElement("h2");
                nameEl.textContent = language.name;
                languageEl.appendChild(nameEl);

                const yearEl = document.createElement("p");
                yearEl.textContent = language.yearCreated;
                languageEl.appendChild(yearEl);

                const creatorEl = document.createElement("p");
                creatorEl.textContent = language.creator;
                languageEl.appendChild(creatorEl);

                languageListEl.appendChild(languageEl);
            });
        });
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function main() {
    buildAddForm();
    buildLanguageList();
}

main();