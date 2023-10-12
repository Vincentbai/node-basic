const User = require('../model/User')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) =>{

  const {user, pwd} = req.body

  if(!user || !pwd) return res.status(400).json({message:'Username and password are required.'})

  const foundUser = await User.findOne({username: user}).exec()

  if(!foundUser) return res.sendStatus(401) // unauthorized 

  // evaluate password

  const match = await bcrypt.compare(pwd, foundUser.password)

  if(match){

    const roles =  Object.values(foundUser.roles)
    
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles,
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s'}
    )

    // do NOT need add the roles in refreshToken
    const refreshToken = jwt.sign(
      {username: foundUser.username},
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d'}
    )

    // save the refresh token in the DB, and will invalidate the refresh token when user logout
    foundUser.refreshToken = refreshToken

    const result = await foundUser.save()
    console.log("🚀 ~ file: auth.controller.js:47 ~ handleLogin ~ result:", result)

    res.cookie('jwt', refreshToken, {
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'None',
      // secure: true, // change back to production
    })

    res.json({accessToken})
  }else{
    res.sendStatus(401)
  }

}

module.exports={
  handleLogin
}
