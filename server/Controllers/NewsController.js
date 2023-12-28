import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/NewsModel.js";
import asyncHandler from "express-async-handler";

const importMovies = asyncHandler(async (req, res) => {
  await Movie.deleteMany({});
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
});

const getNews = asyncHandler(async (req, res) => {
  try {
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    const page = Number(req.query.pageNumber) || 1; 
    const limit = 12; 
    const skip = (page - 1) * limit; 
    
    const movies = await Movie.find(query)
      .skip(skip)
      .limit(limit);

    const count = await Movie.countDocuments(query);

    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit), 
      totalMovies: count, 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const getMovieById = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    }
    else {
      res.status(404);
      throw new Error("Фільм не знайдено");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ rate: -1 });
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Ви вже переглядали цей фільм");
      }
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
      movie.reviews.push(review);
      movie.numberOfReviews = movie.reviews.length;

      movie.rate =
        Math.floor(movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length);

      await movie.save();
      res.status(201).json({
        message: "Відгук додано",
      });
    } else {
      res.status(404);
      throw new Error("Фільм не знайдено");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateMovie = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (movie) {
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      const updatedMovie = await movie.save();
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Фільм не знайдено");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await movie.remove();
      res.json({ message: "Фільм видалено" });
    }
    else {
      res.status(404);
      throw new Error("Фільм не знайдено");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    
    await Movie.deleteMany({});
    res.json({ message: "Всі фільми вилучено" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createMovie = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      userId1: req.user._id,
    });

    if (movie) {
      const createdMovie = await movie.save();
      res.status(201).json(createdMovie);
    } else {
      res.status(400);
      throw new Error("Неправильні дані фільму");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  importMovies,
  getNews,
  getMovieById,
  getTopRatedMovies,
  getRandomMovies,
  createMovieReview,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
  createMovie,
};
