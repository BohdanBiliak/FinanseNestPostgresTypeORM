import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";
import {IUser} from "../types/types";
@Injectable()
export class AuthService {
constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
) {
}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user) {
      const passwordIsMatch = await argon2.verify(user.password, password);
      if (passwordIsMatch) {
        return user;

      }
    }
    throw new BadRequestException('Invalid user or password');
  }
  async login(user: IUser) {
    const {id, email} = user;
    return {
      id, email, token: this.jwtService.sign({id: user.id, email: user.email}),
    };
  }
}
