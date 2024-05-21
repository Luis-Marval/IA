const path = require("path");

const reference = __dirname;
const parent = (dir = reference) => path.dirname(dir);
const root = () => parent(reference);
console.log(root())

module.exports = { parent, root };