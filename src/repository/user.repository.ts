import { CreateUserDto, UserDTO } from "../dto/user.dto";
import prisma from "../config/db";


export class UserRepository {
     
    async createUser (data: CreateUserDto){
        return prisma.user.create({data})
    }

    async findUserByUsername(username: string): Promise<any | null> {
        // Veritabanından kullanıcıyı bul
        return prisma.user.findUnique({ where: { username } });
      }

      async findUserById(id: string) {
        return await prisma.user.findUnique({
          where: { id },
        });
}

async updateUser(user: UserDTO): Promise<UserDTO | null> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: user.id }, 
        data: {
          ...user, 
        },
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Could not update user.');
    }
  }
}