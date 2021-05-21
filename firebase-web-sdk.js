global.XMLHttpRequest = require("xhr2");
var firebase = require("firebase/app");
require('firebase/storage');

let fs = require('fs');

// Connecting to emulator: FIREBASE_STORAGE_EMULATOR_HOST=localhost:9199 node firebase-web-sdk.js


firebase.initializeApp({
    projectId: 'test project',
    storageBucket: 'default-bucket'
});

let storage = firebase.storage();
storage.useEmulator('localhost', 9199);

function uploadFile(filePath, destFileName) {
    storage.ref(destFileName).put(fs.readFileSync(filePath)).then((snapshot) => {
        console.log(`Uploaded ${destFileName}`);
    });
}

function uploadImages() {
    const rootPath = `./test-files`;

    let directoryEntries = fs.readdirSync(rootPath);
    
    for (const directoryEntry of directoryEntries) {
        uploadFile(`${rootPath}/${directoryEntry}`, directoryEntry);
    }
}

uploadImages();
