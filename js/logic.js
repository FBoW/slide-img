var timer = null;
var oImgList = document.getElementsByClassName('img-list')[0];
var preBtn = document.getElementsByClassName('preBtn')[0];
var nextBtn = document.getElementsByClassName('nextBtn')[0];
var oSpan = document.getElementsByClassName('indexBtn')[0].getElementsByTagName('span');
var moveWidth = oImgList.children[0].offsetWidth;
var length  = oImgList.children.length - 1;
var lock = true;
var index = 0;
preBtn.onclick = function(){
    slideImg('next->pre');
}
nextBtn.onclick = function(){
    slideImg('pre->next');
}
for(var i = 0; i < oSpan.length; i++){
    (function(myIndex){
        oSpan[i].onclick = function(){
            // console.log(index);
            clearInterval(timer);
            lock = false;
            index = myIndex;
            move(oImgList,{left: - index * moveWidth},function(){
                lock = true;
                changeIndex(index);
                timer = setInterval(slideImg,1500);
            });
        }
    })(i)
}
function slideImg(direction){
    if(lock){
        lock = false;
        clearInterval(timer);
        if(!direction || direction ==   'pre->next'){
            index++;
            move(oImgList,{left:oImgList.offsetLeft - moveWidth},function(){
                if(oImgList.offsetLeft == - length * moveWidth){
                    oImgList.style.left = '0px';
                    index = 0;
                }
                timer = setInterval(slideImg,1500);
                lock = true;              
                changeIndex(index);  
            });
        }else if(direction == 'next->pre'){
            if(oImgList.offsetLeft == 0){
                oImgList.style.left = - length * moveWidth + 'px';
                index = length;
            }
                index--;
            move(oImgList,{left:oImgList.offsetLeft + moveWidth},function(){
                timer = setInterval(slideImg,1500);
                lock = true;
                changeIndex(index);
            });
        }
    }
    
}
function changeIndex(_index){
        for(var i = 0; i < length; i++){
            oSpan[i].className = '';
        }
        oSpan[_index].className = 'selected';
}
timer = setInterval(slideImg,1500);