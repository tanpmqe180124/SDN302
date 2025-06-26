import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: string;
  products: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  totalAmount: number;
  status: 'unpaid' | 'paid';
  createdAt: Date;
}


const OrderSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
