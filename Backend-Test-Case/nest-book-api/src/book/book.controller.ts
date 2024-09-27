import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book, Prisma } from '@prisma/client';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(
    @Body() data: Prisma.BookCreateInput,
  ): Promise<{ message: string; status: number; data: Book }> {
    const book = await this.bookService.createBook(data);
    return {
      message: 'Book created successfully',
      status: HttpStatus.CREATED, // Status code for created
      data: book,
    };
  }

  @Get()
  async getAllBooks(): Promise<{
    message: string;
    status: number;
    data: Book[];
  }> {
    const books = await this.bookService.getAllBooks();
    return {
      message: 'Books retrieved successfully',
      status: HttpStatus.OK,
      data: books,
    };
  }

  @Get(':code')
  async getBookByCode(
    @Param('code') code: string,
  ): Promise<{ message: string; status: number; data: Book }> {
    const book = await this.bookService.getBookByCode(code);
    if (!book) {
      throw new NotFoundException(`Book with code ${code} not found`);
    }
    return {
      message: 'Book retrieved successfully',
      status: HttpStatus.OK, // Status code for OK
      data: book,
    };
  }


  @Put(':code')
  async updateBook(
    @Param('code') code: string,
    @Body() data: Prisma.BookUpdateInput,
  ): Promise<{ message: string; status: number; data: Book }> {
    const book = await this.bookService.updateBook(code, data);
    return {
      message: 'Book updated successfully',
      status: HttpStatus.OK,
      data: book,
    };
  }


  @Delete(':code')
  async deleteBook(
    @Param('code') code: string,
  ): Promise<{ message: string; status: number }> {
    await this.bookService.deleteBook(code);
    return {
      message: 'Book deleted successfully',
      status: HttpStatus.NO_CONTENT,
    };
  }

}
