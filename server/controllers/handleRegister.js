const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../prismaClient');


const handleRegister = async (req , res ) => {
    const { name , email , password } = req.body;

    if(!name || !email || !password) return res.status(400).json({ message : 'Please fill all the fields' });

    const duplicate = await prisma.user.findUnique({
        where : {
            email
        }
    })

    if(duplicate) return res.status(400).json({ message : 'User already exists'});

    const hashedPassword = await bcrypt.hash(password , 10);

    try{
        const user = await prisma.user.create({
            data : {
                name,
                email,
                password : hashedPassword
            }
        });
        res.status(200).json({ name , email , message : 'User Registered Successfully' });
    } catch(err){
        res.status(500).json({ message : err.message });
    }
}

module.exports = handleRegister;