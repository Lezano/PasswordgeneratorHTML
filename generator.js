function generate() {
    const min = 33;
    const max = 122;

    let length=document.getElementById("length").value;
    let name=document.getElementById("name").value;
    let password = "";

    for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let char = String.fromCharCode(randomNumber);
    password += char;
    }
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    if (passwords == null) {
        passwords = [];
    }
    passwords.push({name: name, password: password});
    document.getElementById("password").innerHTML = "Your personal generated Password is: " + password;
    localStorage.setItem("passwords", JSON.stringify(passwords));
}
function getPasswords() {
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    if (passwords == null) {
    passwords = [];
    }
    for (let i = 0; i < passwords.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = passwords[i].name + ": " + passwords[i].password + "<button>  </button>";
    document.getElementById("savedPW").appendChild(div);
    }
}