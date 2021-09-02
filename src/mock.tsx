export const mockColumns = () => {
  const data = new Array(50).fill('').map((_item: string, index) => {
    return {
      dataIndex: 'title' + index,
      key: 'title' + index,
      title: '标题' + index,
      show: index % 8 === 0,
      render: (val: string) => val
    };
  });
  data.push({
    dataIndex: 'action',
    key: 'action',
    title: '操作',
    show: true,
    render: (val:string) => '跳转',
  });
  return data;
}

export const mockDataSource = () => {
  const result = new Array(10).fill('').map((_item: string, indx:number) => {
    const item: Record<string, any> = {
      id: 'row' + indx,
    };
    new Array(50).fill('').forEach((_item: string, index) => {
      item['title' + index] = 'value' + index
    });
    return item;
  });
  return result;
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
          render: (val:string) => val,
        };
      }),
    };
  });
  data[0].records.push({
    dataIndex: 'action',
    key: 'action',
    title: '操作列',
    show: true,
    render: (val:string) => '跳转',
  })
  return data;
}

export const mockGroupDataSource = () => {
  const result = new Array(10).fill('').map((_item: string, indx:number) => {
    const item: Record<string, any> = {
      id: 'row' + indx,
    };
    new Array(4).fill('').forEach((_item: string, indx:number) => {
      new Array(50).fill('').forEach((_item: string, index) => {
        item['title' + indx + '_' + index] = 'value' + indx + '_' + index
      });
    })
    return item;
  });
  return result;
}
