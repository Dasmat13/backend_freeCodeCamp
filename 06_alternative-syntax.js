// Alternative syntax for exporting — you export DIRECTLY onto module.exports
// Instead of creating variables first and then assigning them at the bottom,
// you attach each export one by one as you go

module.exports.items = ['item1', 'item2']  // exports an array called 'items' immediately
                                            // other files can access it as: data.items

const person = {        // creates a local object called 'person'
    name: 'bob',        // the object has one property: name = 'bob'
}                       // closing the object literal

module.exports.singlePerson = person   // exports the person object under the key 'singlePerson'
                                        // other files can access it as: data.singlePerson