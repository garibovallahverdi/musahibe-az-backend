

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repository/user.repository';


const userService = new UserService();


passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await userService.validateUser(username, password);
        return done(null, user);
      } catch (err) {

        if(err instanceof Error) {
            return done(null, false, { message : err?.message });
        }
        return done(null, false )
      }
    })
  );
  
  // Kullanıcıyı oturum açtıktan sonra serialize ve deserialize işlemleri
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await new UserRepository().findUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  export default passport
