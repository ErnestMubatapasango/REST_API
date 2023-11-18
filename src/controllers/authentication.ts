//we first create the register controller
import { createUser, getUserByEmail } from 'db/users';
import express from 'express';
import { authentication, random } from 'helpers';

export const register = async(req: express.Request, res: express.Response) => {
    try{
        //here we are going to write the actual registration process
        const {email, password, username} = req.body;

        if(!email || !password || !username){ //here we are checking if the body has got these values and if  not we send an error 400
          return  res.sendStatus(400)
        }

        const existingUser = await getUserByEmail(email); //checking if user exists 

        if(existingUser){
            return res.sendStatus(400)
        }

        //if the user does not exist we first create a salt and then create the user

        const salt = random()
        
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json(user).end()
    }
    catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}