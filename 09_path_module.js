const path = require('path')  // loads Node.js built-in 'path' module
                               // 'path' helps you work with file and directory paths safely
                               // without worrying about OS differences (/ vs \)

console.log(path.sep);  // path.sep prints the platform-specific path separator
                         // On Linux/Mac: '/'    On Windows: '\'

const filePath = path.join('/content', 'subfolder', 'test.txt')
// path.join() combines multiple path segments into one clean path
// It automatically adds the correct separator for your OS
// Result on Linux: '/content/subfolder/test.txt'
console.log(filePath);   // prints: /content/subfolder/test.txt

const base = path.basename(filePath)   // path.basename() extracts just the file name from a full path
                                        // 'filePath' is '/content/subfolder/test.txt'
                                        // basename returns: 'test.txt'
console.log(base);                     // prints: test.txt

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'text.txt')
// path.resolve() creates an ABSOLUTE path starting from the given directory
// __dirname = the real directory of this file on disk
// It joins: __dirname + 'content' + 'subfolder' + 'text.txt'
// Unlike path.join(), path.resolve() always returns an absolute path
console.log(absolute);  // prints the full absolute path to text.txt