import { Router } from 'express';
import { Repository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import  CreateUsersService  from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';


const usersRouter = Router();

interface User {
    name: string;
    email: string;
    password: string;
}
const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {

    const { name, email, password }: User = request.body;
    
    const createUser = new CreateUsersService();

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
     const updateUserAvatar = new UpdateUserAvatarService();
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