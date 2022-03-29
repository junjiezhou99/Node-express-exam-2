import HttpError from "http-errors";
import userModel from '../models/usersModel.js'
import bcrypt from 'bcrypt';
import messageapp from '../data/messages.js';

const register = (req, res, next) => {
    console.log(`---> userController::register`);

    try {
        const body = req.body;
        let result;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: messageapp.parameter_not_especified }))
        } else {


            console.log(`---> userController::register ${body.password}`);
            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0), active: 1 };

            result = userModel.loginUser(user);
            if (result != undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));

            } else {

                result = userModel.createUser(user);

                if (result < 0)
                    next(HttpError(400, { message: messageapp.user_error_register }))

                res.status(201).json(result);

            }

        }

    } catch (error) {
        next(error);
    }

};

const login = (req, res, next) => {
    console.log(`---> userController::login`);

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, {  message: messageapp.parameter_not_especified }))
        } else {

            const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) };
            const result = userModel.loginUser(user);

            if (result === undefined) {
                next(HttpError(400, { message: messageapp.user_error_login }));
            } 
            else if (result.active == 0) {
                next(HttpError(400, { message: messageapp.user_error_active }));
            } else {
                console.log(`---> userController::login ${result.password}`);
                console.log(`---> userController::login ${body.password}`);

                if (!bcrypt.compareSync(body.password, result.password))
                    next(HttpError(400, { message: messageapp.user_error_login  }));
                else
                    res.status(200).json(result);
            }
        }

    } catch (error) {
        next(error);
    }
};

const getUser = (req, res, next) => {
    console.log(`---> userController::Get User`);

    const result = userModel.getUser(req.params.username);
    
    if (result != undefined){
        res.status(200).json(result.username);
    }
    else{
        next(HttpError(400, {  message: messageapp.user_error_username }))
    }
}

const addGrants = (req, res, next) => {
    console.log(`---> userController::Post grants`);
    const result = userModel.addGrants(req.body);

    if (result != undefined){
        res.status(200).json(result);
    }
    else{
        next(HttpError(400, {  message: messageapp.user_error_username }))
    }
}

const changeGrants = (req, res, next) => {
    console.log(`---> userController::Put grants`);

    const result = userModel.changeGrants(req.body);
    if (result != undefined){
        res.status(200).json(result);
    }
    else{
        next(HttpError(400, {  message: messageapp.user_error_username }))
    }
}

const deleteGrants = (req, res, next) => {
    console.log(`---> userController::Delete grants`);

    const result = userModel.deleteGrants(req.body);
    if (result != undefined){
        res.status(200).json(result);
    }
    else{
        next(HttpError(400, {  message: messageapp.user_error_username }))
    }
}

const newPass = (req, res, next) => {
    console.log(`---> userController::New password`);

    const result = userModel.newPass(req.body);
    if (result != undefined){
        res.status(200).json(result);
    }
    else{
        next(HttpError(400, {  message: messageapp.user_error_username }))
    }
}

const deleteUser = (req, res, next) => {
    console.log(`---> userController::Delete user`);

    const result = userModel.deleteUser(req.body);
    if (result != undefined){
        res.status(200).json(result);
    }
    else{
        next(HttpError(400, {  message: messageapp.user_error_username }))
    }
}

const activateUser = (req, res, next) => {

    const result = userModel.activateUser(req.body);

    if (result != undefined){
        res.status(200).json(result);
    }
    else{
        next(HttpError(400, {  message: messageapp.user_error_username }))
    }
}

export default {
    register,
    login,
    getUser,
    addGrants,
    changeGrants,
    deleteGrants,
    newPass,
    deleteUser,
    activateUser
}