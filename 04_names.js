// local — this variable is PRIVATE to this file, it will NOT be shared
const secret = 'SUPER SECRET'   // declared but not exported — other files cannot access this

// share — these two variables WILL be shared (exported below)
const john  = 'john'    // stores the string 'john' — this will be exported
const peter = 'peter'   // stores the string 'peter' — this will also be exported

// module.exports is the special object Node.js uses to decide what this file shares
// We export an object containing both john and peter using shorthand property names
module.exports = { john, peter }  // equivalent to { john: john, peter: peter }
                                   // 'secret' is intentionally NOT exported — it stays private