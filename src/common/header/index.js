import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store'
import { Top, Logo, Menu, MenuItem, MenuSearch, SearchWrapper, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoItem, Addition, Button } from './style';

class Header extends Component {
  showInfo(){
    const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props;
    const newList = list.toJS();  //把immutable对象转化为js对象
    const pageList = [];  //每页的内容
    //newList为空时，不进行渲染
    //否则key值会一直报警告为空
    if(newList.length){
      for(let i = page * 10; i < (page + 1) * 10; i++){
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }
    if(focused || mouseIn) {
      return (
        <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch 
              onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
            >
              <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe606;</i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <div>
            {pageList}
          </div>
        </SearchInfo>
      )
    }else{
      return null;
    }
  }
  render() {
    const { focused, handleInputFocus, handleInputBlur, list} = this.props;
    return (
      <Top>
        <Logo/>
        <Menu>
          <MenuItem className="left active">首页</MenuItem>
          <MenuItem className="left">下载App</MenuItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={300}
              classNames='slide'
            >
              <MenuSearch
                className={focused ? 'focused' : ''}
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}
              />
            </CSSTransition>
            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe62b;</i>
            {this.showInfo()}
          </SearchWrapper>
          <MenuItem className="right">登入</MenuItem>
          <MenuItem className="right">
            <i className="iconfont">&#xe636;</i>
          </MenuItem>
        </Menu>
        <Addition>
          <Button className="write">
            <i className="iconfont">&#xe96c;</i>
            <span>&nbsp;</span>
            写文章
          </Button>
          <Button className="register">注册</Button>
        </Addition>
      </Top>
    )
  }
}

// 映射state数据到props上
const mapStateToprops = (state) => {
  return {
    // 返回header下面的focused对象
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header' , 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn'])
  }
}
// 映射dispatch方法到props上
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      if(list.size === 0) {
        dispatch(actionCreators.getInfo());
      }
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(page, totalPage, spinIcon) {
      let originAngle = spinIcon.style.transform.replace(/[^0-9]/ig, '')
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      }else{
        originAngle = 0;
      }
      spinIcon.style.transform = 'rotate(' + (originAngle+180) + 'deg)'
      if(page < totalPage-1) {
        dispatch(actionCreators.changePage(page + 1));
      }else{
        dispatch(actionCreators.changePage(0));
      }    
    }
  }
}
export default connect(mapStateToprops, mapDispatchToProps)(Header);