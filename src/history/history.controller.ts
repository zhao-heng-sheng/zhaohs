import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('浏览器浏览记录模块')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async create(@Body() req: CreateHistoryDto) {
    console.log(req);
    return await this.historyService.create(req);
  }

  @Get()
  list() {
    console.log('list');
    return this.historyService.list();
  }

  @Get('search')
  search(@Query('keyword') keyword: string) {
    console.log('search',keyword);
    
    return this.historyService.search(keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
