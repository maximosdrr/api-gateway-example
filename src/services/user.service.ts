import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/interfaces/auth';

@Injectable()
export class UsersService {
  users: CreateUserDto[] = [];

  create(user: CreateUserDto) {
    this.users.push(user);
    return user;
  }

  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  update(id: string, data: Partial<CreateUserDto>) {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    const index = this.users.indexOf(user);
    this.users[index] = { ...user, ...data };

    return this.users[index];
  }

  findById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
