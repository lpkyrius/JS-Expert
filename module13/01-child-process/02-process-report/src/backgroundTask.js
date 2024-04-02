process.on('message', (msg) => console.log('msg from child', msg.Name))

// console.log(`I'm ready!!! Child Process: ${process.pid}`)