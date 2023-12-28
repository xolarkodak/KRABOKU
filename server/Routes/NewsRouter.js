import express from "express";
import * as newsController from "../Controllers/NewsController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/import", newsController.importMovies);
router.get("/", newsController.getNews);
router.get("/:id", newsController.getMovieById);
router.get("/rated/top", newsController.getTopRatedMovies);
router.get("/random/all", newsController.getRandomMovies);

router.post("/:id/reviews", protect, newsController.createMovieReview);

router.put("/:id", protect, admin, newsController.updateMovie);
router.delete("/:id", protect, admin, newsController.deleteMovie);
router.delete("/", protect, admin, newsController.deleteAllMovies);
router.post("/", protect, admin, newsController.createMovie);

export default router;
