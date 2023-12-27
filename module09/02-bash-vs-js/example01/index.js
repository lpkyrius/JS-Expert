// Use Homebrew to install jq with 'brew install jq'
const { existsSync, mkdirSync, rmSync } = require('fs')
const { execSync } = require('child_process')

const getFileName = (index) => index >= 3 ? `js-0${index}` : `mjs-0${index}`

// recursive: true to remove even if the folder has files
const rmFolder = folderName => rmSync(`./${folderName}`, { recursive: true })

const makeDirAndReturnName = (folderName) => {
    if(existsSync(folderName)) rmFolder(folderName)

    mkdirSync(folderName)

    return folderName // we always returns folderName to work with it in .map
}

const initializePackage = folderName => {
    // the 2nd property uses cwd to inform the directory  
    // where we want to run the 1s property (the command)
    execSync(`npm init -y --scope @leandropassos --silent > /dev/null`, {
        cwd: `./${folderName}`
    })

    return folderName 
}

const printNameAndPackageVersion = folderName => {
    const { name, version } = require(`./${folderName}/package.json`)
    console.log({ n: name, v: version })

    return folderName
}

const FOLDER_AMOUNT = 4
// create the array...
Array.from(Array(FOLDER_AMOUNT).keys())
    .map(index => makeDirAndReturnName(getFileName(index + 1)))
    .map(folderName => initializePackage(folderName))
    .map(folderName => printNameAndPackageVersion(folderName))
    .map(folderName => rmFolder(folderName))

// to check the time spent for this, use the command:
// time node index.js