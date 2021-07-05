import User from "../infra/typeorm/entities/User";
import IcreateUserDTO from "../dtos/ICreateUsersDTO";

export default interface IUsersInterface {
   findById( id: string): Promise<User | undefined>;
   findByEmail(email: string): Promise<User| undefined>
   create(data: IcreateUserDTO): Promise<User>;
   save(user: User): Promise<User>;
}