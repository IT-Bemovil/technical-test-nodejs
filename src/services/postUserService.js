const { User } = require('../db');


const postUserService = async (email, password) => {
    if(!email || !password){
        return 'email y password son requeridos'
    }
    const user = await User.findOne({ where: { email } });

    if(user){
        console.log(user)
        return 'El usuario ya existe';
    }else{
        const newUser =  await User.create({ email, password });
        await newUser.save();
        return {
            "message": "User registered successfully"
          };
    }
};

module.exports = postUserService;