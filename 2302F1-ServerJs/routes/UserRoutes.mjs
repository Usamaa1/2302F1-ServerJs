import express from 'express'
import { getUser } from '../controller/UserController.mjs';

export const UserRoute =  express.Router();



UserRoute.get('/user',getUser)





