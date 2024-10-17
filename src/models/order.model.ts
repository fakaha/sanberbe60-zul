import mongoose, { Types } from "mongoose";

export interface OrderItem {
  _id?: Types.ObjectId;
  productId: Types.ObjectId;
  qty: number;
  price: number;
}

export interface Order {
  _id?: Types.ObjectId;
  grandTotal: number;
  status: "pending" | "completed" | "cancelled";
  createdBy: Types.ObjectId;
  orderItems: OrderItem[];
}

const Schema = mongoose.Schema;

const OrdersSchema = new Schema<Order>(
  {
    grandTotal: {
      type: Schema.Types.Number,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true,
          },
          qty: {
            type: Schema.Types.Number,
            required: true,
            min: [1, "Minimal order 1 item"],
            max: 5,
          },
          price: {
            type: Schema.Types.Number,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrdersModel = mongoose.model("Orders", OrdersSchema);

export default OrdersModel;
