import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member, Prisma } from '@prisma/client';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async createMember(@Body() data: Prisma.MemberCreateInput): Promise<Member> {
    return this.memberService.createMember(data);
  }

  @Get()
  async getAllMembers(): Promise<Member[]> {
    return this.memberService.getAllMembers();
  }

  @Get(':code')
  async getMemberByCode(@Param('code') code: string): Promise<Member> {
    const member = await this.memberService.getMemberByCode(code);
    if (!member) {
      throw new NotFoundException(`Member with code ${code} not found`);
    }
    return member;
  }

  @Put(':code')
  async updateMember(
    @Param('code') code: string,
    @Body() data: Prisma.MemberUpdateInput
  ): Promise<Member> {
    return this.memberService.updateMember(code, data);
  }

  @Delete(':code')
  async deleteMember(@Param('code') code: string): Promise<Member> {
    return this.memberService.deleteMember(code);
  }
}