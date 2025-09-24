import type { Request, Response } from "express"
import { handleHttp } from "../utils/error.handler.ts"
import { getUserService, getUsersService, createUserService, updateUserService, deleteUserService } from "../services/users.services.ts"
import type { IUser } from "../interfaces/user.interface.ts"
import type { HttpErrorStatus } from "../types/types.ts"

const getUser = (req: Request<{id:number}>, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    const { id } = req.params
    try {
        getUserService(id).then((response) => {
            if (!response) {
                res.status(404).send({ message: "User not found" });
            } else {
                res.send(response);
            }
        })
    }catch(err){
        handleHttp(res, "ERROR_GET_USER", statusCode, err);
    }
}

const getUsers = (req: Request, res: Response):void => {
    const statusCode: HttpErrorStatus = 500
    try {
        getUsersService().then((response) => {
            res.send(response);
        })
    }catch(err){
        handleHttp(res, "ERROR_GET_USERS", statusCode, err);
    }
}

const createUser = (req: Request, res: Response):void => {
    const statusCode: HttpErrorStatus = 500
    try {
        const user: IUser = req.body
        createUserService(user).then((response) => {
            res.status(201).send(response);
        })
    } catch(err){
        handleHttp(res, "ERROR_CREATE_USER", statusCode, err);
    }
}

const updateUser = (req: Request<{id:number}>, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    const { id } = req.params
    const user: IUser = req.body
    try {
        updateUserService(id, user).then((response) => {
            if (!response) {
                res.status(404).send({ message: "User not found" });
            } else {
                res.send(response);
            }
        })
    } catch(err){
        handleHttp(res, "ERROR_UPDATE_USER", statusCode, err);
    }
}

const deleteUser = (req: Request<{ id: number }>, res: Response) => {  
    let statusCode:HttpErrorStatus = 500;
    const { id } = req.params;
    try {
        deleteUserService(id).then((response) => {
            res.send(response);
        })

    }catch(err){
        handleHttp(res, "ERROR_DELETE_BOOK", statusCode, err);
    }
}

export { getUser, getUsers, createUser, updateUser, deleteUser }