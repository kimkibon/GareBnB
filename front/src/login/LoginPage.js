import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './login.css';
import axios from "axios";


const LS_KEY_ID = "LS_KEY_ID"; //로컬스토리지에 저장할 ID
const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG"; //로컬스토리지에 저장 checkbox여부

const Login = () => {
  const [loginID, setLoginID] = useState(""); //LoginID를 Input에서 사용하고 OnChange에서 변경
  const [loginPassword, setLoginPassword] = useState(""); //비밀번호 입력을 위한 선언
  const [saveIDFlag, setSaveIDFlag] = useState(false); //ID저장 checkbox
  const [passwordOption, setPasswordOption] = useState(false); //비밀번호표시 checkBox컨트롤
  const [passwordInputType, setPasswordInputType] = useState({ 
    type: "password",
    autoComplete: "current-password",
  }); //type과 autoComplete를 변경하기 위한 useState
  const [capsLockFlag, setCapsLockFlag] = useState(false); //caps lock감지를 위한 flag

  //getModifierState로 bool값을 얻어 CapsLockFlag로 set
  const checkCapsLock = (e) => {
    let capsLock = e.getModifierState("CapsLock");
    setCapsLockFlag(capsLock);
  };
  
  //ID에 한글입력불가능
  const dataRuleCheckForID = (ch) => {
    let ascii = ch.charCodeAt(0);
    if (48 /* 0 */ <= ascii && ascii <= 57 /* 9 */) return true;
    if (65 /* A */ <= ascii && ascii <= 90 /* Z */) return true;
    if (97 /* a */ <= ascii && ascii <= 122 /* z */) return true;
    if (ch === ".") return true;

    return false;
  };

  // 가장 마지막에 입력된 문자로 dataRuleCheckForID를 호출하여 loginID를 set한다.
  const getLoginID = (event) => {
    let value = event.target.value;

    if (value === "") {
      setLoginID(value);
      return;
    }

    let length = value.length;
    if (dataRuleCheckForID(value[length - 1]) === false) return;
   
    setLoginID(value);

    return;
  };

  const handleSaveIDFlag = () => {
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, !saveIDFlag);
    setSaveIDFlag(!saveIDFlag);
  };
  
  //로그인 버튼 눌렀을 때 
  const loginClick = () => {
    console.log({ loginID, loginPassword });
    
    if (loginID !== "") { //아이디가 비어있지 않을 때
      

      if (loginPassword !== "") { //패스워드가 비어있지 않을 때
        axios({ //MEM_ID 와 MEM_PW로 확인하고 MEM_ID 로컬스토리지 저장
          method : 'post' ,
          url : '/GareBnB/login/login.do' ,
          contentType:"application/json;charset=UTF-8",
          params : {
              'MEM_ID' : loginID ,
              'MEM_PW' : loginPassword 

          }}).then(Response => {
            if (Response.data === ""){ //MEM_ID와 MEM_PW가 맞지않거나 없을 때 null이 리턴됨
              alert("아이디나 비밀번호를 잘못 입력하셨습니다.");
              console.log("hi")
            }
            else {
              console.log(Response)
              console.log(Response.data.MEM_LEVEL)
              
              localStorage.setItem('MEM_ID', Response.data.MEM_ID)  //MEM_ID만 로컬스토리지에 저장
              console.log(localStorage)
            
            }
          }).catch(err => {
            console.log(err);
          });

      }
      else alert("비밀번호를 입력하세요");

      
    }
    else alert("아이디를 입력하세요");
    
  

   
    //체크박스 v인경우 (saveIDFlag ===true) 로컬스토리지에 loginId를 set
    if (saveIDFlag) localStorage.setItem(LS_KEY_ID, loginID);

    
    
  };
  
  /*페이지가 최초 렌더링 될 때 checkbox확인
  idFlag에 따라 checkbox를 변경해주고 false인 경우 ID를 ""로 set
  저장한 Id가 있다면 setLoginId로 ID를 보여준다.*/
  useEffect(() => {

    let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
    if (idFlag !== null) setSaveIDFlag(idFlag);
    if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");

    let data = localStorage.getItem(LS_KEY_ID);
    if (data !== null) setLoginID(data);
  }, []);
  
  //PasswordOption이 변경될때마다 setPasswordInputType로 type과 autoComplete를 변경한다.
  useEffect(() => {
    if (passwordOption === false)
      setPasswordInputType({
        type: "password",
        autoComplete: "current-password",
      });
    else 
      setPasswordInputType({ 
        type: "text", 
        autoComplete: "off" 
      });
  }, [passwordOption]);

  return (
    <div className="login-form">
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-logo">
            <span className="logo-image">LOGO</span>
          </div>
          <form id="loginForm">
            <div className="form-group">
              {/* ID 인풋 */}
                <input
                type="text"
                id="email"
                name="email"
                placeholder="아이디"
                className="input-id"
                onKeyDown={(e) => checkCapsLock(e)} //캡스락 확인
                value={loginID}
                onChange={(e) => getLoginID(e)} //내용이 바뀔떄마다 ID GET
              />
              </div>
              {/* 비밀번호 인풋 */}
              <div className="form-group">
              <label for="exampleInputPassword1">비밀번호   </label>
              <input
                type={passwordInputType.type}
                id="password"
                name="password"
                placeholder="비밀번호"
                className="input-pw"
                autoComplete={passwordInputType.autoComplete}
                onKeyDown={(e) => checkCapsLock(e)} //캡스락 확인
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="checkbox-wrapper">
              <span className="checkbox-item">
              {/* 아이디저장 input */}
              <input
                type="checkbox"
                name="saveEmail"
                id="saveEmail"
                checked={saveIDFlag}
                onChange={handleSaveIDFlag}
              />
              <label>
                <span>아이디 저장</span>
              </label>
              </span>
              
            {/* capsLockFlag에 따라 className과 Caps Lock On/Off로 변경되게 한다. */}
            <span
              className={
                capsLockFlag ? "caps-lock caps-lock-on" : "caps-lock"
              }
            >
              {capsLockFlag ? "Caps Lock On" : "Caps Lock Off"}
            </span>
            </div>

          <span className="login-button" onClick={loginClick}>
            로그인
          </span>
          </form>
          <ul className="login-li-group">
            <li>
              <span onClick={() => alert("잘 기억해보세요.")}>아이디 찾기</span>
            </li>
            <li>
              <span onClick={() => alert("잘 기억해보세요.")}>
                비밀번호 찾기
              </span>
            </li>
            <li>
              <Link to="/Join">
                <span className="bold">회원가입</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;