// import by npm 
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

// core modules
const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

const logEvents = async (message) =>{

  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  console.log("🚀 ~ file: logEvent.js:14 ~ logEvents ~ logItem:", logItem)

  try {

    // appendFile function will create the file if not exist, but not directory, like the "logs"
    if(!fs.existsSync(path.join(__dirname, 'logs'))) await fsPromise.mkdir(path.join(__dirname, 'logs'))

    await fsPromise.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
    
  } catch (err) {
    console.log("🪲 ~ file: logEvent.js:19 ~ logEvents ~ err:", err)
    
  }
}

module.exports = logEvents