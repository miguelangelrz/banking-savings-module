import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class Account extends Document {
  @Prop({ required: true, unique: true }) 
  accountNumber: string;

  @Prop() 
  alias: string;

  @Prop({ required: true, default: 0 }) 
  balance: number;

  @Prop({ required: true, default: 'savings', enum: ['savings', 'current'] }) 
  accountType: string;

  @Prop({ required: true, default: 'COP', enum: ['USD', 'COP', 'EUR'] }) 
  currency: string;

  @Prop({ required: true, default: 'active', enum: ['active', 'inactive', 'frozen'] }) 
  status: string;

  @Prop({ required: true }) 
  holderId: string;

  @Prop({ default: false }) 
  isDeleted: boolean;

  @Prop({ default: null }) 
  deletedAt: Date | null;
}

export const UsersSchema = SchemaFactory.createForClass(Account);