import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book, Member, Borrow } from '@prisma/client';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  async borrowBook(memberCode: string, bookCode: string): Promise<Borrow> {
    const member = await this.prisma.member.findUnique({
      where: { code: memberCode },
      include: { borrows: { where: { return_date: null } } },
    });

    if (!member) {
      throw new BadRequestException('Member not found');
    }

    if (member.penalty_until && member.penalty_until > new Date()) {
      throw new BadRequestException('Member is currently penalized');
    }

    if (member.borrows.length >= 2) {
      throw new BadRequestException('Member has already borrowed 2 books');
    }

    const book = await this.prisma.book.findUnique({
      where: { code: bookCode },
      include: { borrows: { where: { return_date: null } } },
    });

    if (!book) {
      throw new BadRequestException('Book not found');
    }

    if (book.borrows.length > 0) {
      throw new BadRequestException('Book is currently borrowed');
    }

    return this.prisma.borrow.create({
      data: {
        book: { connect: { id: book.id } },
        member: { connect: { id: member.id } },
      },
    });
  }

  async returnBook(memberCode: string, bookCode: string): Promise<Borrow> {
    const borrow = await this.prisma.borrow.findFirst({
      where: {
        member: { code: memberCode },
        book: { code: bookCode },
        return_date: null,
      },
      include: { member: true, book: true },
    });

    if (!borrow) {
      throw new BadRequestException('Borrow record not found');
    }

    const returnDate = new Date();
    const borrowDuration = Math.floor((returnDate.getTime() - borrow.borrow_date.getTime()) / (1000 * 60 * 60 * 24));

    let penaltyUntil: Date | null = null;
    if (borrowDuration > 7) {
      penaltyUntil = new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
    }

    return this.prisma.borrow.update({
      where: { id: borrow.id },
      data: {
        return_date: returnDate,
        member: {
          update: {
            penalty_until: penaltyUntil,
          },
        },
      },
    });
  }

  async checkBooks(): Promise<any[]> {
    const books = await this.prisma.book.findMany({
      include: {
        borrows: {
          where: { return_date: null },
        },
      },
    });

    return books.map(book => ({
      code: book.code,
      title: book.title,
      author: book.author,
      availableCount: book.stock - book.borrows.length,
    }));
  }

  async checkMembers(): Promise<any[]> {
    const members = await this.prisma.member.findMany({
      include: {
        borrows: {
          where: { return_date: null },
        },
      },
    });

    return members.map(member => ({
      code: member.code,
      name: member.name,
      borrowedBooksCount: member.borrows.length,
      penaltyUntil: member.penalty_until,
    }));
  }
}