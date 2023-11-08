import Spline from "@splinetool/react-spline";
import styled from "styled-components";
import MusicPlayer from "./musicPlayer";
import mp3 from "./music/main.mp3";
import "./index.css";

export default function App() {
  return (
    <Wrapper>
      <h1>My Profile</h1>
      <Flower>
        <p className="Developer">
          <MusicPlayer url={mp3} /> <p className="blank"></p>꽃을 클릭하세요♬
        </p>
      </Flower>

      <Spline
        className="spline"
        scene="https://prod.spline.design/jOg6QiwDPAkaHyyZ/scene.splinecode"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 18px;
  margin: 0 auto;
  overflow-x: hidden;

  h1 {
    position: absolute;
    top: 3em;
    left: 3em;
    z-index: 1;
  }

  .periodTitle {
    top: 10.5em;
  }

  .period {
    font-size: 17px;
    position: absolute;
    top: 15.5em;
    left: 7em;
    font-family: "Pretendard";
    color: #3f0a06;
    z-index: 99;
  }

  .spline {
    position: absolute;
    overflow: hidden;
    overflow-x: hidden;
    margin: 0;
    top: 0;
    right: 0;
    left: 10em;
  }
`;

const Flower = styled.div`
  position: absolute;
  top: 8.9em;
  left: 6em;
  z-index: 2;
  color: #3f0a06;

  .Developer {
    font-family: "Pretendard";
    display: flex;
  }
  .blank {
    margin-left: 5px;
  }
`;
