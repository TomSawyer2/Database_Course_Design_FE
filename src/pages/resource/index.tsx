import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, message } from 'antd';
import { ProColumns, ProTable } from '@ant-design/pro-components';

import {
  DeleteType,
  ResourceInfo,
  addResource,
  deleteInfo,
  getResourceInfo,
  searchResource,
} from '@/services/user';
import { ResourceItem } from '@/const/typings';
import AddModal from '@/components/AddModal';

import styles from './index.less';

const Resource: React.FC = () => {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const [tableListDataSource, setTableListDataSource] = useState<ResourceItem[]>([]);
  const [form] = Form.useForm();

  const columns: ProColumns<ResourceItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 48,
    },
    {
      title: '资源名称',
      dataIndex: 'resourceName',
    },
    {
      title: '资源数量',
      dataIndex: 'resourceNum',
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          className={styles.warningText}
          key="option-1"
          onClick={() => handleDeleteResource(record.id)}
        >
          删除
        </a>,
      ],
    },
  ];

  const handleAddResource = async (val: Omit<ResourceItem, 'id'>) => {
    val.resourceNum = val.resourceNum.toString();
    try {
      await addResource(val);
      message.success('添加成功');
      setAddModalVisible(false);
      await fetchResourceList();
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleDeleteResource = (id: number) => {
    Modal.confirm({
      title: '删除资源',
      content: '确定删除该资源吗？',
      centered: true,
      onOk: async () => {
        try {
          await deleteInfo(id, DeleteType.Resource);
          message.success('删除成功');
          await fetchResourceList();
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const fetchResourceList = async () => {
    try {
      setTableLoading(true);
      setTableListDataSource([]);
      const res = await getResourceInfo();
      setTableListDataSource(res);
      setTableLoading(false);
    } catch (error) {
      message.error('获取资源列表失败');
      setTableListDataSource([]);
      setTableLoading(false);
    }
  };

  const ModalRenderContent = (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddResource}
    >
      <Form.Item
        name="resourceName"
        label="资源名称"
        rules={[{ required: true, message: '请输入资源名称' }]}
      >
        <Input placeholder="资源名称" />
      </Form.Item>
      <Form.Item
        name="resourceNum"
        label="资源数量"
        rules={[{ required: true, message: '请输入资源数量' }]}
      >
        <InputNumber min={1} />
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
        title="新增资源"
        open={addModalVisible}
        renderContent={ModalRenderContent}
      />
      <ProTable<ResourceItem>
        columns={columns}
        loading={tableLoading}
        request={async (params) => {
          if (Object.keys(params).length === 0) {
            fetchResourceList();
            return Promise.resolve({
              data: tableListDataSource,
              success: true,
            });
          }
          try {
            setTableLoading(true);
            const res = await searchResource(params as ResourceInfo);
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
            新增资源
          </Button>,
        ]}
      />
    </div>
  );
};

export default Resource;
