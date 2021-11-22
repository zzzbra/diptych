// TODO: genericize and convert to TS
// source: https://theodorejb.me/2015/05/20/linked-list-sorting/

export function mapSort(linkedList = []) {
  const sortedList = [];
  const map = new Map();
  let currentId = null;

  // index the linked list by previous_item_id
  for (let i = 0; i < linkedList.length; i++) {
    let card = linkedList[i];
    if (card.prevCardId === null) {
      // first item
      currentId = card.cardId;
      sortedList.push(card);
    } else {
      map.set(card.prevCardId, i);
    }
  }

  while (sortedList.length < linkedList.length) {
    // get the item with a previous item ID referencing the current item
    let nextItem = linkedList[map.get(currentId)];
    sortedList.push(nextItem);
    currentId = nextItem.cardId;
  }

  return sortedList;
}
