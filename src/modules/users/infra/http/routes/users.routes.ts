import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { container } from 'tsyringe';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import  CreateUsersService  from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';


interface User {
    name: string;
    email: string;
    password: string;
}

const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.post('/', async (request, response) => {

   

    const { name, email, password }: User = request.body;
    
    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

return response.json(user);

});

usersRouter.patch('/avatar',ensureAuthenticated, upload.single('avatar'), async (request, response) => {

   try {
    
     const updateUserAvatar = container.resolve(UpdateUserAvatarService);
     const user = await updateUserAvatar.execute({
         user_id: request.user.id,
         avatarFilename: request.file.filename,
     });

     delete user.password;

     return response.json(user);

   } catch(err) {
     return response.status(400).json({error: err.message});
   }
});

export default usersRouter;