import { ConfigProvider } from 'antd';
import { history } from 'umi';
import React from 'react';

const whiteListUrl = ['/login', '/register'];

// @ts-ignore
export function onRouteChange({ location }) {
  if (location.pathname === '/') {
    history.push('/login');
  }
  if (!whiteListUrl.includes(location.pathname) && !window.localStorage.getItem('token')) {
    history.push('/login');
  }
}

export function rootContainer(container: any) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      {container}
    </ConfigProvider>
  );
}
