import { Modal, Typography, Divider, Input, Row, Col, Radio, Checkbox, Rate, InputNumber, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useState } from 'react';
import { BannerPreview, VerticalSpace, Board, InnerInput } from "../styles";

const { Text, Title } = Typography;

const renderFields = (item) => {
  const { type, label, children, children2 } = item;
  const elements = [];
  elements.push(<Title level={5}>{label}</Title>);
  switch (type) {
    case "singleText":
      elements.push(<Input placeholder={`請輸入${label}`} />);
      break;
    case "singleSelect":
      elements.push(
        <Radio.Group name={`${label}`}>
          <Row gutter={[16, 16]}>
            {children.map((c) => (
              <Col xs={24} md={12}>
                <Radio value={c.label}>{c.label}</Radio>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      );
      break;
    case "multipleSelect":
      elements.push(
        <Checkbox.Group name={`${label}`}>
          <Row gutter={[16, 16]}>
            {children.map((c) => (
              <Col xs={24} md={c.includeInput ? 24 : 12}>
                <Checkbox value={c.label}>
                  <Row>
                    <Col>{c.label}</Col>
                    {c.includeInput && (<Col flex='auto'><InnerInput placeholder={`請說明${label}，文字上限50字`} /></Col>)}
                  </Row>
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      );
      break;
    case "rating":
      elements.push(<Rate count={Number(children[0].label)} />);
      break;
    case "multipleText":
      elements.push(<TextArea showCount maxLength={250} rows={5} />);
      break;
    case "number":
      elements.push(<InputNumber />);
      break;
    case "matrix":
      const columns = [{title: '', dataIndex: 'label'}]
      .concat(children2.map((c, i) => ({
        title: c.label,
        dataIndex: `col${i}`,
        render: (text, record) => (
          <Input type="radio" name={record.name} value={text} />
        )
      })));
      const rowData = children.map((n, i) => {
        const row = { label: n.label };
        children2.forEach((c2, c2i) => {
          row[`col${c2i}`] = c2i;
          row.name = `name${i}`;
        });
        return row;
      });
      elements.push(<Table columns={columns} dataSource={rowData} className='tableMatrix' pagination={false} />);
      break;
    default:
      break;
  }
  return (
    <div>
      {elements}
    </div>
  );
};

const PreviewModal = ({ visible, configs, onModalClose }) => {
  const [data, setData] = useState([]);
  const mergeQuestions = (list) => {
    console.log('list', list);
    const groups = [];
    let tempGroup = [];
    for (const [index, item] of list.entries())  {
      if (item.type === 'title') {
        if (tempGroup.length > 0) {
          groups.push({key: `group-${index}`, children: tempGroup});
        }
        tempGroup = [item];
      } else if (tempGroup.find((n) => n.type === 'title')) {
        tempGroup = tempGroup.concat(item);
      }

      if (index === list.length - 1 && tempGroup.length > 0) {
        groups.push({key: `group-${index}`, children: tempGroup});
      }
    }
    return groups;
  };
  useEffect(() => {
    if (configs?.questionConfigs?.length > 0) {
      setData(mergeQuestions(configs.questionConfigs.filter((n) => n.enabled && n.label)));
    }
  }, [configs]);
  return (
    <Modal
      title="Preview"
      centered
      visible={visible}
      wrapClassName='modalPreview'
      onOk={onModalClose}
      onCancel={onModalClose}
      width={1088}
    >
      <VerticalSpace direction="vertical" size="middle">
        {((configs.banner && configs.banner[0]) || configs.caption || configs.terms) && (
          <div className='formIntro'>
            {configs.banner && configs.banner[0] && (
              <BannerPreview
                style={{ backgroundImage: `url(${configs.banner[0].thumbUrl})` }}
                title={configs.banner[0].name}
              />
            )}
            <div className='formIntroBody'>
              {configs.caption && (
                <div>
                  <Text>{configs.caption}</Text>
                  <Divider />
                </div>
              )}
              {configs.terms && <Text>{configs.terms}</Text>}
            </div>
          </div>
        )}
        {data.length > 0 && data.map((group) => (
          <Board key={group.key}>
            <VerticalSpace direction="vertical" size="middle">
            {group.children && group.children.map((item) => (
              <div>
                {item.type === 'title' ? <Title level={4}>{item.label}</Title> : (renderFields(item))}
              </div>
            ))}
            </VerticalSpace>
            
          </Board>
        ))}
      </VerticalSpace>
    </Modal>
  );
};

export default PreviewModal;