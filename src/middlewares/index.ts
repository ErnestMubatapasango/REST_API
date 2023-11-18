//creating user routers
import express from 'express'
import {get, merge} from "lodash"
import { getUsersBySessionToken } from '../db/users'

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { ids }= req.params
        const currentUserId = get(req, 'ídentity.id') as string

        if(!currentUserId) {
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== ids){
            return res.sendStatus(403);
        }

      return next();
    }

    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        //extract the session cookie
        const sessionToken = req.cookies['TAWANDA-AUTH'];

        if(!sessionToken){
          return  res.sendStatus(403);
        }

        const existingUser = await getUsersBySessionToken(sessionToken);

        if(!existingUser){
         return  res.sendStatus(403);
        }

        
        merge(req, {identity: existingUser});
        
        return next();

    }
    catch(error){
        console.log(error)
        return res.sendStatus(400);

    }

}