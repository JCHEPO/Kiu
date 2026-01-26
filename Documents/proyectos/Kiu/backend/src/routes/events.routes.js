import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import Event from "../models/Event.js";

const router = express.Router();

// GET /api/events - Lista de eventos (solo usuarios logueados)
router.get("/", authenticate, async (req, res) => {
  try {
    const events = await Event.find().populate("creator", "email nombre apellido");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener eventos" });
  }
});

// POST /api/events - Crear evento (todos los usuarios logueados)
router.post("/", authenticate, async (req, res) => {
  const { title, date, description, location, maxParticipants } = req.body;
  try {
    const event = await Event.create({
      title,
      date,
      description,
      location,
      maxParticipants,
      creator: req.user.id
    });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Error al crear evento" });
  }
});

export default router;
