import { Router } from 'express';
import { container } from 'tsyringe';
import  AuthenticateUserService  from '@modules/users/services/AuthenticateUserService';


interface User {
  email: string;
  password: string;
}

const sessionRouter = Router();


sessionRouter.post('/', async (request, response) => {
  
  const { email, password}: User = request.body;
  
  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token} = await authenticateUser.execute({
    email,
    password,
  });

delete user.password;

return response.json({user, token});


});

export default sessionRouter;