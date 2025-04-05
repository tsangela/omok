import { Router } from 'express';
import { getCharacterRank } from '../controllers/rankController';
const router = Router();

// https://www.nexon.com/api/maplestory/no-auth/ranking/v2/na?type=overall&id=weekly&character_name=${name}
router.get('/:name', getCharacterRank);

export default router;