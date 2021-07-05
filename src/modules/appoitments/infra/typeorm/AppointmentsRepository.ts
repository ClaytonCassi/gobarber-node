import Appointment from './entities/Appointment'
import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository';
import ICreateAppoitmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository  implements IAppointmentsRepository{
 
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate( date: Date): Promise<Appointment | undefined> {
    //const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment || null;

  }
  
  public async create({date, provider_id}: ICreateAppoitmentDTO): Promise<Appointment> {
     const appointment = this.ormRepository.create({provider_id, date});
     
     await this.ormRepository.save(appointment);

     return appointment;
  }

}

export default AppointmentsRepository;