import express from "express";
import SpinGamesController from "./controllers";
import { CreateRequest, UpdateRequest } from "./request";
import { v4 as uuid } from "uuid";
import { type } from "os";
const router = express.Router();
const controller = new SpinGamesController();

router.get("/ping", async (_req, res) => {
  res.send("pingpong");
});
router.get("/spin-games", async (_req, res) => {
  try {
    const response = await controller.getAll();
    if (response.length == 0) {
      return res.status(404).json({ status: "NOT_FOUND", data: response });
    }
    return res.status(200).json({ status: "OK", data: response });
  } catch (error) {
    return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error });
  }
});

router.get("/spin-games/:id", async (_req, res) => {
  const { id } = _req.params;
  try {
    const response = await controller.getOne(id);
    if (!response) {
      return res
        .status(404)
        .json({ status: "NOT_FOUND", data: null, message: "error not found!" });
    }
    return res
      .status(200)
      .json({ status: "OK", data: response, message: "found one!" });
  } catch (error) {
    return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error });
  }
});

router.put("/spin-games/:id", async (_req, res) => {
  const { id } = _req.params;
  const body = _req.body;
  if (typeof body.name !== "string") {
    return res.status(403).json({
      status: "FORBIDDEN",
      data: null,
      message: "name must be string ",
    });
  }
  if (body.name.length < 5) {
    return res.status(403).json({
      status: "FORBIDDEN",
      data: null,
      message: "name must minimal have 5 char",
    });
  }
  const request: UpdateRequest = { name: body.name };
  try {
    const response = await controller.update(id, request);
    if (!response) {
      return res
        .status(404)
        .json({ status: "NOT_FOUND", data: null, message: "error not found!" });
    }
    return res
      .status(200)
      .json({ status: "OK", data: response, message: `spin-games updated !` });
  } catch (error) {
    return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error });
  }
});

router.delete("/spin-games/:id", async (_req, res) => {
  const { id } = _req.params;
  try {
    const response = await controller.delete(id);
    if (!response) {
      return res
        .status(404)
        .json({ status: "NOT_FOUND", data: null, message: "error not found!" });
    }

    return res.status(200).json({
      status: "OK",
      data: response,
      message: `spin-games has been deleted !`,
    });
  } catch (error) {
    return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error });
  }
});

router.post("/spin-games/", async (_req, res) => {
  try {
    const body = _req.body;
    if (typeof body.name !== "string") {
      return res.status(403).json({
        status: "FORBIDDEN",
        data: null,
        message: "name must be string ",
      });
    }
    if (body.name.length < 5) {
      return res.status(403).json({
        status: "FORBIDDEN",
        data: null,
        message: "name must minimal have 5 char",
      });
    }
    const request: CreateRequest = {
      id: body.id ?? uuid(),
      name: body.name,
    };
    const response = await controller.create(request);
    if (!response) {
      return res
        .status(404)
        .json({ status: "NOT_FOUND", data: null, message: "error not found!" });
    }

    return res.status(201).json({
      status: "OK",
      data: response,
      message: `spin-game is created !`,
    });
  } catch (error) {
    return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error });
  }
});

router.post("/spin/:id", async (_req, res) => {
  const { id } = _req.params;
  try {
    const response = await controller.spin(id);
    if (!response) {
      return res
        .status(404)
        .json({ status: "NOT_FOUND", data: null, message: "error not found!" });
    }

    return res.status(201).json({
      status: "OK",
      data: response,
      message: `spinned !`,
    });
  } catch (error) {
    return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error });
  }
});
router.get("/spin-history/:id", async (_req, res) => {
  try {
    const { id } = _req.params;
    console.log(id);
    const response = await controller.history(id);
    if (!response) {
      return res
        .status(404)
        .json({ status: "NOT_FOUND", data: null, message: "error not found!" });
    }
    return res
      .status(200)
      .json({ status: "OK", data: response, message: "Spin history found!" });
  } catch (error) {
    return res.status(500).json({ status: "INTERNAL_SERVER_ERROR", error });
  }
});

export default router;
