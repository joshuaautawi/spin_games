import express from "express";
import SpinGamesController from "./controllers";
import { CreateRequest, UpdateRequest } from "./request";
import { v4 as uuid } from "uuid";
const router = express.Router();
const controller = new SpinGamesController();

router.get("/ping", async (_req, res) => {
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/spin-games", async (_req, res) => {
  try {
    const response = await controller.getAll();
    return res.status(200).json({ status: "OK", data: response });
  } catch (error) {
    return res.status(500).json({ status: "Internal Server Error", error });
  }
});

router.get("/spin-games/:id", async (_req, res) => {
  const { id } = _req.params;
  try {
    const response = await controller.getOne(id);
    return res.send(response);
  } catch (error) {
    return res.status(500).json({ status: "Internal Server Error", error });
  }
});

router.put("/spin-games/:id", async (_req, res) => {
  const { id } = _req.params;
  const body = _req.body;
  const request: UpdateRequest = { name: body.name };
  try {
    const response = await controller.update(id, request);
    if (!response) {
      return res
        .status(404)
        .json({ status: "NOT_FOUND", message: "error not found!" });
    }
    return res
      .status(200)
      .json({ status: "OK", data: response, message: `spin-games updated !` });
  } catch (error) {
    return res.status(500).json({ status: "Internal Server Error", error });
  }
});

router.delete("/spin-games/:id", async (_req, res) => {
  const { id } = _req.params;
  try {
    const response = await controller.delete(id);
    return res.status(200).json({
      status: "OK",
      data: response,
      message: `spin-games has been deleted !`,
    });
  } catch (error) {
    return res.status(500).json({ status: "Internal Server Error", error });
  }
});

router.post("/spin-games/", async (_req, res) => {
  try {
    const body = _req.body;
    const request: CreateRequest = {
      id: uuid(),
      name: body.name,
    };
    const response = await controller.create(request);
    return res.status(201).json({
      status: "OK",
      data: response,
      message: `spin-game is created !`,
    });
  } catch (error) {
    return res.status(500).json({ status: "Internal Server Error", error });
  }
});

router.post("/spin/:id", async (_req, res) => {
  const { id } = _req.params;
  try {
    const response = await controller.spin(id);
    return res.status(201).json({
      status: "OK",
      data: response,
      message: `spinned !`,
    });
  } catch (error) {
    return res.status(500).json({ status: "Internal Server Error", error });
  }
});

export default router;
