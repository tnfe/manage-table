export const mockColumns = () => {
  const data = new Array(50).fill('').map((_item: string, index) => {
    return {
      dataIndex: 'title' + index,
      key: 'title' + index,
      title: '标题' + index,
      show: index % 8 === 0,
    };
  });
  data.push({
    dataIndex: 'action',
    key: 'action',
    title: '操作',
    show: true,
  });
  return data;
}


export const mockGroup = () => {
  const data = new Array(4).fill('').map((_item:string, index: number) => {
    return {
      title: '分组' + index,
      records: new Array(10).fill('').map((_item: string, indx) => {
        return {
          dataIndex: 'title' + index + '_' + indx,
          key: 'title' + index + '_' + indx,
          title: '标题' + index + '_' + indx,
          show: indx % 5 === 0,
        };
      }),
    };
  });
  data[3].records.push({
    dataIndex: 'action',
    key: 'action',
    title: '操作2',
    show: true,
  })
  return data;
}
