import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Radio, message } from 'antd';
import AddModal from '@/components/AddModal';
import {
  DeleteType,
  StudentInfo,
  addStudent,
  deleteInfo,
  getStudentInfo,
  searchStudent,
} from '@/services/user';

import styles from './index.less';

type TableListItem = {
  id: number;
  name: string;
  sex: string;
  studentId: string;
  department: string;
  class: string;
  telephone: string;
};

const Student: React.FC = () => {
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
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '学院',
      dataIndex: 'department',
      ellipsis: true,
    },
    {
      title: '班级',
      dataIndex: 'class',
      ellipsis: true,
    },
    {
      title: '电话',
      dataIndex: 'telephone',
      ellipsis: true,
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
          onClick={() => handleDeleteStudent(record.id)}
        >
          删除
        </a>,
      ],
    },
  ];

  const handleAddStudent = async (val: Omit<TableListItem, 'id'>) => {
    try {
      await addStudent(val);
      message.success('添加成功');
      setAddModalVisible(false);
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleDeleteStudent = (id: number) => {
    Modal.confirm({
      title: '删除学生',
      content: '确定删除该学生吗？',
      centered: true,
      onOk: async () => {
        try {
          deleteInfo(id, DeleteType.Student);
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const fetchStudentList = async () => {
    try {
      setTableLoading(true);
      const res = await getStudentInfo();
      setTableListDataSource(res);
      setTableLoading(false);
    } catch (error) {
      message.error('获取学生列表失败');
      setTableListDataSource([]);
      setTableLoading(false);
    }
  };

  const ModalRenderContent = (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddStudent}
    >
      <Form.Item
        name="name"
        label="姓名"
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <Input placeholder="姓名" />
      </Form.Item>
      <Form.Item
        name="sex"
        label="性别"
        rules={[{ required: true, message: '请输入性别' }]}
      >
        <Radio.Group>
          <Radio value="男">男</Radio>
          <Radio value="女">女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="studentId"
        label="学号"
        rules={[{ required: true, message: '请输入学号' }]}
      >
        <Input placeholder="学号" />
      </Form.Item>
      <Form.Item
        name="department"
        label="学院"
        rules={[{ required: true, message: '请输入学院' }]}
      >
        <Input placeholder="学院" />
      </Form.Item>
      <Form.Item
        name="class"
        label="班级"
        rules={[{ required: true, message: '请输入班级' }]}
      >
        <Input placeholder="班级" />
      </Form.Item>
      <Form.Item
        name="telephone"
        label="电话"
        rules={[{ required: true, message: '请输入电话' }]}
      >
        <Input placeholder="电话" />
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
        title="新增学生"
        open={addModalVisible}
        renderContent={ModalRenderContent}
      />
      <ProTable<TableListItem>
        columns={columns}
        loading={tableLoading}
        request={async (params) => {
          if (Object.keys(params).length === 0) {
            fetchStudentList();
            return Promise.resolve({
              data: tableListDataSource,
              success: true,
            });
          }
          try {
            setTableLoading(true);
            const res = await searchStudent(params as StudentInfo);
            setTableListDataSource(res);
            setTableLoading(false);
            return Promise.resolve({
              data: res,
              success: true,
            });
          } catch (error) {
            message.error('查询失败');
            setTableLoading(false);
            return Promise.resolve({
              data: tableListDataSource,
              success: true,
            });
          }
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
            新增学生
          </Button>,
        ]}
      />
    </div>
  );
};

export default Student;
