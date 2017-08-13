const remote = require('electron');

remote.ipcRenderer.on('error', (e, message) => {
    alert(message);
});

const upLoadBtn = document.getElementById('uploadBtn');

const upload = function () {
    remote.ipcRenderer.send('get-token');
};

upLoadBtn.addEventListener('click', upload);
