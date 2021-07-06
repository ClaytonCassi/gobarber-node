import {Request, Response } from 'express';
import { container } from 'tsyringe';

import  CreateUsersService  from '@modules/users/services/CreateUserService';

interface User {
    name: string;
    email: string;
    password: string;
}
export default class UsersController {
    public async create(response: Response , request: Request): Promise<Response> {
   

        const { name, email, password }: User = request.body;
    
        const createUser = container.resolve(CreateUsersService);
    
        const user = await createUser.execute({
            name,
            email,
            password,
        });
    
        delete user.password;
    
    return response.json(user);
    }
}