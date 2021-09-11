export const mockColumns = () => {
  const data: any[] = new Array(20).fill('').map((_item: string, index) => {
    return {
      dataIndex: ['title', 'title' + index],
      key: 'title' + index,
      title: '标题' + index,
      show: index % 4 === 0,
      render: (val: string) => val
    };
  });
  data.unshift({
    dataIndex: 'action',
    key: 'action',
    title: '操作',
    show: true,
    render: (val:string) => '跳转',
  });
  return data;
}

export const mockDataSource = () => {
  const result = new Array(20).fill('').map((_item: string, indx:number) => {
    const item: Record<string, any> = {
      id: 'row' + indx,
    };
    new Array(10).fill('').forEach((_item: string, index) => {
      item['title' + index] = 'value' + index
      item.title = {
        title0: 'title.title' + indx,
        title1: 'title' + indx,
        title2: 'title.title' + indx,
        title3: 'title.title' + indx,
        title4: 'title.title' + indx,
        title5: 'title.title' + indx,
        title6: 'title.title' + indx,
        title7: 'title.title' + indx,
        title8: 'title.title' + indx,
        title9: 'title.title' + indx,
        title10: 'title.title' + indx,
        title11: 'title.title' + indx,
      }
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
