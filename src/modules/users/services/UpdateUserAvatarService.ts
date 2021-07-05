import User from '../infra/typeorm/entities/User';
import uploadConfig from '@config/upload'
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe';

interface Request {
    user_id: string;
    avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository)
    {}

    public async execute({ user_id, avatarFilename}: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

    if (!user){
        throw new AppError('Only authenticated users can change avatar.');
    }

    if(user.avatar) {
       //deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const avatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (avatarFileExists){
          await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;

    }  

}

export default UpdateUserAvatarService;