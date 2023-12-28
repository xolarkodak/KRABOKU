import express from 'express';
import * as newsController from '../Controllers/NewsController.js';
import { protect, admin } from '../middlewares/Auth.js';

const router = express.Router();

router.get('/', newsController.getNews);
router.get('/:id', newsController.getNewsById);
router.get('/rated/top', newsController.getTopRatedNews);
router.get('/random/all', newsController.getRandomNews);

router.post('/:id/reviews', protect, newsController.createNewsReview);

router.put('/:id', protect, admin, newsController.updateNews);
router.delete('/:id', protect, admin, newsController.deleteNews);
router.delete('/', protect, admin, newsController.deleteAllNews);
router.post('/', protect, admin, newsController.createNews);

export default router;
