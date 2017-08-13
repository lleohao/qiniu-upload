const remote = require('electron');

const saveBtn = document.getElementById('save');
const cleanBtn = document.getElementById('clean');
const akIpt = document.getElementById('ak');
const skIpt = document.getElementById('sk');
const scopeIpt = document.getElementById('scope');

const saveSetting = function (e) {
    e.preventDefault();
    if (akIpt.value && skIpt.value && scopeIpt.value) {
        const certificate = {
            accessKey: akIpt.value,
            secretKey: skIpt.value,
            scope: scopeIpt.value
        }

        remote.ipcRenderer.send('save-setting', certificate);
    } else {
        alert('请填写完整表单!');
    }
};

const cleanSetting = function (e) {
    remote.ipcRenderer.send('clear-setting');
};

const loadSetting = function () {
    remote.ipcRenderer.send('load-setting');
    remote.ipcRenderer.on('load-setting', (e, message) => {
        akIpt.value = message.accessKey;
        skIpt.value = message.secretKey;
        scopeIpt.value = message.scope;
    });
};

saveBtn.addEventListener('click', saveSetting);
cleanBtn.addEventListener('click', cleanSetting);

window.addEventListener('load', loadSetting);
