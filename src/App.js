import { useForm } from "react-hook-form";
import QuestionnaireInfo from "./Components/QuestionnaireInfo";
import QuestionnaireList from "./Components/QuestionnaireList";
import { Space, Typography } from "antd";
import { Container, VerticalSpace } from "./styles";
import "antd/lib/style/themes/default.less";
import "antd/dist/antd.less";
import "./style.less";

const { Title } = Typography;

const App = () => {
  const { handleSubmit, reset, watch, control, register } = useForm({
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
      ],
    },
  });
  const formWatch = watch();
  console.log(formWatch);
  return (
    <Container>
      <Title>編輯滿意度問卷</Title>
      <VerticalSpace direction="vertical" size="middle">
        <QuestionnaireInfo control={control} />
        <QuestionnaireList control={control} />
      </VerticalSpace>
    </Container>
  );
};

export default App;
