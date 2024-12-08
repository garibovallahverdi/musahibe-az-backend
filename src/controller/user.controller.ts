import { CreateUserDto, LoginDto } from "../dto/user.dto";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import passport from "passport"; 
import { Role } from "@prisma/client";


interface RegisterRequestBody {
    username: string;
    password: string;
  }

export class UserController {
private userService = new UserService()
    async register (req: Request, res: Response, next: NextFunction){

        const { username,password } = req.body as unknown as RegisterRequestBody
        try {
            const dto =new CreateUserDto({username,password})
            const createdUser = await this.userService.createUser(dto)
            
            res.status(200).json({
                message: "User registered successfully",
                user: createdUser,
              });
            
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        const loginDto = new LoginDto({ username, password });
    
        passport.authenticate("local", (err:any, user:any, info:any) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(401).json({ message: info?.message || "Unauthorized" });
          }
    
          req.login(user, (err) => {
            if (err) {
              return next(err);
            }
            return res.json({ message: "Login successful", user });
          });
        })(req, res, next);
      }


      async givePermission (req: Request, res: Response, next: NextFunction){

        const { id,role } = req.body 
        try {
            const updatedUser = await this.userService.givePermission(id, role)
            
            res.status(200).json({
                message: "User role updated successfully",
                user: updatedUser,
              });
            
        } catch (error) {
            next(error)
        }
    }
}