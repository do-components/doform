import './masking.scss'
export default {
  // inserted: function(el, binding, vnode) {
  inserted: function(el) {
    // console.log(el, binding, vnode)
    el.style.position = 'relative'
    var divDemo = document.createElement('div')
    divDemo.classList.add('masking')
    // divDemo.innerHTML = `<div class="masking__edit_icons">
    // <button type="button" class="el-button el-button--default is-circle"><!----><i class="el-icon-search"></i><!----></button>
    // </div>`
    divDemo.innerHTML = `
      <ul class="masking__edit">
        <li class="masking__edit__item" data-action="copy" style="display: none">复制</li>
        <li class="masking__edit__item"  data-action="up" style="display: none">上移</li>
        <li class="masking__edit__item"  data-action="down" style="display: none">下移</li>
        <li class="masking__edit__item el-icon-delete" data-action="del"></li>
      </ul>
     `
    el.appendChild(divDemo)
  }
}
