import {
  Layout,
  Typography,
  Affix,
  Switch,
  List,
  Avatar,
  Button,
  Col,
  Row,
  Input,
  Divider,
  Tag,
  InputNumber
} from "antd";
import {
  Board,
  ButtonCategory,
  InputTitle,
  FieldTitle,
  ButtonSwitch,
  VerticalSpace,
  IndexWithRequired,
  InsertLine,
} from "../styles";
import Icon, { DeleteOutlined, StarFilled, PlusOutlined } from "@ant-design/icons";
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
import Rating from "./Rating";
import { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { categoryList } from '../const';

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
      return <Icon component={() => <IndexWithRequired>{required && <StarFilled />}{index}</IndexWithRequired>} />;
    default:
      return <div />;
  }
};

const RequiredStar = () => (
  <div>
    <StarFilled />
    必選
  </div>
);

const CategoryButtons = ({ category, selectedCategory, update }) => {
  const onClickCategory = () => {
    update(category.key);
  };
  return (
    <ButtonCategory
      size="middle"
      type="dashed"
      className={selectedCategory === category.key ? 'active' : ''}
      onClick={onClickCategory}
      icon={renderCategory(category.key)}
    >
      {category.text}
    </ButtonCategory>
  );
};

const renderChildren = (control, q, qIndex) => {
  const { type } = q;
  switch (type) {
    case "singleText":
      return <Input readOnly />;
    case "singleSelect":
      return <MultipleOptions control={control} index={qIndex} hasInputCheck />;
    case "multipleSelect":
      return <MultipleOptions control={control} index={qIndex} hasInputCheck />;
    case "rating":
      return <Rating control={control} index={qIndex} />;
    case "multipleText":
      return <TextArea rows={5} placeholder="簡述即可，字數上限250字。" showCount maxLength={250} readOnly />;
    case "number":
      return <div><InputNumber readOnly /></div>;
    case "matrix":
      return (
        <div>
          <MultipleOptions control={control} index={qIndex} />
          <Tag color='#363636' style={{ margin: '10px 0' }}>權重</Tag>
          <MultipleOptions control={control} index={qIndex} childrenKey='children2' />
        </div>
      );
    default:
      return "";
  }
};

const QuestionnaireList = ({ control }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { fields, remove, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "questionConfigs", // unique name for your Field Array
    }
  );
  let indexStart = 0;
  const numberIndexList = fields.map((n) => {
    if (n.type !== 'title') {
      indexStart++;
      return indexStart;
    }
    return null;
  });
  return (
    <Layout>
      <Content style={{ paddingRight: 60 }}>
        <Title level={4}>編輯題目</Title>
        <VerticalSpace direction="vertical" size={30}>
          {fields.map((item, index) => (
            <Row key={item.id} style={{ position: 'relative' }}>
              <Col flex="150px">
                <Row gutter={8}>
                  <Col><Avatar shape="square" size="large" style={{ fontSize: 18 }}>{renderCategory(item.type)}</Avatar></Col>
                  <Col>
                    <Controller
                      name={`questionConfigs.${index}.required`}
                      control={control}
                      render={({ field }) => (
                        <Avatar shape="square" size="large" style={{ background: '#23C4A8' }}>
                          {renderCategory('index', numberIndexList[index], item.type === 'title' ? null : field.value)}
                        </Avatar>
                      )}
                    />
                  </Col>
                </Row>
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
                        checkedChildren={<RequiredStar />}
                        unCheckedChildren={<RequiredStar />}
                        checked={field.value}
                      />
                    )}
                  />
                )}
                {renderChildren(control, item, index)}
              </Col>
              {selectedCategory && (
                <InsertLine
                  onClick={() => {
                      const categoryIndex = categoryList.findIndex((c) => c.key === selectedCategory);
                      insert(index + 1, {
                        type: selectedCategory,
                        label: "",
                        ...(categoryList[categoryIndex].insertChildren),
                        enabled: true,
                        required: true,
                      })
                  }}
                >
                  <Avatar shape="square" size="middle"><PlusOutlined /></Avatar>
                  <Avatar shape="square" size="middle">{renderCategory(selectedCategory)}</Avatar>
                </InsertLine>
              )}
            </Row>
          ))}
        </VerticalSpace>
        <Divider style={{ borderColor: '#23C4A8' }} />
      </Content>
      <Sider theme="light">
        <Board style={{ padding: 20, height: '100%' }}>
          <Affix offsetTop={10}>
            <div>
              <Title level={4}>選擇題型</Title>
              <List bordered={false} split={false} grid={{ gutter: 5 }}>
                {categoryList.map((category) => (
                  <List.Item key={category.key}>
                    <CategoryButtons category={category} selectedCategory={selectedCategory} update={setSelectedCategory} />
                  </List.Item>
                ))}
              </List>
            </div>
          </Affix>
        </Board>
      </Sider>
    </Layout>
  );
};
export default QuestionnaireList;
