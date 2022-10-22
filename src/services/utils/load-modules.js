const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {string} dir 
 * @param {*} opts 
 * @returns {Array}
 */
function loadModules(dir, opts) {
    const recursive = opts?.recursive
    const prefix = opts?.prefix
    const postfix = opts?.postfix
    const modules = []
    let children = [];
    try {
        children = fs.readdirSync(dir);
    } catch (e) {
        console.log(e);
    }
    for (const name of children) {
        if (name === 'index.js' || (prefix && !name.startsWith(postfix)) || (postfix && !name.endsWith(postfix))) continue;
        const fullPath = path.resolve(dir, name)
        const stat = fs.statSync(fullPath, { throwIfNoEntry: false })
        if (recursive && stat.isDirectory()) {
            const mods = loadModules(fullPath, opts);
            children.push(...mods)
        } else {
            modules.push(require(fullPath))
        }
    }
    return modules;
}

module.exports = {
    loadModules
}