import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'history',
})
export class History {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 200,
    comment: '页面title',
    nullable: true,
  })
  title: string;
  @Column({ comment: '页面地址' })
  url: string;
  @Column({ length: 255, comment: '页面域名', nullable: true })
  domain: string;
  @Column({ comment: '端口号', nullable: true })
  port: number;

  @Column({ length: 50, comment: '访问设备', nullable: true })
  os: string;
  @Column({ length: 50, comment: '浏览器类型', nullable: true })
  browserType: string;

  @Column({ comment: '经度', nullable: true })
  longitude: number;
  @Column({ comment: '纬度', nullable: true })
  latitude: number;

  @CreateDateColumn()
  createdAt: Date;
}
