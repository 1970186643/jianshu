import { fromJS } from 'immutable';
// import * as actionsTypes from './actionTypes.js';
const defaultState = fromJS({
  title: '实录：再婚后我生了两个儿子，却不敢告诉丈夫我还有个女儿',
  content: '<p>半年后，我们决定结婚，可就在距离我们结婚还有一个月的时候，有一天晚上表弟打电话来，神秘兮兮地给我说，表弟媳妇有话要给我说。</p><p>半年后，我们决定结婚，可就在距离我们结婚还有一个月的时候，有一天晚上表弟打电话来，神秘兮兮地给我说，表弟媳妇有话要给我说。</p><p>半年后，我们决定结婚，可就在距离我们结婚还有一个月的时候，有一天晚上表弟打电话来，神秘兮兮地给我说，表弟媳妇有话要给我说。</p><p>半年后，我们决定结婚，可就在距离我们结婚还有一个月的时候，有一天晚上表弟打电话来，神秘兮兮地给我说，表弟媳妇有话要给我说。</p>'
})

export default(state = defaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}