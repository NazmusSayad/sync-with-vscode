console.clear()
const fs = require('fs')
const codeUserPath = process.env.APPDATA + '/Code/User/'
const copyToInsider = input => {
  const output = input.replace('/Code/User/', '/Code - Insiders/User/')
  fs.copyFileSync(input, output)
}

const files = {
  keybindings: 'keybindings.json',
  settings: 'settings.json',
}

const dirs = {
  snippets: 'snippets',
}

for (let key in files) {
  copyToInsider(codeUserPath + files[key])
}

for (let key in dirs) {
  const path = codeUserPath + dirs[key]
  const dir = fs.readdirSync(path)
  dir.forEach(item => {
    const filePath = path + '/' + item
    if (fs.lstatSync(filePath).isFile()) {
      copyToInsider(filePath)
    }
  })
}
