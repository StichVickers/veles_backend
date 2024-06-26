const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user')

const generateJwt = (id, login, role ) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {login, password, role} = req.body
        if (!login || !password) {
            return next(ApiError.badRequest('Некорректный login или password'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким login уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login,name, role, password: hashPassword})
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
        
    }

    async login(req, res, next) {
        const {login, password} = req.body
        try {
            const user = await User.findOne({where: {login}})
            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'})
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.status(401).json({message: 'Указан неверный пароль'})
            }
            const token = generateJwt(user.id, user.login, user.role)
            return res.json({token, role: user.role, user: user.id })
        } catch (error) {
            next(error)
        }
    }
    
}
module.exports = new UserController()
