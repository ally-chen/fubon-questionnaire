import { Controller } from "react-hook-form";
import { Rate, Row, Col, InputNumber } from 'antd';

const Rating = ({ control, index }) => {
  return (
    <Controller
      name={`questionConfigs.${index}.children.0.label`}
      control={control}
      defaultValue={5}
      render={({ field }) => (
        <Row>
          <Col flex='120px'><InputNumber {...field} defaultValue={5} /></Col>
          <Col flex='auto'><Rate disabled count={Number(field.value || 5)} /></Col>
        </Row>
      )}
    />
  );
};

export default Rating;