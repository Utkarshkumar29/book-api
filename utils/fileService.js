const fs = require('fs').promises;

const readJSON = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return data.trim() === '' ? [] : JSON.parse(data)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []
    } else {
      throw err
    }
  }
}

const writeJSON = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

module.exports = { readJSON, writeJSON }