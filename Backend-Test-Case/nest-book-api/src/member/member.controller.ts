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
  BadRequestException,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Member, Prisma } from '@prisma/client';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async createMember(
    @Body() data: Prisma.MemberCreateInput,
  ): Promise<{ message: string; status: number; data: Member }> {
    try {
      const member = await this.memberService.createMember(data);
      return {
        message: 'Member created successfully',
        status: HttpStatus.CREATED,
        data: member,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAllMembers(): Promise<{
    message: string;
    status: number;
    data: Member[];
  }> {
    try {
      const members = await this.memberService.getAllMembers();
      return {
        message: 'Members retrieved successfully',
        status: HttpStatus.OK,
        data: members,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':code')
  async getMemberByCode(
    @Param('code') code: string,
  ): Promise<{ message: string; status: number; data: Member }> {
    try {
      const member = await this.memberService.getMemberByCode(code);
      if (!member) {
        throw new NotFoundException(`Member with code ${code} not found`);
      }
      return {
        message: 'Member retrieved successfully',
        status: HttpStatus.OK,
        data: member,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':code')
  async updateMember(
    @Param('code') code: string,
    @Body() data: Prisma.MemberUpdateInput,
  ): Promise<{ message: string; status: number; data: Member }> {
    try {
      const updatedMember = await this.memberService.updateMember(code, data);
      return {
        message: 'Member updated successfully',
        status: HttpStatus.OK,
        data: updatedMember,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':code')
  async deleteMember(
    @Param('code') code: string,
  ): Promise<{ message: string; status: number }> {
    try {
      await this.memberService.deleteMember(code);
      return {
        message: 'Member deleted successfully',
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
