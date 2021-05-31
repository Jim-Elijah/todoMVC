import React from 'react';

export default function Home(props) {
  const { changeLoginStatus} = props;
  return <div>
    <h2 onClick={()=>{changeLoginStatus(false)}}>点此退出登录！</h2>
  </div>
}