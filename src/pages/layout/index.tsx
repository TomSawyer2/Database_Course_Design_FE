import React from 'react';
import { IRouteComponentProps } from 'umi';
import HeaderBar from '@/components/HeaderBar';

const Layout = (props: IRouteComponentProps) => {
  return (
    <div>
      <HeaderBar />
      {props.children}
    </div>
  );
};

export default Layout;
