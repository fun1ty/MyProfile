import Spline from "@splinetool/react-spline";
import styled from "styled-components";
import { useState } from "react";
import github from "./img/github-mark.svg";
import mp3 from "./music/inhouse.mp3";
import MusicPlayer from "./musicPlayer";

export default function InHouse() {
  const [isLoading, setIsLoading] = useState(false);

  function onLoad(splineApp) {
    if (splineApp) {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      <h2>
        Click on a Changing Object{" "}
        <Flower>
          <p className="Developer">
            <MusicPlayer url={mp3} /> <p className="blank"></p>꽃을 클릭하세요♬
          </p>
        </Flower>
      </h2>
      <Text>
        <img src={github} alt="github" className="github" />
      </Text>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <Spline
          className="spline"
          scene="https://prod.spline.design/KEnRwGQolfm5Eqgb/scene.splinecode"
          onLoad={onLoad}
        />
      )}
    </Wrapper>
  );
}

const Text = styled.div`
  display: none;
  position: absolute;
  z-index: 97;

  .github {
    width: 20px;
    height: 20px;
  }
`;

const Wrapper = styled.div`
  .spline {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    overflow: hidden;
  }

  h2 {
    position: absolute;
    top: 1em;
    left: 2em;
    z-index: 1;
    color: #3f0a06;
  }
`;

const Flower = styled.div`
  color: #3f0a06;
  font-size: 18px;

  .Developer {
    font-family: "Pretendard";
    display: flex;
    margin-top: 6px;
  }
  .blank {
    margin-left: 5px;
  }
`;
