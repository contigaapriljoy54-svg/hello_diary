import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { User } from '../users/user.entity';

@Injectable()
export class NotesService {  // ✅ MUST have 'export'
  constructor(@InjectRepository(Note) private notesRepo: Repository<Note>) {}

  async create(user: User, title: string, content: string) {
    const note = this.notesRepo.create({ user, title, content });
    return this.notesRepo.save(note);
  }

  async findAll(user: User) {
    return this.notesRepo.find({ where: { user } });
  }

  async update(id: number, user: User, data: { title?: string; content?: string }) {
    const note = await this.notesRepo.findOne({ where: { id, user } });
    if (!note) return null;
    Object.assign(note, data);
    return this.notesRepo.save(note);
  }

  async remove(id: number, user: User) {
    const note = await this.notesRepo.findOne({ where: { id, user } });
    if (!note) return null;
    return this.notesRepo.remove(note);
  }
}