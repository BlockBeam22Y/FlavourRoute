import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import avatarsService from '../services/avatarsService';

export const uploadAvatar = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const file = req.file;
  const { currentAvatar } = req.body;
  const avatar = await avatarsService.uploadAvatar(file, currentAvatar);

  res.status(201).json({ avatar });
});

export const deleteAvatar = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await avatarsService.deleteAvatar(id);

  res.status(200).end();
});