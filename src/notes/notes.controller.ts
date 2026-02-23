import { Controller, Post, Body, Get, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { UsersService } from '../users/users.service';

@Controller('notes')
export class NotesController {  
 constructor(
  private readonly notesService: NotesService,
  private readonly usersService: UsersService,
) {}
  @Post('create')
  async create(@Body() body: { userId: number; title: string; content: string }) {
    const user = await this.usersService.findById(body.userId);
    if (!user) throw new NotFoundException('User not found');
    return this.notesService.create(user, body.title, body.content);
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.notesService.findAll(user);
  }

  @Patch(':userId/:id')
  async update(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() data: { title?: string; content?: string },
  ) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const updated = await this.notesService.update(id, user, data);
    if (!updated) throw new NotFoundException('Note not found or not owned by user');
    return updated;
  }

  @Delete(':userId/:id')
  async remove(@Param('userId') userId: number, @Param('id') id: number) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const removed = await this.notesService.remove(id, user);
    if (!removed) throw new NotFoundException('Note not found or not owned by user');
    return { message: 'Note deleted successfully' };
  }
}