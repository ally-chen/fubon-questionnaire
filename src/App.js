import 'antd/lib/style/themes/default.less';
import 'antd/dist/antd.less';
import './style.less';
import QuestionnaireInfo from './Components/QuestionnaireInfo'
import { Divider, Typography } from 'antd';
import { Container } from './styles';

const { Title, Paragraph, Text, Link } = Typography;

const App = () => {
  return (
    <Container>
      <Title>編輯滿意度問卷</Title>
      <QuestionnaireInfo />
    </Container>
  );
};

export default App;
