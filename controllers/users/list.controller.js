import express from "express";
import { UserModel } from "../../model/user.model.js";

export const listUserController = {
  async list(req, res) {
    try {
      const usersList = await UserModel.find({});
      return res.status(200).json(usersList);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
