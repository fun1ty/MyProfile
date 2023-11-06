import Spline from "@splinetool/react-spline";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import blog from "./img/HouseFill.svg";
import git from "./img/github-mark.svg";
import { useRef, useState } from "react";

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const navi = useNavigate();
  const onClickBack = () => {
    navi(-1);
  };
  return (
    <Wrapper>
      {modalOpen && (
        <div
          className={"modal-container"}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <div className={"modal-content"}>
            <span className="modalTitle">Profile</span>
            <span className="myName">김미리</span>
            <Contents>
              <img src={blog} alt="blog" className="blog" />
              <a href="https://kimmr-fun1ty.vercel.app/" className="ablog">
                https://kimmr-fun1ty.vercel.app/
              </a>
              <img src={git} alt="git" className="git" />
              <a href="https://github.com/fun1ty" className="agit">
                https://github.com/fun1ty
              </a>
              <span className="intro">intro</span>
              <span className="skill">기술스택</span>
              <span className="school">학력</span>
              <span className="certificate">자격증</span>
              <span className="action">활동</span>
            </Contents>
          </div>
        </div>
      )}
      <div className={"btn-wrapper"}>
        <button
          className={"modal-open-btn"}
          onClick={() => setModalOpen(true)}
        ></button>
      </div>

      <Spline
        className="spline"
        scene="https://prod.spline.design/YINv2NNx8Zv2PAto/scene.splinecode"
      />
      <Back onClick={onClickBack}></Back>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: hidden;
  .spline {
    position: absolute;
    margin: 0;
    top: 0;
    right: 0;
    left: 0;
    overflow: hidden;
  }
  button {
    all: unset;
    align-items: center;
    cursor: pointer;
    font-family: "Pretendard";
    z-index: 99;
  }
  .modal-open-btn {
    width: 25em;
    height: 20em;
    margin: auto;
    font-size: 30px;
  }
  .modal-open-button {
    cursor: pointer;
    margin-left: auto;
    font-size: 30px;
  }

  .modal-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  .modal-content {
    position: relative;
    background-color: #ffffff;
    width: 50em;
    height: 40em;
    padding: 15px;
  }
  p {
    font-family: "Pretendard";
  }
  .modalTitle {
    position: absolute;
    top: 1em;
    font-size: 30px;
    padding: 10px;
  }
  .myName {
    font-family: "Pretendard";
    position: absolute;
    top: 3.2em;
    left: 9.5em;
  }

  .btn-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
  }
`;

const Contents = styled.div`
  overflow-y: auto;
  img {
    position: absolute;
    width: 25px;
    height: 25px;
    z-index: 99;
  }

  .blog {
    top: 16em;
    left: 21em;
  }

  .git {
    top: 18em;
    left: 21em;
  }
  a {
    font-family: "Pretendard";
    position: absolute;
    z-index: 99;
  }

  .ablog {
    top: 16.3em;
    left: 23em;
  }

  .agit {
    top: 18.3em;
    left: 23em;
  }

  span {
    font-family: "Pretendard";
    position: absolute;
    z-index: 99;
  }

  .intro {
    top: 21em;
    left: 21em;
  }
  .skill {
    top: 23em;
    left: 21em;
  }

  .school {
    top: 25em;
    left: 21em;
  }
  .certificate {
    top: 27em;
    left: 21em;
  }
  .action {
    top: 29em;
    left: 21em;
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
  z-index: 99;
`;
