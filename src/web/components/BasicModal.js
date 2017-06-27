import { Modal } from 'antd';
import React, { PropTypes } from 'react';

const BasicModal = ({ children, title, visible, okText, cancelText, onOk, onCancel }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      okText={okText || '确定'}
      cancelText={cancelText || '取消'}
      onOk={onOk}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
};

BasicModal.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BasicModal;
