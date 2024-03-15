import { Inject, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  @InjectRepository(History)
  private userRepository: Repository<History>;

  async create(data: CreateHistoryDto) {
    const newHistory = new History();
    ({
      title: newHistory.title,
      url: newHistory.url,
      domain: newHistory.domain,
      port: newHistory.port,
      os: newHistory.os,
      browserType: newHistory.browserType,
      longitude: newHistory.longitude,
      latitude: newHistory.latitude,
    } = data);
    try {
      await this.userRepository.save(newHistory);
      return '保存成功';
    } catch (error) {
      return error;
    }
  }

  async list() {
    let res = await this.userRepository.find();
    console.log(res);
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  async search(keyword: string) {
    let res = await this.userRepository.find({
      where: [{ title: Like(`%${keyword}%`) },{url: Like(`%${keyword}%`)}],
    });
    console.log(res);
    
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
