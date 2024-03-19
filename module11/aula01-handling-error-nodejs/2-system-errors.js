import timers from 'timers/promises'
const timeoutAsync = timers.setTimeout;


// Always manage errors for the case the application has any error outside itself or not


// const results = ['1', '2'].map(async (item) => {
//     console.log('starting process!!')
//     await timeoutAsync(100)
//     console.log(item)
//     console.log(await Promise.resolve('timeout order!'))
//     await timeoutAsync(100)
//     console.count('debug')

//     return parseInt(item) * 2
// })
// console.log('results', await Promise.all(results))

setTimeout(async () => {
    console.log('starting process!!')
    await timeoutAsync(100)
    console.count('debug')
    console.log(await Promise.resolve('timeout order!'))
    await timeoutAsync(100)
    console.count('debug')

    await Promise.reject('promise rejected error timeout!')
}, 1000);

const throwError = (msg) => { throw new Error(msg)}

try {
    console.log('hello')
    console.log('world')
    throwError('error inside try/catch')
} catch (error) {
    console.log('a request error has happened', error.message)
} finally {
    console.log('executed after all!')
}


// Global: if we have any error related to 'unhandledRejection' it will not
// break the app, it will only show the error message
process.on('unhandledRejection', (e) => {
    console.log('unhandledRejection', e.message || e)
})

process.on('uncaughtException', (e) => {
    console.log('uncaughtException', e.message || e)
    
    // for kubernetes this code '1' shows if it should or not reboot
    // Usually, it's better to keep the app running for the other users and only log the error to be evaluated
    // process.exit(1) 
})
Promise.reject('promise rejected!')

// if Promise.reject is inside another context, it'll go into unhandledRejection
setTimeout( async () => {
    await Promise.reject('promise async/await rejected!')
});
// but if it's in the global context will go into uncaughtRejection
// await Promise.reject('promise async/await rejected!')

// uncaughtException
setTimeout(() => {
    throwError('error outside catch')
});
