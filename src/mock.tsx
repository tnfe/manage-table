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
    render: (val: string) => '跳转',
  });
  return data;
};

export const mockDataSource = () => {
  const result = new Array(20).fill('').map((_item: string, indx: number) => {
    const item: Record<string, any> = {
      id: 'row' + indx,
    };
    new Array(10).fill('').forEach((_item: string, index) => {
      item.title = {};
      new Array(20).fill('').forEach((it, number) => {
        item.title['title' + number] = '标题' + number + '_' + indx;
      });
    });
    return item;
  });
  return result;
};


export const mockGroup = (defaultShowKeys?: string[]) => {
  const dkeys = defaultShowKeys || [];
  const data = new Array(4).fill('').map((_item: string, index: number) => {
    return {
      title: '分组' + index,
      records: new Array(10).fill('').map((_item: string, indx) => {
        const dataIndex = `title${index}_${indx}`
        const item: any = {
          dataIndex,
          key: dataIndex,
          title: '标题' + index + '_' + indx,
          show: indx % 5 === 0,
          render: (val: string) => val,
          isAlwaysShow: false,
          isInSetting: true,
        };
        if (dkeys.includes(dataIndex)) {
          item.isAlwaysShow = true;
          item.fixed = 'left';
          item.isInSetting = false;
        }
        return item;
      }),
    };
  });
  data[0].records.push({
    dataIndex: 'action',
    key: 'action',
    title: '操作列',
    show: true,
    isAlwaysShow: false,
    isInSetting: true,
    fixed: 'right',
    render: (val: string) => '跳转',
  })
  return data;
};

export const mockGroupDataSource = () => {
  const result = new Array(10).fill('').map((_item: string, number: number) => {
    const item: Record<string, any> = {
      id: 'row' + number,
    };
    new Array(4).fill('').forEach((_item: string, indx: number) => {
      new Array(50).fill('').forEach((_item: string, index) => {
        item['title' + indx + '_' + index] = '列值' + indx + '_' + index + '_' + number;
      });
    });
    return item;
  });
  return result;
};
