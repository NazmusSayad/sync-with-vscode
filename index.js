console.clear()
const fs = require('fs')
const getInsiderPath = path => {
  return path.replace('/Code/User', '/Code - Insiders/User')
}
const codeUserPath = process.env.APPDATA + '/Code/User'
const codeInsiderUserPath = getInsiderPath(codeUserPath)

const files = {
  keybindings: '/keybindings.json',
  settings: '/settings.json',
}

const dirs = {
  snippets: '/snippets',
}

for (let key in files) {
  fs.copyFileSync(codeUserPath + files[key], codeInsiderUserPath + files[key])
}

for (let key in dirs) {
  const path = codeUserPath + dirs[key]
  const dir = fs.readdirSync(path)

  dir.forEach(item => {
    const itemPath = path + '/' + item
    if (fs.lstatSync(itemPath).isFile()) {
      fs.copyFileSync(itemPath, getInsiderPath(itemPath))
    }
  })
}
