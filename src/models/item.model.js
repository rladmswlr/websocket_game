
// key: uuid, value: array -> item 정보는 배열
const items = {};
const unlockItems = {};

// 스테이지 초기화시 아이템리스트 초기화
export const createItem = (uuid) => {
    items[uuid] = [];
    unlockItems[uuid] = [];
};

export const getItem = (uuid) => {
    return items[uuid];
};

export const eatItem = (uuid, id, timestamp) => {
    return items[uuid].push({id, timestamp});
};

export const unlockItem = (uuid, id, timestamp) => {
    return unlockItems[uuid].push({id, timestamp});
};


export const clearItem = (uuid) => {
    return (
        items[uuid] = [],
        items[unlockItems] = []
    );
};