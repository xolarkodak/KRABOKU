import express from 'express';
import {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedMovies,
  addLikedMovie,
} from '../Controllers/UserController.js';
import { protect } from '../middlewares/Auth.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);

router.put('/', protect, updateUserProfile);
router.delete('/', protect, deleteUserProfile);
router.put('/password', protect, changeUserPassword);
router.get('/favorites', protect, getLikedMovies);
router.post('/favorites', protect, addLikedMovie);

export default router;
