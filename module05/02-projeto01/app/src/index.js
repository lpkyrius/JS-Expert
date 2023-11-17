'use strict';

const { readFile } = require('fs/promises');
const { join } = require('path');
const pdf = require('pdf-parse');

;(async () => {
    const dataBuffer = await readFile(join(__dirname, './../../../docs/contrato.pdf'));
    const data = await pdf(dataBuffer);
    // console.log('data', data);
    console.log('data', data.text);
    // We don't need to transform every time.
    // Let's use console to create a text file from  console.log('data', data.text)
    // npm start | tee text.txt
    // clear the first 6 lines and the last one
    // now we can copy the text file content and past it into regex101.com to create the regex there
})()

// pdf are binary files (not text files) we have to translate them using pdf-parse library