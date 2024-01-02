import Spline from "@splinetool/react-spline";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Portfolio() {
  const navi = useNavigate();
  const onClickBack = () => {
    navi(-1);
  };
  return (
    <Wrapper>
      <h1>준비중입니다.</h1>
      <Spline
        className="spline"
        scene="https://prod.spline.design/bcHdIM6S2A1IL75D/scene.splinecode"
      />
      <Back onClick={onClickBack}></Back>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .spline {
    position: absolute;
    margin: 0;
    top: 0;
    right: 0;
    left: 0;
    overflow: hidden;
  }
  h1 {
    position: absolute;
    top: 30%;
    left: 50%;
    font-family: "Pretendard";
    z-index: 1;
  }
`;
const StyledButton = styled.button`
  all: unset;
  position: absolute;
  cursor: pointer;
`;

const Back = styled(StyledButton)`
  width: 200px;
  height: 200px;
  bottom: 0em;
  left: 0em;
  z-index: 98;
`;
