import {getRepository } from 'typeorm';
import User from "../infra/typeorm/entities/User";
import { hash } from "bcryptjs";
import AppError from '@shared/errors/AppError';

interface Request {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    public async execute({name, email, password }: Request): Promise<User> {
     const usersRepository = getRepository(User);
     const checkUserExist = await usersRepository.findOne({
         where: {email},
     });

     if (checkUserExist) {
         throw new AppError('Email addres already used');
     }

     const hashedPassword = await hash(password, 8);

     const user = usersRepository.create({
         name,
         email,
         password: hashedPassword,
     });

     await usersRepository.save(user);

     return user;
    }
}

export default CreateUserService;