import { getGameAssets } from '../init/assets.js';
import { eatItem, getItem, getUnlockItem } from '../models/item.model.js';

export const eatItemHandler = (userId, payload) => {
  const {itemUnlocks , items } = getGameAssets();

  //아이템이 존재하는지 확인
  const nowItem = items.data.find((item) => item.id === payload.itemId);
  if(!items.data.some((item) => item.id === payload.itemId)){
    return {status: 'fail', message: 'Target item not found'};
  }

  const nowstage = itemUnlocks.data.find((itemUnlocks) => itemUnlocks.stage_id === payload.nowStage);

  //스테이지언락조건에 따라 잘 아이템이 나오는지 확인
  const unlockdata = getUnlockItem(userId);
  if(!unlockdata.some((unlock) => unlock.stage_id === nowstage.stage_id)){
    return {status: 'fail', message: 'Target itemUnlock not found'};
  }

  const nowtime = Date.now();

  eatItem(userId, nowItem.id, nowtime);

  return { status: 'success', 'payload : ': payload };
};
