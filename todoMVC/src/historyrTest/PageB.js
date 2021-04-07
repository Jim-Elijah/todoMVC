import React from 'react'

class PageB extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }
  clickBackHandler = () => {
      // 返回到上一级页面的几种方法
      // 第一种 
      // this.props.history.push('/login');
      // this.props.history.go()
      //第一种 this.props.history.replace('/home'); 但这两种方法都不好
      //第三种方法,推荐使用
      // window.history.back(-1);
  }

  render() {
    return (
      <div>
        <span onClick={this.clickBackHandler}>
          page B
        </span>
      </div>
    )
  }
  componentDidMount(){
    console.log('didMount')
    //console.log(this.props.location)//传递过来的所有参数
    console.log(this.props.location.query.toB)//val值
}
}
export default PageB