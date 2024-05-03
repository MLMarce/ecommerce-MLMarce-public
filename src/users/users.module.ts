import { Module} from "@nestjs/common";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { UserRepository } from "./users.repositosy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})

export class UserModule {}