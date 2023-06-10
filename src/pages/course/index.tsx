import AddModal from '@/components/AddModal';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Select, message } from 'antd';
import React, { useState } from 'react';
import { DeleteType, addCourse, deleteInfo, getCourseInfo } from '@/services/user';

import styles from './index.less';

type TableListItem = {
  id: number;
  courseName: string;
  maxSelectedNum: string;
  selectdNum: string;
  resourceIds: number[];
};

const Course: React.FC = () => {
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
      title: '课程名',
      dataIndex: 'courseName',
    },
    {
      title: '最大可选人数',
      dataIndex: 'maxSelectedNum',
    },
    {
      title: '已选人数',
      dataIndex: 'selectdNum',
    },
    {
      title: '关联的资源编号',
      dataIndex: 'resourceIds',
      render: (_, record) => <span>{record.resourceIds.join(',')}</span>,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          className={styles.warningText}
          key="option-1"
          onClick={() => handleDeleteCourse(record.id)}
        >
          删除
        </a>,
      ],
    },
  ];

  const handleAddCourse = async (val: Omit<Omit<TableListItem, 'id'>, 'selectdNum'>) => {
    val.maxSelectedNum = val.maxSelectedNum.toString();
    try {
      await addCourse(val);
      message.success('添加成功');
      setAddModalVisible(false);
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleDeleteCourse = (id: number) => {
    Modal.confirm({
      title: '删除课程',
      content: '确定删除该课程吗？',
      centered: true,
      onOk: async () => {
        try {
          deleteInfo(id, DeleteType.Course);
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const fetchCourseList = async () => {
    try {
      setTableLoading(true);
      const res = await getCourseInfo();
      setTableListDataSource(res);
      setTableLoading(false);
    } catch (error) {
      message.error('获取课程列表失败');
      setTableListDataSource([]);
      setTableLoading(false);
    }
  };

  const ModalRenderContent = (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddCourse}
    >
      <Form.Item
        name="courseName"
        label="课程名"
        rules={[{ required: true, message: '请输入课程名' }]}
      >
        <Input placeholder="课程名" />
      </Form.Item>
      <Form.Item
        name="maxSelectedNum"
        label="最大可选人数"
        rules={[{ required: true, message: '请输入最大可选人数' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        name="resourceIds"
        label="关联的硬件资源"
        rules={[{ required: true, message: '请选择关联的硬件资源' }]}
      >
        <Select
          mode="multiple"
          placeholder="关联的硬件资源"
        >
          <Select.Option value={1}>1</Select.Option>
          <Select.Option value={2}>2</Select.Option>
          <Select.Option value={3}>3</Select.Option>
        </Select>
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
        title="新增课程"
        open={addModalVisible}
        renderContent={ModalRenderContent}
      />
      <ProTable<TableListItem>
        columns={columns}
        loading={tableLoading}
        request={async (params) => {
          if (Object.keys(params).length === 0) {
            fetchCourseList();
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
            新增课程
          </Button>,
        ]}
      />
    </div>
  );
};

export default Course;
