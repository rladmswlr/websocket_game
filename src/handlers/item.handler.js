import { getGameAssets } from '../init/assets.js';
import { eatItem, getItem } from '../models/item.model.js';

export const eatItemHandler = (userId, payload) => {
  const {itemUnlocks , items } = getGameAssets();
  

  const nowstage = itemUnlocks.data.find((itemUnlocks) => itemUnlocks.stage_id === payload.nowStage);


  const nowtime = Date.now();

  eatItem(userId,payload.itemId, nowtime);

  let nowEatItem = getItem(userId);

  console.log('check------', nowEatItem);

  return { status: 'success', 'payload : ': payload };
};
