import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../utils/customError';

const avatarsPath = path.join(__dirname, '../public/avatars');

export default {
  async uploadAvatar(file?: Express.Multer.File, currentAvatar?: string): Promise<string> {
    if (!file) throw new CustomError('AVATAR_INVALID');

    const uuid = uuidv4();

    try {
      const image = sharp(file.path);
      const metadata = await image.metadata();

      if (metadata.width && metadata.width < 300 || metadata.height && metadata.height < 300)
        throw new CustomError('AVATAR_INVALID');

      await image
        .resize(300, 300)
        .webp()
        .toFile(path.join(avatarsPath, `${uuid}.webp`));
      
      sharp.cache(false);

      if (currentAvatar) {
        fs.unlink(path.join(avatarsPath, `${currentAvatar}.webp`)).catch(err => console.error(err));
      }
    } finally {
      fs.unlink(file.path).catch(err => console.error(err));
    }

    return uuid;
  },
  async deleteAvatar(id: string): Promise<void> {
    await fs.unlink(path.join(avatarsPath, `${id}.webp`));
  }
};