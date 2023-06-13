import React, { useEffect, useState } from 'react';
import { Button, Menu, Modal, message } from 'antd';
import { history } from 'umi';

import { resetDB } from '@/services/user';

import './index.less';

const HeaderBar: React.FC = () => {
  const [currentKey, setCurrentKey] = useState<string>('1');

  const handleMenuClick = (e: { key: string }) => {
    const { key } = e;
    setCurrentKey(key);
    switch (key) {
      case '1':
        history.push('/student');
        break;
      case '2':
        history.push('/teacher');
        break;
      case '3':
        history.push('/course');
        break;
      case '4':
        history.push('/resource');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') history.push('/student');
    if (path === '/student') {
      setCurrentKey('1');
    } else if (path === '/teacher') {
      setCurrentKey('2');
    } else if (path === '/course') {
      setCurrentKey('3');
    } else if (path === '/resource') {
      setCurrentKey('4');
    }
  }, [window.location.pathname]);

  const handleResetDB = async () => {
    Modal.confirm({
      title: '重置数据库',
      content: '确定要重置数据库吗？',
      onOk: async () => {
        await resetDB();
        message.success('重置成功');
        history.go(0);
      },
    });
  };

  return (
    <div className="navbar">
      <div className="navbar-box">
        <span className="navbar-title">选课后台管理系统</span>
        <Button
          className="navbar-btn"
          onClick={() => handleResetDB()}
        >
          重置数据库
        </Button>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentKey]}
          className="navbar-menu"
          items={[
            {
              key: '1',
              label: '学生信息',
            },
            {
              key: '2',
              label: '教师信息',
            },
            {
              key: '3',
              label: '课程信息',
            },
            {
              key: '4',
              label: '硬件资源信息',
            },
          ]}
          onClick={(e) => handleMenuClick(e)}
        />
      </div>
    </div>
  );
};

export default HeaderBar;
