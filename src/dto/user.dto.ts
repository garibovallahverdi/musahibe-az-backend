import { Role } from "@prisma/client";

export class CreateUserDto {
     username:string;
     password:string;
     role:Role;

     constructor(data: Partial<CreateUserDto>){
        this.username=data.username!  ;
        this.password=data.password!;
        this.role=data.role || Role.EDITOR;
     }
}

export class UserDTO {
   id:string
   username:string;
   password:string;
   role:Role;

   constructor(data: Partial<UserDTO>){
      this.id=data.id!;
      this.username=data.username!  ;
      this.password=data.password!;
      this.role=data.role || Role.EDITOR;
   }
}

export class LoginDto {
   username: string;
   password: string;

 
   constructor(data: { username: string; password: string }) {
     this.username = data.username;
     this.password = data.password;
   }
 }