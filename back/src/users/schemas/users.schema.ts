import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class Users extends Document {
  @Prop({ default: false, required: true }) 
  isDeleted: boolean;

  @Prop({ default: false, required: true }) 
  name: string;

  @Prop({ default: false, required: true, unique: true }) 
  email: string;

  @Prop({ default: false, required: true }) 
  password: string;

  @Prop({ default: 'CC', enum: ['CC', 'TI', 'CE'] }) 
  documentType: string;

  @Prop({ default: false, required: true, unique: true }) 
  documentNumber: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
