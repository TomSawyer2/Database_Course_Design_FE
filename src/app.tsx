import React from 'react';
import { ConfigProvider } from 'antd';

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
