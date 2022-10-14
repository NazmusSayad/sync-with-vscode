console.clear()
const fs = require('fs')
const path = require('path')

const getInsiderPath = input => {
  return input.replace('Code', 'Code - Insiders')
}

const readFile = (fileName, dir = codeUserPath) => {
  const rawData = fs.readFileSync(path.join(dir, fileName), 'utf-8')
  return JSON.parse(rawData)
}

const writeFile = (fileName, data) => {
  const dataStr = JSON.stringify(data)
  fs.writeFileSync(path.join(insiderUserPath, fileName), dataStr)
}

const codeUserPath = path.join(process.env.APPDATA + '/Code/User/')
const insiderUserPath = getInsiderPath(codeUserPath)
const files = {
  keybindings: 'keybindings.json',
  settings: 'settings.json',
}

const [extraKeybindings, extraSettings] = Object.values(files).map(fileName =>
  readFile(fileName, __dirname)
)

;(() => {
  const settings = readFile(files.settings)
  Object.assign(settings, extraSettings)
  writeFile(files.settings, settings)

  const keybindings = readFile(files.keybindings)
  keybindings.push(...extraKeybindings)
  writeFile(files.keybindings, keybindings)

  const dirPath = path.join(codeUserPath, 'snippets/')
  const dir = fs.readdirSync(dirPath)
  dir.forEach(item => {
    const filePath = path.join(dirPath, item)
    if (!fs.lstatSync(filePath).isFile()) return
    fs.copyFileSync(filePath, getInsiderPath(filePath))
  })
})()
