import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  insertUserAsync,
  deleteUserAsync,
  updateUserAsync,
  asyncUpDBFetch,
  // subscribeToDBData,
} from "./store/VisitWrite";
import pencile from "./img/Pencils.svg";
import { useNavigate } from "react-router-dom";

export default function Visit() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const modalBackground = useRef();
  const [updateData, setUpdateData] = useState({});
  const [error, setError] = useState(null);
  // const beforePassword = useSelector((state) => state.visitWrite);

  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  //DB가져오기
  const dispatch = useDispatch();

  const DBList = useSelector((state) => state.visitWrite.array);

  console.log("DBList", DBList);
  useEffect(() => {
    // dispatch(subscribeToDBData());
    dispatch(asyncUpDBFetch());
  }, [dispatch]);

  // const DBList = useSelector((state) => state.visitWrite.array);
  // const DBListInsert = useSelector((state) => state.visitWrite.status);
  // const DBListUpdate = useSelector((state) => state.visitWrite.status);

  // useEffect(() => {
  //   dispatch(asyncUpDBFetch());
  // }, [dispatch]);

  // console.log("DBList", DBList);

  // useEffect(() => {
  //   dispatch(asyncUpDBFetch()).then((action) => {
  //     if (asyncUpDBFetch.fulfilled.match(action)) {
  //       setDBuser(action.payload);
  //       console.log("DB", action.payload);
  //     }
  //   });
  // }, [dispatch]);

  //useForm
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  //폼 제출
  const onSubmit = (data, e) => {
    e.preventDefault();
    setModalOpen(false);
    console.log("add", data);
    if (data.username && data.write && data.password) {
      dispatch(insertUserAsync(data));
      window.location.reload();
      setError(null);
    }
  };

  const updateMessage = (id, context, name) => {
    const DBupdateData = { id, context, name };
    setUpdateData(DBupdateData);
    setModalUpdateOpen(true);
  };

  const updateMsg = async (data) => {
    const updatedData = {
      id: updateData.id,
      password: data.userPassword,
      context: data.guestMessage,
    };
    const updateConfirm = await dispatch(updateUserAsync(updatedData));
    if (updateConfirm.payload) {
      setModalUpdateOpen(false);
      setUpdateData(updatedData);
      setError(null);
      setValue("userPassword", "");
      window.location.reload();
    } else {
      setError("비밀번호가 틀렸습니다.");
      setValue("userPassword", "");
      return;
    }
  };

  const deleteMsg = async (id, pw) => {
    if (!pw) {
      setError("비밀번호를 입력하세요.");
      return;
    }
    console.log("delete", pw);
    const deleteUserInfo = { id, pw };
    const deleteConfirm = await dispatch(deleteUserAsync(deleteUserInfo));
    if (deleteConfirm.payload) {
      setUpdateData({});
      setValue("userPassword", "");
      setError(null);
      setModalUpdateOpen(false);
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <Wrapper>
      <h1>Guestbook</h1>
      <div className={"btn-wrapper"}>
        <button className={"modal-open-btn"} onClick={() => setModalOpen(true)}>
          방명록 작성하기
        </button>
      </div>
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
            <p className="modalTitle">방명록을 남겨주세요</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  {...register("username", {
                    value: "",
                    shouldUnregister: true,
                    required: "아이디를 작성해주세요",
                    minLength: {
                      value: 2,
                    },
                  })}
                />
              </label>
              <p className="errorMessage username">
                {errors.username?.message ||
                (DBList &&
                  DBList.some((item) => item.name === getValues("username")))
                  ? "이미 있는 유저아이디 입니다."
                  : null}
              </p>
              <label htmlFor="password">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="passowrd"
                  placeholder="비밀번호(수정 및 삭제에 사용됩니다.)"
                  {...register("password", {
                    value: "",
                    shouldUnregister: true,
                    required: "비밀번호를 입력하세요.",
                    minLength: {
                      value: 2,
                    },
                  })}
                />
              </label>
              <p className="errorMessage pw"> {errors.password?.message}</p>
              <label htmlFor="write">
                <textarea
                  id="write"
                  name="text"
                  placeholder="메세지"
                  {...register("write", {
                    value: "",
                    shouldUnregister: true,
                    required: "메세지를 작성해주세요",
                    minLength: {
                      value: 2,
                    },
                  })}
                ></textarea>
              </label>
              <button type="submit" className="submitBtn">
                작성하기
              </button>
            </form>
            <p className="errorMessage msg">{errors.write?.message}</p>
          </div>
        </div>
      )}

      {modalUpdateOpen && (
        <div
          className={"modal-container"}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setUpdateData({});
              setModalUpdateOpen(false);
            }
          }}
        >
          <div className={"modal-content"}>
            <p className="modalTitle">방명록 수정하기</p>
            <form onSubmit={handleSubmit(updateMsg)}>
              <label htmlFor="userid">
                <input
                  type="text"
                  id="userid"
                  name="userid"
                  placeholder="이름"
                  value={updateData.name}
                  readOnly
                  {...register("userid", {})}
                />
              </label>
              <label htmlFor="userPassword">
                <input
                  type="password"
                  id="userPassword"
                  name="userPassword"
                  className="passowrd"
                  placeholder="비밀번호"
                  {...register("userPassword", {
                    required: "비밀번호를 입력하세요.",
                    minLength: {
                      value: 2,
                    },
                  })}
                />
                <p className="errorMessage pw">
                  {errors.userPassword?.message
                    ? errors.userPassword.message
                    : error}
                </p>
              </label>
              <label htmlFor="guestMessage">
                <textarea
                  id="guestMessage"
                  name="guestMessage"
                  placeholder="메세지"
                  {...register("guestMessage", {
                    required: "메세지를 작성해주세요",
                    minLength: {
                      value: 2,
                    },
                    value: updateData.context,
                  })}
                ></textarea>
              </label>
              <button className="updateBtn" type="submit">
                수정하기
              </button>
              <button
                className="deleteBtn"
                onClick={() =>
                  deleteMsg(updateData.id, getValues("userPassword"))
                }
              >
                삭제하기
              </button>
            </form>
          </div>
        </div>
      )}
      <table>
        <tbody>
          {DBList[0] &&
            DBList[0].map((value) => {
              return (
                <tr key={value.id}>
                  <td className="vistitMsg">
                    {value.context ? value.context : value.guestMessage}
                  </td>
                  <td className="writer">작성자: {value.name}</td>
                  <td className="edit">
                    <button
                      className={"updateModal-open-btn"}
                      onClick={() =>
                        updateMessage(value.id, value.context, value.name)
                      }
                    >
                      수정
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button className="goBack" onClick={onClick}></button>

      <img src={pencile} alt="방명록" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: hidden;
  .spline {
    position: absolute;
    overflow: hidden;
    overflow-y: hidden;
    margin: 0;
    top: 0;
    right: 0;
  }

  img {
    position: absolute;
    right: 5em;
    bottom: 3em;
    width: 30em;
    z-index: 10;
  }

  hr {
    z-index: 99;
  }

  h1 {
    position: absolute;
    top: 1em;
    left: 2em;
  }
  button {
    all: unset;
    font-size: 12px;
    align-items: center;
    cursor: pointer;
    font-family: "Pretendard";
    z-index: 9;
  }

  .goBack {
    position: absolute;
    right: 5em;
    bottom: 3em;
    width: 31em;
    height: 30em;
    z-index: 30;
  }

  input {
    all: unset;
    width: 360px;
    font-family: "Pretendard";
    border: none;
    border-bottom: 1px solid grey;
    padding: 5px;
  }

  form {
    padding-left: 10px;
  }

  table {
    margin-top: 7em;
    margin-left: 5em;
  }

  tr,
  td {
    font-family: "Pretendard";
    border-bottom: 1.5px solid grey;
    border-right: 1.5px solid grey;
    padding: 10px;
  }

  .vistitMsg {
    width: 20em;
  }

  .modal-open-btn {
    font-size: 20px;
    color: #cd7013;
  }

  .modal-open-btn:hover {
    color: blue;
  }

  textarea {
    all: unset;
    position: absolute;
    font-family: "Pretendard";
    top: 13em;
    left: 2em;
    width: 749px;
    height: 300px;
  }

  .errorMessage {
    position: absolute;
    color: red;
  }

  .errorMessage.pw {
    right: 16em;
  }

  .errorMessage.msg {
    top: 14em;
    left: 1.5em;
  }

  .btn-wrapper {
    position: absolute;
    top: 3.8em;
    left: 17em;
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
    width: 50rem;
    height: 40rem;
    padding: 15px;
    z-index: 99;
  }
  p {
    font-family: "Pretendard";
  }

  .updateNdeleteBtn {
    display: flex;
  }

  .updateModal-open-btn {
    margin-left: 5em;
  }
  .updateModal-open-btn:hover {
    color: #cd7013;
  }
  .submitBtn {
    position: absolute;
    font-size: 20px;
    bottom: 3em;
    right: 45%;
    font-family: "Pretendard";
  }

  .updateBtn {
    position: absolute;
    font-size: 20px;
    width: 300px;
    bottom: 3em;
    left: 28em;
    font-family: "Pretendard";
  }

  .deleteBtn {
    position: absolute;
    font-size: 20px;
    width: 300px;
    bottom: 3em;
    right: 45%;
    font-family: "Pretendard";
  }

  .modalTitle {
    font-size: 30px;
    padding: 10px;
  }

  .passowrd {
    margin-left: 1em;
  }
  .vistitMsg {
    padding-right: 15px;
  }
`;
