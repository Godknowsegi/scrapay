import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  async create(createBookInput: CreateBookInput) {
    const Book = await this.prisma.book.create({
      data: createBookInput,
    });

    return Book;
  }

  async findAll() {
    const Book = await this.prisma.book.findMany();
    return Book;
  }

  async findOne(id: number) {
    const Book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!Book) {
      throw new Error('Book not found');
    }

    return Book;
  }

  async update(id: number, updateBookInput: UpdateBookInput) {
    const checkBook = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!checkBook) {
      throw new Error('Book not found');
    }
    const Book = await this.prisma.book.update({
      where: {
        id,
      },
      data: {
        description: updateBookInput.description,
        name: updateBookInput.name,
      },
    });

    return Book;
  }

  async remove(id: number) {
    const checkBook = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!checkBook) {
      throw new Error('Book not found');
    }
    const Book = await this.prisma.book.delete({
      where: {
        id,
      },
    });
    if (!Book) {
      throw new Error('Book not found');
    }
    return Book;
  }
}
