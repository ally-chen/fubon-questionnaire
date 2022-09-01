import {
  Layout,
  Typography,
  Affix,
  Switch,
  List,
  Checkbox,
  Button,
  Col,
  Row,
  Input,
} from "antd";
import {
  Board,
  ButtonCategory,
  InputTitle,
  FieldTitle,
  ButtonSwitch,
  VerticalSpace,
} from "../styles";
import Icon, { DeleteOutlined, StarFilled } from "@ant-design/icons";
import { useFieldArray, Controller } from "react-hook-form";
import { ReactComponent as SvgSingleLine } from "../images/button_singleLine.svg";
import { ReactComponent as SvgTitle } from "../images/button_title.svg";
import { ReactComponent as SvgStar } from "../images/button_star.svg";
import { ReactComponent as SvgNumber } from "../images/button_number.svg";
import { ReactComponent as SvgMText } from "../images/button_mtext.svg";
import { ReactComponent as SvgMCQ } from "../images/button_MCQ.svg";
import { ReactComponent as SvgMC } from "../images/button_MC.svg";
import { ReactComponent as SvgMatrix } from "../images/button_matrix.svg";
import MultipleOptions from "./MultipleOptions";

const { Sider, Content } = Layout;
const { Title } = Typography;

const renderCategory = (type, index, required) => {
  switch (type) {
    case 'title':
      return <Icon component={SvgTitle} />;
    case 'singleText':
      return <Icon component={SvgSingleLine} />;
    case 'matrix':
      return <Icon component={SvgMatrix} />;
    case 'rating':
      return <Icon component={SvgStar} />;
    case 'number':
      return <Icon component={SvgNumber} />;
    case 'multipleSelect':
      return <Icon component={SvgMCQ} />;
    case 'singleSelect':
      return <Icon component={SvgMC} />;
    case 'multipleText':
      return <Icon component={SvgMText} />;
    case 'index':
      return <Icon component={() => <div>{index}</div>} />;
    default:
      return <div />;
  }
};

const QuestionnaireList = ({ control }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "questionConfigs", // unique name for your Field Array
    }
  );
  const renderChildren = (q, qIndex) => {
    const { type, children } = q;
    switch (type) {
      case "singleText":
        return <Input readOnly />;
      case "singleSelect":
        return <MultipleOptions control={control} index={qIndex} />;
      case "multipleSelect":
        return <MultipleOptions control={control} index={qIndex} />;
      default:
        return "";
    }
  };
  const RequiredStar = (
    <div>
      <StarFilled />
      必選
    </div>
  );
  return (
    <Layout>
      <Content style={{ paddingRight: 60 }}>
        <Title level={4}>編輯題目</Title>
        <VerticalSpace direction="vertical" size="large">
          {fields.map((item, index) => (
            <Row key={item.id}>
              <Col flex="150px">
                <Button icon={renderCategory(item.type)} />
                <Button icon={renderCategory('index', index, item.required)} />
              </Col>
              <Col flex="auto">
                <FieldTitle>
                  <Row align="middle">
                    <Col flex="auto">
                      <Controller
                        name={`questionConfigs.${index}.label`}
                        control={control}
                        render={({ field }) => (
                          <InputTitle {...field} size="large" />
                        )}
                      />
                    </Col>
                    <Col flex="40px">
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(index)}
                      />
                    </Col>
                    <Col flex="56px">
                      <Controller
                        name={`questionConfigs.${index}.enabled`}
                        control={control}
                        render={({ field }) => (
                          <Switch
                            {...field}
                            checkedChildren="啟用"
                            unCheckedChildren="停用"
                            checked={field.value}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                </FieldTitle>
                {item.type !== "title" && (
                  <Controller
                    name={`questionConfigs.${index}.required`}
                    control={control}
                    render={({ field }) => (
                      <ButtonSwitch
                        {...field}
                        checkedChildren={RequiredStar}
                        unCheckedChildren={RequiredStar}
                        checked={field.value}
                      />
                    )}
                  />
                )}
                {renderChildren(item, index)}
              </Col>
            </Row>
          ))}
        </VerticalSpace>
      </Content>
      <Sider theme="light">
        <Affix offsetTop={10}>
          <Board style={{ padding: 20 }}>
            <Title level={4}>選擇題型</Title>
            <List bordered={false} split={false} grid={{ gutter: 5 }}>
              <List.Item>
                <ButtonCategory
                  size="middle"
                  type="dashed"
                  icon={renderCategory('singleText')}
                >
                  單行文字
                </ButtonCategory>
              </List.Item>
              <List.Item>
                <ButtonCategory
                  size="middle"
                  type="dashed"
                  icon={renderCategory('multipleText')}
                >
                  多行文字
                </ButtonCategory>
              </List.Item>
              <List.Item>
                <ButtonCategory
                  size="middle"
                  type="dashed"
                  icon={renderCategory('singleSelect')}
                >
                  單選題
                </ButtonCategory>
              </List.Item>
              <List.Item>
                <ButtonCategory
                  size="middle"
                  type="dashed"
                  icon={renderCategory('multipleSelect')}
                >
                  多選題
                </ButtonCategory>
              </List.Item>
              <List.Item>
                <ButtonCategory
                  size="middle"
                  type="dashed"
                  icon={renderCategory('number')}
                >
                  數字題
                </ButtonCategory>
              </List.Item>
              <List.Item>
                <ButtonCategory
                  size="middle"
                  type="dashed"
                  icon={renderCategory('rating')}
                >
                  星級評分
                </ButtonCategory>
              </List.Item>
              <List.Item>
                <ButtonCategory
                  size="middle"
                  type="dashed"
                  icon={renderCategory('title')}
                >
                  分類標題
                </ButtonCategory>
              </List.Item>
              <List.Item>
                <ButtonCategory
                  size="middle"
                  type="dashed"
                  icon={renderCategory('matrix')}
                >
                  矩陣題
                </ButtonCategory>
              </List.Item>
            </List>
          </Board>
        </Affix>
      </Sider>
    </Layout>
  );
};
export default QuestionnaireList;
