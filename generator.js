function generate() {
    const min = 33;
    const max = 122;

    let length = document.getElementById("length").value;
    let name = document.getElementById("name").value;
    let url = document.getElementById("url").value;
    let notes = document.getElementById("notes").value;
    let password = "";

    if (!url.startsWith("https://")) {
        url = "https://" + url;
    }
    if (length <= 0 || length > 100) {

        return;
    }
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        let char = String.fromCharCode(randomNumber);
        password += char;
    }
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    if (passwords == null) {
        passwords = [];
    }
    passwords.push({name: name, url: url, notes: notes, password: password});
    document.getElementById("password").innerHTML = "Your personal generated Password is: " + password
    let copyButton = document.createElement("button");
    copyButton.innerHTML = "Copy";
    copyButton.classList.add("button");
    copyButton.onclick = function () {
        navigator.clipboard.writeText(password)
    };
    document.getElementById("password").appendChild(copyButton);
    localStorage.setItem("passwords", JSON.stringify(passwords));
}

function getPasswords() {
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    if (passwords == null) {
        passwords = [];
    }
    try {
        document.querySelector("table").remove()
    } catch (e) {

    }


    let table = document.createElement("table");
    table.id = "passwordTable";
    let headerRow = table.insertRow();
    headerRow.innerHTML = "<th>URL</th><th>Username</th><th>Password</th><th>Notes</th><th>Action</th>";

    for (let i = 0; i < passwords.length; i++) {
        let row = table.insertRow();
        row.insertCell(0).innerHTML = '<img src="' + passwords[i].url + '/favicon.ico"><a target="_blank" href="' + passwords[i].url + '">' + passwords[i].url + '</a>';
        row.insertCell(1).innerHTML = passwords[i].name;
        row.insertCell(2).innerHTML = passwords[i].password;
        row.insertCell(3).innerHTML = passwords[i].notes;

        let div = document.createElement("div");

        let copyButton = document.createElement("button");
        copyButton.innerHTML = "Copy";
        copyButton.classList.add("button");
        copyButton.onclick = function () {
            navigator.clipboard.writeText(passwords[i].password);
        };

        div.appendChild(copyButton);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("button");
        deleteButton.style.backgroundColor = "red"
        deleteButton.onclick = function () {
            passwords.splice(i, 1);
            localStorage.setItem("passwords", JSON.stringify(passwords));
            getPasswords();
        };
        div.appendChild(deleteButton);
        row.insertCell(4).appendChild(div);
    }

    document.getElementById("savedPW").appendChild(table);
}

function filterTable() {
    let input = document.getElementById("search");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("passwordTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td");
        let match = false;
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                if (td[j].innerText.toLowerCase().indexOf(filter) > -1) {
                    match = true;
                    break;
                }
            }
        }
        tr[i].style.display = match ? "" : "none";
    }
}

document.getElementById("length").onkeyup = (event) => {
    console.log(event.target.value);
    if (event.target.value.length <= 0 || event.target.value.length > 999) {
        event.target.setCustomValidity('Password can´t be longer than 999 and shorter than 1')
    }
}
function downloadPasswords() {
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    if (passwords == null) {
        passwords = [];
    }
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(passwords));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "passwords.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
