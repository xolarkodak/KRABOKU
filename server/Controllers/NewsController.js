import News from '../Models/NewsModel.js';
import asyncHandler from 'express-async-handler';

const getNews = asyncHandler(async (req, res) => {
  try {
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: 'i' } }),
    };

    const page = Number(req.query.pageNumber) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const news = await News.find(query).skip(skip).limit(limit);

    const count = await News.countDocuments(query);

    res.json({
      news,
      page,
      pages: Math.ceil(count / limit),
      totalNews: count,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getNewsById = asyncHandler(async (req, res) => {
  try {
    const news_ = await News.findById(req.params.id);
    if (news_) {
      res.json(news_);
    } else {
      res.status(404);
      throw new Error('Новину не знайдено');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getTopRatedNews = asyncHandler(async (req, res) => {
  try {
    const news = await News.find({}).sort({ rate: -1 });
    res.json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getRandomNews = asyncHandler(async (req, res) => {
  try {
    const news = await News.aggregate([{ $sample: { size: 8 } }]);
    res.json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createNewsReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const news_ = await News.findById(req.params.id);

    if (news_) {
      const alreadyReviewed = news_.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString(),
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Ви вже переглядали цю новину');
      }
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
      news_.reviews.push(review);
      news_.numberOfReviews = news_.reviews.length;

      news_.rate = Math.floor(
        news_.reviews.reduce((acc, item) => item.rating + acc, 0) / news_.reviews.length,
      );

      await news_.save();
      res.status(201).json({
        message: 'Відгук додано',
      });
    } else {
      res.status(404);
      throw new Error('Новину не знайдено');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateNews = asyncHandler(async (req, res) => {
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

    const news_ = await News.findById(req.params.id);

    if (news_) {
      news_.name = name || news_.name;
      news_.desc = desc || news_.desc;
      news_.image = image || news_.image;
      news_.titleImage = titleImage || news_.titleImage;
      news_.rate = rate || news_.rate;
      news_.numberOfReviews = numberOfReviews || news_.numberOfReviews;
      news_.category = category || news_.category;
      news_.time = time || news_.time;
      news_.language = language || news_.language;
      news_.year = year || news_.year;
      news_.video = video || news_.video;
      news_.casts = casts || news_.casts;

      const updatedNews = await news_.save();
      res.status(201).json(updatedNews);
    } else {
      res.status(404);
      throw new Error('Новину не знайдено');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteNews = asyncHandler(async (req, res) => {
  try {
    const news_ = await News.findById(req.params.id);
    if (news_) {
      await news_.remove();
      res.json({ message: 'Новину видалено' });
    } else {
      res.status(404);
      throw new Error('Новину не знайдено');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteAllNews = asyncHandler(async (req, res) => {
  try {
    await News.deleteMany({});
    res.json({ message: 'Всі новини вилучено' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createNews = asyncHandler(async (req, res) => {
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

    const news_ = new News({
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

    if (news_) {
      const createdNews = await news_.save();
      res.status(201).json(createdNews);
    } else {
      res.status(400);
      throw new Error('Неправильні дані новини');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  getNews,
  getNewsById,
  getTopRatedNews,
  getRandomNews,
  createNewsReview,
  updateNews,
  deleteNews,
  deleteAllNews,
  createNews,
};
