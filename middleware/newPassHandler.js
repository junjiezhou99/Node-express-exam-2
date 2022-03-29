import bcrypt from 'bcrypt';

const encryptPassword =  (req, res, next) => {
    try {
        const saltRounds = 10;
        console.log(`---> encryptPassword ${req.body.newpassword}`);
        const passwordHash = bcrypt.hashSync(req.body.newpassword, saltRounds);
        req.body.newpassword = passwordHash;
        console.log(`---> encryptPassword ${req.body.newpassword}`);
        next();
    } catch (error) {
        next(error);
    }
}

export default { 
    encryptPassword,
};