export const mainDataToDnD = (data) => {
  let result = {
    'to do': [],
    doing: [],
    done: [],
  };
  data.forEach((el) => {
    result[el.status].push(el);
  });
  return result;
};

export const dndDataToMain = (data) => {
  let result = [];
  Object.keys(data).forEach((el) => {
    result = [...result, ...data[el]];
  });
  return result;
};

export const arrayMove = (arr, oldIndex, newIndex) => {
  let newArr = JSON.parse(JSON.stringify(arr));
  const el = newArr[oldIndex];
  newArr[oldIndex] = newArr[newIndex];
  newArr[newIndex] = el;
  return newArr;
};

export const dragEnd = (data, source, destination) => {
  try {
    let res = JSON.parse(JSON.stringify(data));

    if (source.droppableId === destination.droppableId) {
      res[source.droppableId] = arrayMove(res[source.droppableId], source.index, destination.index);
    } else {
      const el = res[source.droppableId][source.index];
      el.status = destination.droppableId;
      res[source.droppableId] = [
        ...res[source.droppableId].slice(0, source.index),
        ...res[source.droppableId].slice(source.index + 1),
      ];
      res[destination.droppableId] = [
        ...res[destination.droppableId].slice(0, destination.index),
        el,
        ...res[destination.droppableId].slice(destination.index),
      ];
    }
    return res;
  } catch (e) {
    return data;
  }
};
