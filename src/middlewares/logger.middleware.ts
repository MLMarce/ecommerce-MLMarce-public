import { NextFunction, Request, Response } from "express";


export  function loggerGlobal(req: Request, res: Response, next: NextFunction){
        const date = new Date();
        const formatDate = date.getDate() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getFullYear();
        const formatTime = date.getHours() + ':' + (date.getMinutes() > 9 ? date.getMinutes(): '0' + date.getMinutes());

        console.log(`estas ejecutando un metodo ${req.method} en la ruta ${req.url}, el dia ${formatDate} a las ${formatTime}hs`);
        next();
}