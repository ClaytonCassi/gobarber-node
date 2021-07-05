import { container } from 'tsyringe';
import AppointmentsRepository from '@modules/appoitments/infra/typeorm/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);