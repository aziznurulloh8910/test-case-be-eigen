import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Member, Prisma } from '@prisma/client';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async createMember(data: Prisma.MemberCreateInput): Promise<Member> {
    return this.prisma.member.create({ data });
  }

  async getAllMembers(): Promise<Member[]> {
    return this.prisma.member.findMany();
  }

  async getMemberByCode(code: string): Promise<Member | null> {
    return this.prisma.member.findUnique({ where: { code } });
  }

  async updateMember(code: string, data: Prisma.MemberUpdateInput): Promise<Member> {
    return this.prisma.member.update({
      where: { code },
      data,
    });
  }

  async deleteMember(code: string): Promise<Member> {
    return this.prisma.member.delete({ where: { code } });
  }
}