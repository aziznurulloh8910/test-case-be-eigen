import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book, Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  async getAllBooks(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async getBookByCode(code: string): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { code } });
  }

  async updateBook(code: string, data: Prisma.BookUpdateInput): Promise<Book> {
    return this.prisma.book.update({
      where: { code },
      data,
    });
  }

  async deleteBook(code: string): Promise<Book> {
    return this.prisma.book.delete({ where: { code } });
  }
}