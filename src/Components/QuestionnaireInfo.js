import { Board, RequiredLabel } from '../styles';
import { Typography, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Dragger } = Upload;
const { Title } = Typography;

const QuestionnaireInfo = () => {
  const [banner, setBanner] = useState(null);
  const loadImage = (e) => {
    // console.log(e.dataTransfer.files);
  };
  const onUploadChange = (info) => {
    // console.log(info.file);
  };
  return (
    <Board style={{padding: '30px 90px'}}>
      <Title level={5}>滿意度問卷Banner</Title>
      <Dragger
        name='banner'
        onDrop={loadImage}
        onChange={onUploadChange}
        showUploadList={{
          showPreviewIcon: true
        }}
        beforeUpload={() => false}
        maxCount={1}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{color: '#4CAAF5', fontSize: 48}} />
        </p>
        <p className="ant-upload-text">選擇欲上傳資料：點擊或將文件拖曳到這裡上傳</p>
        <p className="ant-upload-hint">
          最佳尺寸建議：寬1088＊高110，每張大小限制不超過3MB，限上傳 jpg、png、gif 格式。
        </p>
      </Dragger>
      <Title level={5}>問卷文案<RequiredLabel>*</RequiredLabel></Title>
      <Title level={5}>個資聲明文案<RequiredLabel>*</RequiredLabel></Title>
    </Board>
  )
};

export default QuestionnaireInfo;