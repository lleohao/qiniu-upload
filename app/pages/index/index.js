const remote = require('electron');

remote.ipcRenderer.on('error', (e, message) => {
    alert(message);
});

remote.ipcRenderer.on('upload-success', (e, url) => {
    infoArea.innerHTML = `文件外链: ${url}`;
});

const upLoadBtn = document.getElementById('uploadBtn');
const dragArea = document.getElementById('uploadArea');
const infoArea = document.getElementById('infoArea');
let file;

const upload = function () {
    remote.ipcRenderer.send('upload-file', file.path, file.name);
};

upLoadBtn.addEventListener('click', upload);

dragArea.addEventListener('drop', (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];

    infoArea.innerHTML = `你选择的文件名是: ${file.name}`;
});

dragArea.addEventListener('dragenter', () => {
    dragArea.classList.add('hover');
});

dragArea.addEventListener('dragleave', () => {
    dragArea.classList.remove('hover');
});

document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault()
}

document.body.ondrop = (ev) => {
    ev.preventDefault()
}
