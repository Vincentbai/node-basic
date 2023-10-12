const verifyRoles = (...allowedRoles) =>{

  return (req, res, next) =>{
    if(!req?.roles) return res.sendStatus(401)

    const rolesArray = [...allowedRoles]
    console.log("🚀 ~ file: verifyRoles.js:7 ~ return ~ rolesArray:", rolesArray)
    console.log(req.roles)

    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)

    if(!result) return res.sendStatus(401)

    next()
    
  }
}

module.exports = verifyRoles