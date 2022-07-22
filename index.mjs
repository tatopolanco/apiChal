import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from './build/index.main.mjs'
const stdlib = loadStdlib();

console.log("Adding bling bling to the Reach DApp");
const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);
console.log('Sup, Alice and Bobs!');

console.log('Launching The Contract Engine...');
const ctcAlice = accAlice.contract(backend);

console.log('Starting the Reach DApp now!');

const users = [];

let done = false;

const startBobs = async () => {
    const newBob = async(who) => {
        const acc = await stdlib.newTestAccount(startingBalance);
        const ctc = acc.contract(backend, ctcAlice.getInfo());
        users.push(acc.getAddress());
    };
    
    await newBob('Bob One');
    await newBob('Bob Two');
    await newBob('Bob Three');
    await newBob('Bob Four');
    await newBob('Bob Five');
    await newBob('Bob Six');
    await newBob('Bob Seven');
    while(!done){
        await stdlib.wait(1);
    }

    console.log(users);
};

await ctcAlice.p.Alice({
    // Alice interact object
    ready: () => {
        console.log('Alice is ready!')
        startBobs();
    },
});

console.log('See ya next time, Alice and Bobs!')
done = true;