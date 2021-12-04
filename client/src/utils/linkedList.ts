import { Card } from 'models';
type CardId = Card['cardId'];
type IndexInUnsortedArray = number;
// TODO: genericize and convert to TS
// source: https://theodorejb.me/2015/05/20/linked-list-sorting/

export function mapSort(linkedList: Array<Card>): Array<Card> {
  const sortedList = [];
  const map = new Map<CardId, IndexInUnsortedArray>();
  let currentId: CardId = '';

  // index the linked list by prevCardId
  for (let i = 0; i < linkedList.length; i++) {
    let card = linkedList[i];
    if (!card.prevCardId) {
      // first item
      currentId = card.cardId;
      sortedList.push(card);
    } else {
      map.set(card.prevCardId, i);
    }
  }

  while (sortedList.length < linkedList.length) {
    // get the item with a prevCardId referencing the current item
    let nextItem = linkedList[map.get(currentId) ?? 0];
    sortedList.push(nextItem);
    currentId = nextItem.cardId;
  }

  return sortedList;
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
