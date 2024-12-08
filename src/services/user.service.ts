import { Role } from "@prisma/client";
import { CreateUserDto } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";
import bcrypt from 'bcryptjs';


export class UserService {

    private  userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
      }

    async createUser (dto: CreateUserDto){
        try {
            const user = await this.userRepository.createUser(dto);
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error while creating user: " + error.message);
              }
              throw new Error("An unknown error occurred while register"); 
        }

       

    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findUserByUsername(username);
        if (!user) {
          throw new Error("User not found");
        }
    
        const isPasswordValid = password==user.password
        // await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
    
        return user;
      }

     async givePermission(id:string,role:Role){
        try{
            const user = await this.userRepository.findUserById(id)
            if(!user){
                throw new Error("User not found")
                }
                user.role = role
                await this.userRepository.updateUser(user)
                return user
                }catch(error){
                    if(error instanceof Error){
                        throw new Error("Error while giving permission: " + error.message);
                            }
                            throw new Error("An unknown error occurred while giving permission");
                            }
     }
}