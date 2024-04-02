import { parentPort, threadId } from 'worker_threads'
import sharp from 'sharp'
import axios from 'axios'

parentPort.on('message', msg => console.log(threadId, 'msg', msg))