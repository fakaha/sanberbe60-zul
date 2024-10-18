import OrdersModel, { Order } from "../models/order.model";

export const create = async (payload: Order): Promise<Order> => {
  const result = await OrdersModel.create(payload);
  return result;
};

export const findAll = async (
  limit: number = 10,
  page: number = 1
): Promise<Order[]> => {
  const result = await OrdersModel.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .populate("productId");
  return result;
};

export const findOne = async (id: string): Promise<Order | null> => {
  const result = await OrdersModel.findById(id);
  return result;
};
