import { Request, Response } from "express";
import { create, findAll, findOne } from "../services/order.service";
import { IPaginationQuery } from "../utils/interfaces";
import ProductsModel from "../models/products.model";
import mongoose, { Types } from "mongoose";

export default {
  async create(req: Request, res: Response) {
    try {
      const orderData = req.body;

      for (const item of orderData.orderItems) {
        const product = await ProductsModel.findById(item.productId);
        if (!product) {
          return res.status(404).json({ message: "Product tidak ada" });
        }
        if (item.qty > product.qty) {
          return res.status(400).json({
            message: `Stok tidak cukup untuk product ${product.name}`,
          });
        }
      }

      const order = await create(orderData);

      for (const item of orderData.orderItems) {
        await ProductsModel.findByIdAndUpdate(item.productId, {
          $inc: { qty: -item.qty },
        });
      }

      res.status(201).json({
        data: order,
        message: "Success create Order",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create order",
      });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search,
      } = req.query as unknown as IPaginationQuery;

      const query = {};

      if (search) {
        Object.assign(query, {
          createdBy: new mongoose.Types.ObjectId(search),
        });
      }

      const result = await findAll(limit, page, query);

      res.status(200).json({
        data: result,
        message: "Success get all products",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get order",
      });
    }
  },
};
