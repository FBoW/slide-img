function getStyle(dom,prop){
    if(window.getComputedStyle){
          return window.getComputedStyle(dom,null)[prop];
      }else{
          return dom.currentStlye[prop]
      }
}
// 多物体多属性运动 + 回调函数
 function move(dom,propObj,callback){
    clearInterval(dom.timer);
    var iSpeed= null,iCur = null;
    dom.timer = setInterval(function(){
         var lock = true;
        for(var prop in propObj){
            if(prop == 'opacity'){
                iCur = parseFloat( getStyle(dom, prop) * 100 );
            }else{
                iCur = parseInt( getStyle(dom,prop) );
            }
            iSpeed = (propObj[prop] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(prop == 'opacity'){
                dom.style.opacity = ( iCur + iSpeed ) / 100; 
            }else{
                dom.style[prop] =  iCur + iSpeed + 'px';
            }
            if(iCur != propObj[prop]){
                lock = false;
            }

        }
        if(lock){
            clearInterval(dom.timer);
            typeof callback == 'function' && callback();
        }
    },30)
}