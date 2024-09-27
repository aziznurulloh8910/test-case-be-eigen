import { Controller, Post, Get, Body, Param, BadRequestException } from '@nestjs/common';
import { BorrowService } from './borrow.service';

@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  async borrowBook(@Body() body: { memberCode: string; bookCode: string }) {
    try {
      return await this.borrowService.borrowBook(body.memberCode, body.bookCode);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('return')
  async returnBook(@Body() body: { memberCode: string; bookCode: string }) {
    try {
      return await this.borrowService.returnBook(body.memberCode, body.bookCode);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('books')
  async checkBooks() {
    return this.borrowService.checkBooks();
  }

  @Get('members')
  async checkMembers() {
    return this.borrowService.checkMembers();
  }
}