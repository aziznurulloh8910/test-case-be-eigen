import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';

@Controller('borrows')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post('borrow')
  async borrowBook(
    @Body() body: { memberCode: string; bookCode: string },
  ): Promise<{ message: string; status: number; data: any }> {
    try {
      const result = await this.borrowService.borrowBook(
        body.memberCode,
        body.bookCode,
      );
      return {
        message: 'Book borrowed successfully',
        status: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('return')
  async returnBook(
    @Body() body: { memberCode: string; bookCode: string },
  ): Promise<{ message: string; status: number; data: any }> {
    try {
      const result = await this.borrowService.returnBook(
        body.memberCode,
        body.bookCode,
      );
      return {
        message: 'Book returned successfully',
        status: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('books')
  async checkBooks(): Promise<{
    message: string;
    status: number;
    data: any[];
  }> {
    const books = await this.borrowService.checkBooks();
    return {
      message: 'Books checked successfully',
      status: HttpStatus.OK,
      data: books,
    };
  }

  @Get('members')
  async checkMembers(): Promise<{
    message: string;
    status: number;
    data: any[];
  }> {
    const members = await this.borrowService.checkMembers();
    return {
      message: 'Members checked successfully',
      status: HttpStatus.OK,
      data: members,
    };
  }
}
