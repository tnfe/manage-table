import { useState } from 'react';
import ManageTable  from "./lib";
import { mockDataSource, mockFixedColumns } from './mock';

const fixedShowKeys = ['fixedRight'];

const AppFixedColumn = () => {
	const [columns] = useState(mockFixedColumns());
	return (
		<div className='App'>
			固定的列不可被拖拽，但可以选择是否显示
			<ManageTable
				columns={columns}
				dataSource={mockDataSource()}
        fixedShowKeys={fixedShowKeys}
				name='testFixedColumns'
				rowKey='id'
				scroll={{
					x: 'max-content',
				}}
			/>
		</div>
	);
};

export default AppFixedColumn;
