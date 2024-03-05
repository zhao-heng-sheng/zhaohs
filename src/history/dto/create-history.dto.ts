import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsPort, IsString} from 'class-validator'
export class CreateHistoryDto {
  @ApiPropertyOptional()
  title?:string;
  @IsNotEmpty({
    message:'url不能为空'
  })
  @IsString()
  @ApiProperty()
  url:string;
  @IsNotEmpty({
    message:'域名不能为空'
  })
  @IsString()
  @ApiProperty()
  domain:string;
  @ApiPropertyOptional()
  port?:number;
  @ApiPropertyOptional()
  os?:string;
  @ApiPropertyOptional()
  browserType?:string;
  @ApiPropertyOptional()
  longitude?:number;
  @ApiPropertyOptional()
  latitude?:number;
}
