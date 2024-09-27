import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { BorrowModule } from './borrow/borrow.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [BookModule, MemberModule, BorrowModule],
  providers: [PrismaService],
})
export class AppModule {}