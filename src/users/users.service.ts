import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repositosy";
import { UpdateUserDto } from "src/dtos/users.dto";

@Injectable()

export class UserService {
    constructor(private userRepository: UserRepository){}
    async getUsers() {
        return await this.userRepository.getUsers();
    }
    
    async getUserById(id: string) {
        return await this.userRepository.getUserById(id);
    }
    
    async updateUser(id: string, user: UpdateUserDto) {
        return await this.userRepository.updateUser(id, user);
    }
    
    async deleteUser(id: string) {
        return await this.userRepository.deleteUser(id);
    }
}