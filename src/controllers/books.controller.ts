import type { Request, Response } from "express"
import { handleHttp } from "../utils/error.handler.ts"
import { getBookService, getBooksService, createBookService, updateBookService, deleteBookService } from "../services/books.services.ts"
import type { IBook } from "../interfaces/book.interface.ts"
import type { HttpErrorStatus } from "../types/types.ts"

const getBook = (req: Request<{id:number}>, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    const { id } = req.params
    try {
        getBookService(id).then((response) => {
            if (!response) {
                res.status(404).send({ message: "Book not found" });
            } else {
                res.send(response);
            }
        })
    }catch(err){
        handleHttp(res, "ERROR_GET_BOOK", statusCode, err);
    }
}

const getBooks = (req: Request, res: Response):void => {
    const statusCode: HttpErrorStatus = 500
    try {
        getBooksService().then((response) => {
            res.send(response);
        })
    }catch(err){
        handleHttp(res, "ERROR_GET_BOOKS", statusCode, err);
    }
}

const createBook = (req: Request, res: Response):void => {
    const statusCode: HttpErrorStatus = 500
    try {
        const Book: IBook = req.body
        createBookService(Book).then((response) => {
            res.status(201).send(response);
        })
    } catch(err){
        handleHttp(res, "ERROR_CREATE_BOOK", statusCode, err);
    }
}

const updateBook = (req: Request<{id:number}>, res: Response) => {
    const statusCode: HttpErrorStatus = 500
    const { id } = req.params
    const Book: IBook = req.body
    try {
        updateBookService(id, Book).then((response) => {
            if (!response) {
                res.status(404).send({ message: "Book not found" });
            } else {
                res.send(response);
            }
        })
    } catch(err){
        handleHttp(res, "ERROR_UPDATE_BOOK", statusCode, err);
    }
}

const deleteBook = (req: Request<{ id: number }>, res: Response) => {  
    let statusCode:HttpErrorStatus = 500;
    const { id } = req.params;
    try {
        deleteBookService(id).then((response) => {
            res.send(response);
        })

    }catch(err){
        handleHttp(res, "ERROR_DELETE_BOOK", statusCode, err);
    }
}

export { getBook, getBooks, createBook, updateBook, deleteBook }