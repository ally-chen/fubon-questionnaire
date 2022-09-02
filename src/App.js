import { useForm } from "react-hook-form";
import QuestionnaireInfo from "./Components/QuestionnaireInfo";
import QuestionnaireList from "./Components/QuestionnaireList";
import PreviewModal from "./Components/PreviewModal";
import { Row, Col, Typography, Button } from "antd";
import { Container, VerticalSpace } from "./styles";
import "antd/lib/style/themes/default.less";
import "antd/dist/antd.less";
import "./style.less";
import { useEffect, useState } from "react";

const { Title } = Typography;

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [configs, setConfigs] = useState([]);
  const { watch, control, getValues } = useForm({
    defaultValues: {
      questionConfigs: [
        {
          type: "title",
          label: "一、基本資料填寫",
          children: [],
          enabled: true,
          required: true,
        },
        {
          type: "singleText",
          label: '姓名',
          children: [],
          enabled: true,
          required: true,
        },
        {
          type: "singleSelect",
          label: '性別',
          children: [
            {
              label: '男性',
              includeInput: false
            },
            {
              label: '女性',
              includeInput: false
            },
          ],
          enabled: true,
          required: true,
        },
        {
          type: "multipleSelect",
          label: '得知講座的管道（可複選）',
          children: [
            {
              label: '富邦人壽同仁',
              includeInput: false
            },
            {
              label: 'EDM 線上行銷廣告',
              includeInput: false
            },
            {
              label: '公告',
              includeInput: false
            },
            {
              label: '其他',
              includeInput: true
            },
          ],
          enabled: true,
          required: true,
        },
        {
          type: "matrix",
          label: '您對今日講座滿意度',
          children: [
            {
              label: '對於主講者整體表現的滿意程度，您覺得'
            },
            {
              label: '對於議題內容深淺程度及適用性，您覺得'
            }
          ],
          children2: [
            {
              label: '非常滿意'
            },
            {
              label: '滿意'
            },
            {
              label: '普通'
            },
            {
              label: '不滿意'
            },
            {
              label: '非常不滿意'
            },
          ],
          enabled: true,
          required: true,
        },
      ],
    },
  });
  const onPreviewClick = () => {
    setModalVisible(true);
    const formData = getValues();
    console.log('form', formData);
    setConfigs(formData);
  };
  const onModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (!modalVisible) {
      setConfigs([])
    }
  }, [modalVisible]);

  return (
    <Container>
      <Title>編輯滿意度問卷</Title>
      <VerticalSpace direction="vertical" size="middle">
        <QuestionnaireInfo control={control} />
        <QuestionnaireList control={control} />
        <Row className="actions" justify='space-between' gutter={10}>
          <Col flex={1}><Button type="primary" shape="round" ghost>暫存</Button></Col>
          <Col flex={1}>
            <Row gutter={10}>
              <Col flex={1}><Button type="primary" shape="round" ghost className="btnFull">取消</Button></Col>
              <Col flex={1}><Button type="primary" shape="round" className="btnFull">確定</Button></Col>
            </Row>
          </Col>
          <Col flex={1} style={{ textAlign: 'right' }}>
            <Button type="primary" shape="round" ghost onClick={onPreviewClick}>預覽</Button>
          </Col>
        </Row>
      </VerticalSpace>
      <PreviewModal onModalClose={onModalClose} visible={modalVisible} configs={configs} />
    </Container>
  );
};

export default App;
