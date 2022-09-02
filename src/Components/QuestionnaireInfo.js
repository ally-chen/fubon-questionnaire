import { Board, RequiredLabel, BannerPreview, VerticalSpace } from "../styles";
import { Typography, Upload, Input } from "antd";
import { InboxOutlined, CloseOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";

const { Dragger } = Upload;
const { Title } = Typography;
const { TextArea } = Input;

const customItemRender = (originNode, file) => (
  <div>
    <BannerPreview
      style={{ backgroundImage: `url(${file.thumbUrl})` }}
      title={file.name}
    />
    {originNode}
  </div>
);

const QuestionnaireInfo = ({ control }) => {
  const onUploadChange = (info, formChange) => {
    if (info.file.status === "removed") {
      formChange([]);
    } else {
      const imgUrl = URL.createObjectURL(info.file);
      const fileInfo = {
        url: imgUrl,
        thumbUrl: imgUrl,
        status: "Done",
        name: info.file.name,
        uid: info.file.uid,
      };
      formChange([fileInfo]);
    }
  };
  return (
    <Board className="infoBoard">
      <VerticalSpace direction="vertical" size="middle">
        <div>
          <Title level={5}>滿意度問卷Banner</Title>
          <Controller
            control={control}
            name="banner"
            render={({ field: { onChange, onBlur, value } }) => (
              <Dragger
                name="banner"
                onChange={(e) => {
                  onUploadChange(e, onChange);
                }}
                onBlur={onBlur}
                fileList={value}
                itemRender={customItemRender}
                showUploadList={{
                  removeIcon: <CloseOutlined style={{ fontSize: 12 }} />,
                }}
                beforeUpload={() => false}
                maxCount={1}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: "#4CAAF5", fontSize: 48 }} />
                </p>
                <p className="ant-upload-text">
                  選擇欲上傳資料：點擊或將文件拖曳到這裡上傳
                </p>
                <p className="ant-upload-hint">
                  最佳尺寸建議：寬1088＊高110，每張大小限制不超過3MB，限上傳
                  jpg、png、gif 格式。
                </p>
              </Dragger>
            )}
          />
        </div>
        <div>
          <Title level={5}>
            問卷文案<RequiredLabel>*</RequiredLabel>
          </Title>
          <Controller
            control={control}
            name="caption"
            render={({ field: { onChange, onBlur } }) => (
              <TextArea rows={7} onChange={onChange} onBlur={onBlur} />
            )}
          />
        </div>
        <div>
          <Title level={5}>
            個資聲明文案<RequiredLabel>*</RequiredLabel>
          </Title>
          <Controller
            control={control}
            name="terms"
            render={({ field: { onChange, onBlur } }) => (
              <TextArea rows={7} onChange={onChange} onBlur={onBlur} />
            )}
          />
        </div>
      </VerticalSpace>
    </Board>
  );
};

export default QuestionnaireInfo;
