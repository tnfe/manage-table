const mockColumns = new Array(50).fill('').map((_item: string, index) => {
  return {
    dataIndex: 'title' + index,
    key: 'title' + index,
    title: '标题' + index,
    show: index % 8 === 0,
  };
});
mockColumns.push({
  dataIndex: 'action',
  key: 'action',
  title: '操作',
  show: true,
});

export default mockColumns;
