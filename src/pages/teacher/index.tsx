import AddModal from '@/components/AddModal';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, message } from 'antd';
import React, { useState } from 'react';
import { DeleteType, addTeacher, deleteInfo, getTeacherInfo } from '@/services/user';

import styles from './index.less';

type TableListItem = {
  id: number;
  name: string;
  teacherId: string;
  courseId: string;
};

const Teacher: React.FC = () => {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const [form] = Form.useForm();

  const [tableListDataSource, setTableListDataSource] = useState<TableListItem[]>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 48,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '教师编号',
      dataIndex: 'teacherId',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '负责的课程号',
      dataIndex: 'courseId',
      copyable: true,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          className={styles.warningText}
          key="option-1"
          onClick={() => handleDeleteTeacher(record.id)}
        >
          删除
        </a>,
      ],
    },
  ];

  const handleAddTeacher = async (val: Omit<TableListItem, 'id'>) => {
    try {
      await addTeacher(val);
      message.success('添加成功');
      setAddModalVisible(false);
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleDeleteTeacher = (id: number) => {
    Modal.confirm({
      title: '删除教师',
      content: '确定删除该教师吗？',
      centered: true,
      onOk: async () => {
        try {
          deleteInfo(id, DeleteType.Teacher);
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const fetchTeacherList = async () => {
    try {
      setTableLoading(true);
      const res = await getTeacherInfo();
      setTableListDataSource(res);
      setTableLoading(false);
    } catch (error) {
      message.error('获取教师列表失败');
      setTableListDataSource([]);
      setTableLoading(false);
    }
  };

  const ModalRenderContent = (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddTeacher}
    >
      <Form.Item
        name="name"
        label="姓名"
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <Input placeholder="姓名" />
      </Form.Item>
      <Form.Item
        name="teacherId"
        label="教师编号"
        rules={[{ required: true, message: '请输入教师编号' }]}
      >
        <Input placeholder="教师编号" />
      </Form.Item>
      <Form.Item
        name="courseId"
        label="负责的课程编号"
        rules={[{ required: true, message: '请输入负责的课程编号' }]}
      >
        <Input placeholder="负责的课程编号" />
      </Form.Item>
      <Form.Item>
        <div className={styles.btnGroup}>
          <Button
            className={styles.btn}
            onClick={() => setAddModalVisible(false)}
          >
            取消
          </Button>
          <Button
            className={styles.btn}
            type="primary"
            htmlType="submit"
          >
            确定
          </Button>
        </div>
      </Form.Item>
    </Form>
  );

  return (
    <div className={styles.student}>
      <AddModal
        title="新增教师"
        open={addModalVisible}
        renderContent={ModalRenderContent}
      />
      <ProTable<TableListItem>
        columns={columns}
        loading={tableLoading}
        request={async (params) => {
          if (Object.keys(params).length === 0) {
            fetchTeacherList();
            return Promise.resolve({
              data: tableListDataSource,
              success: true,
            });
          }
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        dataSource={tableListDataSource}
        pagination={false}
        rowKey="id"
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <div key="record">
            {!tableLoading && <span>共{tableListDataSource.length}条记录</span>}
          </div>,
          <Button
            type="primary"
            key="primary"
            onClick={() => setAddModalVisible(true)}
          >
            新增教师
          </Button>,
        ]}
      />
    </div>
  );
};

export default Teacher;
