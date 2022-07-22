import { CustomeAPIError } from "../errors/custome-error.js"

export const createError = (err, req, res, next) => {

    if(err instanceof CustomeAPIError) {
        return res.status(err.statusCode).json({msg: err.message})    
    }
    return res.status(500).json({msg: `something went wrong`})
}