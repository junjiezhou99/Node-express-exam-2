import HttpError from "http-errors";

const validateUserPassword = (req, res, next) => {
    const body = req.body;

    if (body.password) {
        if (/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(body.password)) {
            next();
        } else {
            next(HttpError(400, { message: "Error reglas para el password" }))
        }

    }
    else{
        next();
    }
}

export default {
    validateUserPassword,
}