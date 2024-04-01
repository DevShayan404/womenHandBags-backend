import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('material')
export class Material {
  @PrimaryGeneratedColumn()
  materialId: number;

  @Column()
  materialName: string;
}
