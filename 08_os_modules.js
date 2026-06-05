const { log } = require('console')  // destructures 'log' from the built-in 'console' module
                                      // same as: const log = console.log (shortcut for convenience)
const os = require('os')             // loads Node.js built-in 'os' module — gives system info

// info about current user
const user = os.userInfo()          // returns an object with current OS user info
                                     // includes: username, uid, gid, shell, homedir
// console.log(user);               // uncomment to see full user info object

// methods returns the system uptime in seconds
console.log(`the system uptime is ${os.uptime()} seconds`)  // os.uptime() returns how long the system
                                                              // has been running since last boot (in seconds)

const currentOS = {                  // creates an object to hold key OS information
    name: os.type(),                 // os.type() returns the OS name: 'Linux', 'Darwin' (Mac), 'Windows_NT'
    release: os.release(),           // os.release() returns the OS version string (e.g. '5.15.0-91-generic')
    totalmem: os.totalmem(),         // os.totalmem() returns total RAM in BYTES (divide by 1e9 for GB)
    freeMem: os.freemem(),           // os.freemem() returns available free RAM in BYTES
}
console.log(currentOS);             // prints the object — shows all 4 properties with their live values
