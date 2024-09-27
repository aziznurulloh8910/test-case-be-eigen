import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book, Prisma } from '@prisma/client';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() data: Prisma.BookCreateInput): Promise<Book> {
    return this.bookService.createBook(data);
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Get(':code')
  async getBookByCode(@Param('code') code: string): Promise<Book> {
    const book = await this.bookService.getBookByCode(code);
    if (!book) {
      throw new NotFoundException(`Book with code ${code} not found`);
    }
    return book;
  }

  @Put(':code')
  async updateBook(
    @Param('code') code: string,
    @Body() data: Prisma.BookUpdateInput
  ): Promise<Book> {
    return this.bookService.updateBook(code, data);
  }

  @Delete(':code')
  async deleteBook(@Param('code') code: string): Promise<Book> {
    return this.bookService.deleteBook(code);
  }
}