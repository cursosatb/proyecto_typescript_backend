// módulo os
import { log } from 'console';
import os from 'os';

// console.log(`tmpdir: ${os.tmpdir()}`);
// console.log(`hostname: ${os.hostname()}`);
// console.log(`type: ${os.type()}`);
// console.log(`platform: ${os.platform()}`);
// console.log(`hostname: ${os.hostname()}`);
// console.log(`platform: ${os.platform()}`);
// console.log(`arch: ${os.arch()}`);
// console.log(`release: ${os.release()}`);
// console.log(`uptime: ${os.uptime()}`);
// console.log(`totalmem: ${os.totalmem()}`);
// console.log(`freemem: ${os.freemem()}`);
// console.log(`cpus: ${os.cpus()}`);
// console.log(`cpus: ${JSON.stringify(os.cpus()[0])}`);
// console.log(`networkInterfaces: ${os.networkInterfaces()}`);

import { Worker, isMainThread, parentPort } from 'worker_threads';

function fibonacci(numero: number) {
  return (numero <= 1) ? numero :  fibonacci(numero - 1) + fibonacci(numero - 2);
}


// solamente lo ejecuta el hilo principal
// para los workers isMainThread = false
if(isMainThread) {
  for(let i=0; i<11; i++) {
    const worker = new Worker(__filename);
    // recibe los datos en el hilo principal
    worker.on('message', (msg) => {
      console.log(msg);      
    })
  }
} 
else {
  // se ececuta 4 veces
  const resultado = fibonacci(45);

  // enviar datos al hilo principal
  parentPort.postMessage(resultado);
}

// ejecución en serie
// console.time();
// fibonacci(45);
// fibonacci(45);
// fibonacci(45);
// fibonacci(45);
// console.timeEnd();



// log(resultado)



