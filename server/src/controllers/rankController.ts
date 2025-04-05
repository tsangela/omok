import express from 'express';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

export const getCharacterRank = (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;
    if (!name) {
      res.status(404).json({ message: 'Character name cannot be empty' });
      return;
    }

    const requestUrl = `https://www.nexon.com/api/maplestory/no-auth/ranking/v2/na?type=overall&id=weekly&character_name=${name}`
    fetch(requestUrl)
      .then(response => response.json())
      .then(data => res.json(data));
  } catch (error) {
    next(error);
  }
};
