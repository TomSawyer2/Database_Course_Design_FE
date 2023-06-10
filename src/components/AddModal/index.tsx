import { Modal } from 'antd';
import React from 'react';

interface AddModalProps {
  title: string;
  open: boolean;
  renderContent: React.ReactNode;
}

const AddModal = (props: AddModalProps) => {
  const { open, title, renderContent } = props;
  return (
    <Modal
      title={title}
      centered={true}
      open={open}
      footer={null}
      closable={false}
    >
      {renderContent}
    </Modal>
  );
};

export default AddModal;
