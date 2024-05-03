import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { AuthGuard } from "src/guards/auth.guard";
import { UpdateUserDto } from "src/dtos/users.dto";
import { Roles } from "src/decorators/roles.decorators";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/guards/roles.guards";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')

export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    async getAllUsers() {
        return await this.userService.getUsers();
    }

    @ApiBearerAuth()
    @Get('/:id')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.userService.getUserById(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UpdateUserDto) {
        return await this.userService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return await this.userService.deleteUser(id);
    }
}