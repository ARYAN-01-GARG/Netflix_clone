const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../prismaClient');

const handleLogin = async (req, res) => {
    
    const { email, password } = req.body;
    
    try{
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            return res.status(401).json({ error: 'Invalid password' });
        }

        const username = user.name;     

        const accessToken = jwt.sign(
            { username , email } , 
            process.env.ACCESS_TOKEN_SECRET , 
            { expiresIn : '1h' }
        );
    
        const refreshToken = jwt.sign(
            { username , email } , 
            process.env.REFRESH_TOKEN_SECRET , 
            { expiresIn : '1d'}
        );

        const updateUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                refreshToken,
                accessToken
            }
        });

        res.cookie('jwt' , refreshToken , { httpOnly : true , secure:true , sameSite:'none' , maxAge : 24* 60 * 60 * 1000 });
        return res.status(200).json({ token: accessToken });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = handleLogin;
