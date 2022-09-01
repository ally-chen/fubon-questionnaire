import styled from "styled-components";
import { Button, Input, Switch, Space } from "antd";

export const Container = styled.div`
  max-width: 1128px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const VerticalSpace = styled(Space)`
  width: 100%;
`;

export const Board = styled.div`
  background: #f5f8fc;
  border-radius: 10px;
`;

export const RequiredLabel = styled.span`
  color: #f5222d;
  font-weight: bold;
`;

export const BannerPreview = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 10px;
  &:before {
    content: "";
    padding-bottom: 11%;
    min-height: 110px;
    width: 100%;
    display: block;
  }
`;

export const BannerPreviewImg = styled.img`
  max-width: 100%;
  max-height: 110px;
  margin: auto;
  display: block;
`;

export const ButtonCategory = styled(Button)`
  padding: 7px 18px 7px 42px;
  height: auto;
  width: 100%;
  position: relative;
  text-align: left;
  border: 1px dashed #23C4A8;
  &:hover, &:active, &:focus {
    background: #E6F7FF;
    color: #363636;
  }
  > span.anticon {
    position: absolute;
    left: -1px;
    top: -1px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items:center;
    justify-content: center;
    background: #23C4A8;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-size: 18px;
  }
`;

export const InputTitle = styled(Input)`
border: 0;
border-radius: 0;
`;

export const FieldTitle = styled.div`
border-bottom: 1px solid #d2d2d2;
margin-bottom: 10px;
`;

export const ButtonSwitch = styled(Switch)`
.ant-switch-handle {
  display: none;
}
.ant-switch-inner {
  margin: 0 6px;
}
.anticon {
  margin-right: 2px;
}
&.ant-switch {
  border-radius: 4px;
  margin-bottom: 10px;
  &.ant-switch-checked {
    .ant-switch-inner {
      margin: 0 6px;
    }
  }
}
`;
