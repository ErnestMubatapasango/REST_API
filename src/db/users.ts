//this is our user schema and user model

import mongoose from "mongoose";

//user schema definition
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication : {
        password: {type:String, required: true, select: false},
        salt: {type: String, required: true, select: false},
        sessionToken: {type: String, required: false, select: false}
    }
});

//turning the schema into a model
//We are going to call the model : User
export const UserModel = mongoose.model('User', UserSchema)
//create some custom actions, they are going to be used in controllers and it is best to keep them abstracted( hidden)

export const getUsers = () => UserModel.find();
//This action we going to use it during authentication of users e.g user registration , login
export const getUserByEmail = (email: string) => UserModel.findOne({email})
//This action is for checking whether the user is logged in or not
export const getUsersBySessionToken =  (sessionToken: string) => UserModel.findOne({'authentication.sesssionToken': sessionToken})

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id)

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)

