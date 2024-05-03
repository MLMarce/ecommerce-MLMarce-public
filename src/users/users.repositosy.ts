import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUserDto, CreateUserDto } from "src/dtos/users.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()

export class UserRepository {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async getUsers() {
        const users = await this.userRepository.find({ select: ['id', 'name', 'email', 'address', 'phone', 'country', 'city'], relations: { orders: true } });

        return users
    }

    async getUserById(id: string): Promise<Omit<User, 'password'>> {
        const user = await this.userRepository.findOne({ where: { id }, select: ['id', 'name', 'email', 'address', 'phone', 'country', 'city'], relations: { orders: true } })
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async createUser(user: CreateUserDto): Promise<User> {
        const newUser = new User()
        newUser.name = user.name
        newUser.email = user.email
        newUser.password = user.password
        newUser.address = user.address
        newUser.birthdate = user.birthdate
        newUser.phone = user.phone
        newUser.city = user.city
        newUser.country = user.country
        await this.userRepository.save(newUser);
        const createdUser = await this.userRepository.findOne({ where: { email: newUser.email }, select: ['id', 'name', 'email', 'birthdate', 'address', 'phone', 'country', 'city'] })

        return createdUser;
    }

    async updateUser(id: string, user: UpdateUserDto) {
        const oldUser = await this.userRepository.findOneBy({ id });

        if (!oldUser) throw new NotFoundException('User not found');

        await this.userRepository.update(id, user)



        return oldUser.id;
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) return "User not found";
        await this.userRepository.delete(user.id)
        return id;
    }

    getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email: email });
    }
}