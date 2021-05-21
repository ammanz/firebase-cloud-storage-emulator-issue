let admin = require('firebase-admin');

let fs = require('fs');

// Connecting to emulator: FIREBASE_STORAGE_EMULATOR_HOST=localhost:9199 node firebase-admin.js

admin.initializeApp({
    projectId: 'test-project',
    storageBucket: 'default-bucket'
});

let bucket = admin.storage().bucket();

async function uploadFile(filePath, destFileName) {
    await bucket.upload(filePath, {
        destination: destFileName,
        });
    
    console.log(`${filePath} uploaded to ${destFileName}`);
}

async function uploadImages() {
    const rootPath = `./test-files`;

    let directoryEntries = fs.readdirSync(rootPath);
    
    for (const directoryEntry of directoryEntries) {
        await uploadFile(`${rootPath}/${directoryEntry}`, directoryEntry);
    }
}

uploadImages();
