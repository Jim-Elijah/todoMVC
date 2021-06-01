import React from 'react';

export default function Home(props) {
  const welcome = 'Welcome to this todoMVC!';
  return <div>
    <h2>{toUpperCase(welcome)}</h2>
  </div>
  function toUpperCase(str){
    return str.toUpperCase();
  }
}