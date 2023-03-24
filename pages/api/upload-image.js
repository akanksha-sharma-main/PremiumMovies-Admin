import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { imageUrl } = req.body;
      const dataUrlParts = imageUrl.split(',');
      const base64Data = dataUrlParts[1];
      const binaryData = Buffer.from(base64Data, 'base64');
      const fileName = `image-${Date.now()}.png`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      await writeFile(filePath, binaryData);
      const imageUri = `/uploads/${fileName}`;
      res.status(201).json({ imageUri });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to upload image' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
