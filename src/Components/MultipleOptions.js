import { useFieldArray, Controller } from "react-hook-form";
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
import { VerticalSpace } from "../styles";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const MultipleOptions = ({ control, index }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: `questionConfigs.${index}.children`, // unique name for your Field Array
    }
  );
  const alphaList = "abcdefghijklmnopqrstuvwxyz".split("");
  return (
    <div>
      <VerticalSpace direction="vertical" size="small">
        {fields.map((item, cIndex) => (
          <div key={item.id}>
            <Row align="middle" gutter={4}>
              <Col flex="18px">{alphaList[cIndex]}</Col>
              <Col flex="auto">
                <Controller
                  name={`questionConfigs.${index}.children.${cIndex}.label`}
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Col>
              <Col flex="86px">
                <Controller
                  name={`questionConfigs.${index}.children.${cIndex}.includeInput`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value}>
                      含簡述
                    </Checkbox>
                  )}
                />
              </Col>
              <Col flex="32px">
                <Button
                  type="text"
                  icon={
                    <PlusOutlined style={{ fontSize: 16, color: "#999999" }} />
                  }
                  onClick={() => insert(cIndex + 1, { label: '', includeInput: false })}
                />
              </Col>
              <Col flex="32px">
                <Button
                  type="text"
                  icon={
                    <MinusOutlined style={{ fontSize: 16, color: "#999999" }} />
                  }
                  onClick={() => remove(cIndex)}
                />
              </Col>
            </Row>
          </div>
        ))}
      </VerticalSpace>
    </div>
  );
};

export default MultipleOptions;
