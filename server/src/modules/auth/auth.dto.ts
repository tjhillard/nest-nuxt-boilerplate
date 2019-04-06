import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @ApiModelProperty()
  email: string;

  @Length(6)
  @ApiModelProperty()
  password: string;
}
