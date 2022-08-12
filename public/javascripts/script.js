const leaveBTN = document.getElementById('leave');

function ScrollTop() {
    document.documentElement.scrollTop = 0; //Sets scroll value to 0
};

//Mobile side menu
function ToggleSideMenu() {
    var menuItems = document.getElementsByClassName('menu-items')[0];
    var sideBar = document.getElementsByClassName('chatbox-sidebar')[0];
    
    if (window.getComputedStyle(menuItems).display === 'none') { //If menu collapsed
        menuItems.style.display = 'block'; //Open menu  
        sideBar.style.width = '45%';
    } 

    else { //Else revert back
        menuItems.style.display = 'none'; 
        sideBar.style.width = '10%';
    }
};

//Leave dialog box
leaveBTN.addEventListener('click', e => {
    let confirmation = confirm('Are you sure you want to leave?');

    if (!confirmation) {
        e.preventDefault(); //Prevents page refresh on cancel
    }
});

//Show password
function ShowPassword() {
    loginToggle = document.getElementById('loginPassword');
    registerToggle = document.getElementById('registerPassword');

    //If type is password
    if (loginToggle.type === 'password' || registerToggle.type === 'password') {
        //Make text
        loginToggle.type = 'text'; 
        registerToggle.type = 'text'; 
    }
    
    //Else revert
    else {
        loginToggle.type = 'password'; 
        registerToggle.type = 'password'; 
    }
}

//----------------------------------------------------------------------------------------------- SOCKETSERVER -----------------------------------------------------------------------------------------------

//#region Socket Server

const messageForm = document.getElementById('message-form');
const formMessages = document.querySelector('.message');

const socket = io();

let username = document.querySelector('.users').innerHTML; //Get username from POST

socket.emit('socketID', {username: username}); //Creates JSON object of username

//Triggers message functions
socket.on('message', message => {
    
    outputMessage(message);

    //Ensures most recent message is top
    formMessages.scrollTop = formMessages.scrollHeight;
});

//Creates userlist element when receiving a username
socket.on('username', user => {
    let listItem = document.createElement('li');
    listItem.innerHTML = user.username; //Sets value as entered username
    document.querySelector('.userList').appendChild(listItem); //Adds element to parent
}) 

//Submit messages to server
messageForm.addEventListener('submit', e => {
    e.preventDefault(); //Prevent submit going to a file

    const msg = e.target.elements.messageInput.value; //Gets form input

    //Prevents blank message sending
    if(messageInput.value != '') {
        socket.emit('formMessage', msg); //Emits input
    }

    //Clears input and focuses
    e.target.elements.messageInput.value = ''; 
    e.target.elements.messageInput.focus;
});

//Output messages to front-end
function outputMessage(message) {
    //Adds sound to message
    var audio = new Audio('./sounds/messages.mp3'); //Attribution: HTN4ever Notif-1.mp3; https://freesound.org/people/HTN4ever/sounds/240943/
    audio.volume = 0.2; //Reduced sound volume
    audio.play();

    const div = document.createElement('div');

    div.classList.add('container'); //Adds parent class from chatbox.hbs
    div.innerHTML = `<p>${message.username}<span> ${message.time}</span></p>
    <p>${message.text}</p>`; //Passes input message

    document.querySelector('.message').appendChild(div); //Adds element to parent
}



//#endregion