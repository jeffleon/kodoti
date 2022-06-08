import { Response } from 'express';
import { ApplicationException } from "../exception/aplication.exception";

export abstract class BaseController {
    handleException(err: any, res: Response){
        if(err instanceof ApplicationException){
            res.status(400).send();
        } else {
            throw new Error(err);
        }
    }
}