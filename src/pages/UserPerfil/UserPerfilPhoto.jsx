import React from 'react'
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const UserPerfilPhoto = () => {
  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Foto</div>
        </div>
      </Upload>
    </div>
  )
}

export default UserPerfilPhoto
