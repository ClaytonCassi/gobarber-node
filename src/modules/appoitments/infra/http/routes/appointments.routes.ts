import 'reflect-metadata';
import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'



const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();


appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//    const appointmentsRepository = container.resolve(CreateAppointmentService)
//    const  appointments = await appointmentsRepository.findByDate();
   
//    return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;