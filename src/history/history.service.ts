import { Inject, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import {History} from './entities/history.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  @InjectRepository(History)
  private userRepository:Repository<History>

  async create(data: CreateHistoryDto) {
    const newHistory = new History();
    ({
      title: newHistory.title,
      url: newHistory.url,
      domain: newHistory.domain,
      port:newHistory.port,
      os:newHistory.os,
      browserType:newHistory.browserType,
      longitude:newHistory.longitude,
      latitude:newHistory.latitude,
    } = data);
    try {
      await this.userRepository.save(newHistory)
      return '保存成功'
    } catch (error) {
      return error
    }
  }

  async findAll() {
    let res = await this.userRepository.find()
    console.log(res);
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  search(keyword:string){
    return 
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
