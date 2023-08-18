// enquiryDetails 合并单元格
export const mergeCells = (data: any, field: string) => {
  const list = data.enquiryDetails;
  list?.map((item: any) => (item.rowSpan = 1)); //初始值
  let count = 0; //重复项的第一项
  let indexCount = 1; //下一项

  while (indexCount < list?.length) {
    const item = list.slice(count, count + 1)[0]; //获取没有比较的第一个对象
    if (item[field] === list[indexCount][field]) {
      //第一个对象与后面的对象相比，有相同项就累加，并且后面相同项设置为0
      item.rowSpan++;
      list[indexCount].rowSpan = 0;
    } else {
      count = indexCount;
    }
    indexCount++;
  }
  return data;
};

// 按title字段排序
export const trans = (data: any) => {
  const list = data.enquiryDetails;
  const cache = {}; // cache存储的键是title，值是这个title在indices数组中的下标
  const indices: any[] = []; // 数组中的每一个值是一个数组，数组中的每一个元素是原数组中相同title的下标
  list.forEach((item: any, i: number) => {
    const title: any = item.title;
    // @ts-ignore
    const index: number = cache[title];
    if (index !== undefined) {
      indices[index].push(i);
    } else {
      // @ts-ignore
      cache[title] = indices.length;
      indices.push([i]);
    }
  });

  const result: any[] = [];
  indices.forEach((item) => {
    item.forEach((index: any) => {
      result.push(list[index]); // 依次把index对应的元素data[index]添加进去即可
    });
  });

  data.enquiryDetails = result;

  return data;
};

export const mergeCellsBillSalesList = (data: any, field: string) => {
  data?.map((item: any) => (item.rowSpan = 1)); //初始值
  let count = 0; //重复项的第一项
  let indexCount = 1; //下一项

  while (indexCount < data?.length) {
    const item = data.slice(count, count + 1)[0]; //获取没有比较的第一个对象
    if (item[field] === data[indexCount][field]) {
      //第一个对象与后面的对象相比，有相同项就累加，并且后面相同项设置为0
      item.rowSpan++;
      data[indexCount].rowSpan = 0;
    } else {
      count = indexCount;
    }
    indexCount++;
  }
  return data;
};

// 加密银行卡号
export const getBankCardNum = (str: string) => {
  if (!str) return '';
  if (str && str.length < 8) return str;
  return str.substring(0, 4) + '*'.repeat(str.length - 8) + str.substring(str.length - 4);
};
