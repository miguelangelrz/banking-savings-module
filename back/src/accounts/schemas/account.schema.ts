import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 
export class Account extends Document {
  @Prop({ required: true, unique: true }) 
  accountNumber: string;

  @Prop({ required: true, default: 0 }) 
  balance: number;

  @Prop({ required: true, enum: ['USD', 'COP', 'EUR'] }) 
  currency: string;

  @Prop({ required: true }) 
  holderId: string;

  @Prop({ default: false }) 
  isDeleted: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Account);