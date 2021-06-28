import { Router } from 'express';
import  AuthenticateUserService  from '../services/AuthenticateUserService'

interface User {
  email: string;
  password: string;
}

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {

  const { email, password}: User = request.body;
  
  const authenticateUserService = new AuthenticateUserService();

  const { user, token} = await authenticateUserService.execute({
    email,
    password,
  });

delete user.password;

return response.json({user, token});


});

export default sessionRouter;