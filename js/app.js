$(function(){

    /* hover效果 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、*/
    $('.search button').hover(function(){
        $('.search').toggleClass('button-hover');
    });
    $(".chat-space").mCustomScrollbar({ autoHideScrollbar: true });
   
    $(".chat-space-button button").click(function(){
        alert("想多了，还没做");
    })
     
     
    function showButtons(){
        var timer;
        var ok =true;
        $(".funcs .right-button button").mouseenter(function(e){    
            var me=$(e.target);

            e.target.oncontextmenu = function (){
                    return false;                   //禁止右键
                }
            me.addClass('change1');                 
            clearTimeout(timer);                //清除定时器
            timer=setTimeout(function(){
                me.addClass('button-hover') ;        //一秒后添加hover类名
                $('.funcs .buttons').addClass('open').animate({right:"50px"},500);  
            },1000);

            if(me.hasClass('change2')){
                me.addClass('button-hover').removeClass('change2');   //如果有change2类名，去掉后再加上hover类名
            }
            if(me.hasClass('button-hover')){
                me.removeClass('change1');         //如果有hover类名则去掉change1类名
            }
        })

        
        
        $(".funcs .right-button button").mouseleave(function(e){          
            if(ok==false)return;
            var me=$(e.target);
            clearTimeout(timer);
            me.removeClass('change1');
            if(me.hasClass('button-hover')){
                me.addClass('change2');         
                setTimeout(function(){
                    me.removeClass('button-hover');
                },100);
                return timer=setTimeout(function(){                    //返回一个定时器
                   
                    me.removeClass('change2');
                    $('.funcs .buttons').removeClass('open').animate({right:"-120px"},500);
                },1000)
                
            }      
            
        })
        $(".funcs .buttons").mouseenter(function(){
                                                            
            if($(this).hasClass('open')){                           //在关闭前进入buttons，则清除定时器 
                ok=false;
                clearTimeout(timer)
                // console.log('1')
            }           
        })
        $(".funcs .buttons-wrap").mouseleave(function(){                
            // console.log('2');
            if($(".funcs .buttons").hasClass('open')){              //如果已经打开了buttons，离开的时候先变为change2状态，如果没有打开，则不变
                $(".funcs .right-button button").addClass('change2');
            }
          
            clearTimeout(timer)
             timer=setTimeout(function(){               
                $(".funcs .right-button button").removeClass('change2');
                $(".funcs .right-button button").removeClass('button-hover');
                $('.funcs .buttons').removeClass('open').animate({right:"-120px"},500);
            },1000)
        })      
        
    }
    showButtons();
 
    


    ////////////////////////////////////////////////tip////////////////////////////////////////////////////
    var showtip=function(Element){
        var element=$(Element);
        var buttons=element.children('li');
        var info;
        var timer;
        var template='<div style="border:1px solid #888;position:absolute;padding:3px 6px;font-size:10px;font-family:微软雅黑;background:#fff;z-index:1000000;color:#444; "></div>'
        var tip=$(template).appendTo(document.body);
        tip.hide()
        buttons.mouseenter(function(e){            
            info=null;
            var me=$(e.target);  
            var offset = me.offset(),
                height = me.outerHeight(),
                width = me.outerWidth();
            var info=me.closest('li').attr('data-info') ;             //获取最近li的data-info
            if(typeof(info)=='undefined') return; 
            tip.html(info);
            clearTimeout(timer);
            timer = setTimeout(function(){
                // arr=$(me).mousemove(function(event){
                //     return [event.pageX,event.pageY]               //想定时获取鼠标位置失败    
                // })
                tip.show();  
     
            },600);

            tip.css({top:offset.top+height+2+'px',left:offset.left+width/2})

        })
        buttons.mouseleave(function(){
            clearTimeout(timer);
            tip.hide();
        })

    }

    showtip('.input-space-buttons');
    showtip('.funcs .buttons')
    
    /////////////////////////////////////////title-buttons///////////////////////////////////////////////////////
    
    $('.win-max').click(function(){
        //$('.comm-open').toggleClass('hidden');
        $('.window').css({'left':'50%','top':'50%','margin':'0px'})
        $('.comm-plus').toggleClass('hidden');
        $('.window').toggleClass('compact');
        if($('.window').hasClass('compact')){
            $('.window').css({'left':'0px','top':'0px'})
            $(this).find('i').removeClass('fa-square-o').addClass('fa-clone');

        }else{
            $('.window').css({'left':'50%','top':'50%','marginTop':'-225px','marginLeft':'-300px'})
            $(this).find('i').addClass('fa-square-o').removeClass('fa-clone');
            
        }
    })
    $('.win-close').click(function(){
        $('.window').removeClass('compact').addClass('hidden');
        $('.win-max').find('i').addClass('fa-square-o').removeClass('fa-clone');
        $('.comm-open').removeClass('hidden');
        $('.comm-plus').removeClass('hidden');
        $('.window').css({'left':'50%','top':'50%','marginTop':'-225px','marginLeft':'-300px'})
        $('.min-win').remove();
    })
    


    ////////////////////////////     增加联系人 /////////////////////////////////////////////////////
    function addlinkman(){
        var num=0;
        var listlen;
        $('.comm-plus').click(function(){
            $('.window').removeClass('changeList')
            listlen=$('.comm-list').children('li').length;    
            var template='<li><span></span><i class="fa fa-close"></i></li>';
            $(template).attr('id','comm'+num).addClass('comm-css').appendTo('.comm-list');
            num++ 
            
            if(listlen>=8){
                $(".left").mCustomScrollbar({ autoHideScrollbar: true });
                $(".left").mCustomScrollbar("disable",false);
            }else{
                $(".left").mCustomScrollbar("destroy");
            }
            console.log(listlen)


        })
        $('.comm-list').on('click','li i',function(){
            $(this).parent().remove();
            listlen=$('.comm-list').children('li').length; 
            if(listlen=='0'){
                $('.window').addClass('changeList')
            }
          
        })
   
        
       
    }
    addlinkman();

    // $('.left').mouseenter(function(){
    //     console.log('1')
    // })
    // $('.comm-list').mouseenter(function(){
    //     console.log('2')
    // })
    /////////////////////////////////////////////////////////input-btn///////////////////////////
    $('.input-btn .send').click(function(){
        var text=$('.input-space-area').val();
        var template ='<div class="box"></div>'

        $(template).html(text).appendTo('.chat-space>div>div#mCSB_1_container');
      
        $('.input-space-area').val('');
      

    })
    $('.input-space-area').bind('keyup', function(event) {
        if (event.keyCode == "13") {
            //回车执行查询
            $('.input-btn .send').click();
        }
    });
    ////////////////////////////////////拖拽////////////////////////////////////////////////
    function drag(element){
        var isdrag = false;                     //标识是否允许拖动
        var isdragging = false;                         //标识是否正在拖动
        var oldx,oldy;
        var newx,newy;
        var X,Y;
        var offset;
        var me =$(element);
        // $(document).on('mousedown',element,function(e){
        me.mousedown(function(e){
            isdrag = true;
            oldx=e.clientX;
            oldy=e.clientY;
            offset=$(element).offset();  
                   
        })
        
        $(document).on('mousemove',function(e){
            e= e || window.event;
            if(isdrag==false)return;                         //当不能拖动时返回
            isdragging =true;                                //设置为正在拖动
            newx=e.clientX;
            newy=e.clientY;
            me.css('cursor','default')
            X=newx-oldx+offset.left;
            Y=newy-oldy+offset.top;
            $(element).parents('.window').css({'left':X,'top':Y,'margin':'0px'});

        })
        $(document).on('mouseup',function(){
            
            if(isdragging==true){
                isdrag=false;
               isdragging=false;
            }
            // isdrag=false;
            // isdragging=false;
         
        })
        // me.mouseup(function(e){
        //     isdrag = false ;
            
        // })
        // document.addEventListener('mousemove',function(e){
        //     if(e.clientY > window.innerWidth || e.clientY<0 || e.clientX<0 ||e.clientX>window.innerHeight){
                    //move时候鼠标超出浏览器的时候
        //     }
        // })
            

    }

    drag('#drag-area');

    // 现在我要实现桌面栅格中 file的拖动

    function dragfile(element){
        var isfiledrag = false;
        var isfiledragging=false;
        var issort = true;   
        // var me ;
        var _me ;
        //var timer;
        var oldx,oldy;                  //一开始的鼠标位置
        var newx,newy;                     //后来的鼠标位置
        var X,Y;                        //偏移量
        var offset;                                 
        var cellHeight,cellWidth,cellH;

        var newidy=null;
        var newidx=null;
        $(document).on('mousedown',element,function(e){
            var me = $(e.target).closest('button');
   
            isfiledrag = true;
            _me = null;
            oldx=e.clientX;
            oldy=e.clientY;
            offset=me.offset();  
            var dataid=$(me).attr('id')
            
            _me=me.clone().removeClass('hover chosed').addClass('clone');
            _me.appendTo(document.body);


            // timer=setTimeout(function(){
            //     _me=me.clone().removeClass('hover chosed').addClass('clone');
            //     _me.appendTo(document.body)
            // },200)
            
        })
        $(document).on('mousemove',function(e){
            var me = $(e.target).closest('button');
            e= e || window.event;
            if(isfiledrag==false)return;
 
            isfiledragging = true;
            newx=e.clientX;
            newy=e.clientY;
            _me.addClass('move')
            X=newx-oldx+offset.left;
            Y=newy-oldy+offset.top;
            _me.css({'left':X,'top':Y});
            



            
            var width;

            cellWidth=$('.file-wrap-cell').width();
            cellHeight=$('.file-wrap-cell').height();
            cellH = $('#cell-wrap-li1').outerHeight(true);
            if(newy>cellHeight){    
                newidy =((newy-cellHeight)-(newy-cellHeight)%cellH)/cellH+1;
                
            }else{
                newidy=0;
            }
            if(newx>cellWidth){
                var p=$('#cell-wrap-li'+newidy).children('.file-wrap-cell').length;
                width=$('#cell-wrap-li'+newidy).width();
                newidx=(newx-newx%(width/p))/(width/p)        
            }else{
                newidx=0;
            }
            
            
            

        })
        $(document).on('mouseup',function(e){
            // var k=0;
            // var k2=0;
            // var kk=0;
            // var width;
            
            var mytargetid =$(e.target).closest('button').attr('id');
            //console.log('{'+newidy+','+newidx+'}');
            
            var mytarget = $('#'+mytargetid);
            var mybox=$('#cell'+newidy+'.'+newidx);

            if(newidx==null)return
           // mytarget.clone(true).appendTo(document.body)
            //mytarget.clone(true).appendTo(mybox)
            console.log(mybox)
            
           
           
        //    mytarget.clone().appendTo(mybox);
        //    mytarget.remove()
            //$('#'+mytarget).remove();
            $('.chosed').removeClass('chosed');
       
            // me.addClass('chosed')   不知道为什么不能实现
         
           

            //  cellWidth=$('.file-wrap-cell').width();
            //  cellHeight=$('.file-wrap-cell').height();
            //  cellH = $('#cell-wrap-li1').outerHeight(true);
             
            //  newx=e.clientX;
            //  newy=e.clientY;
       
            
               
                // isfiledragging=false;
                


                //现在我需要计算newx和newy在file-wrap-cell里面

                //第一行最特殊 没有margintop 所以先考虑这种情况 再考虑其他情况
                // if(newy>cellHeight){    
                //     k =((newy-cellHeight)-(newy-cellHeight)%cellH)/cellH+1;
                    
                // }
                // if(newx>cellWidth){
                //     var p=$('#cell-wrap-li'+k).children('.file-wrap-cell').length;
                //     width=$('#cell-wrap-li'+k).width();
                //     kk=(newx-newx%(width/p))/(width/p)
                    
                    
                    
                // }
                
                
                // console.log('{'+k+','+kk+'}')
                
                
                if(issort==true&&!_me==null){
                    _me.removeClass('move').remove();
                    
                }
                
            
                _me = null;  
                
                // newidx=null;
                // newidy=null;
                isfiledrag = false ;
                //console.log('{'+newx+','+newy+'}')
            
            
            //_me.removeClass('move').remove();
            // isfiledrag = false ;
            // isfiledragging=false;
            //_me.remove();
                // return function(){
                //     alert('1')
                // }
                
             
        })
        $(document).on('mouseup',element,function(){
            isfiledrag = false ;
            isfiledragging=false;
            _me.removeClass('move').remove();
        })
        

    }

    


    

    /////////////////////// 拉伸///////////////////////////////////////////////////////////



    ///////////////////////////////////
    //确定背景栅格
    function makeCell(element){
        var width ;
        var height;
                                                            // wrap-cell中有button的时候有filled类
        var boxW=$('.file-wrap-cell').width();
        var boxH=$('.file-wrap-cell').height();
        // 不同尺寸不同栅格
        function drawcell(){
         

            width =$(element).parent().width();     
            height=$(element).parent().height();

            height=height-boxH-44; 
           
            //var num1 = width/boxW;       // num1 一层一共需要创建的个数 非整数
            var num2 = width%boxW;          //一层 余数 多余的尺寸
            var num3 = (width-num2)/boxW-1      // 一层 一共需要创建的个数 整数
           // var num4 = height/boxH                            //计算有多少行   非整数
            var num5 = height%boxH                  //多出的高度   
            var num6 = (height-num5)/boxH            //一共需要创建多少行 整数  

            for (let i=0;i<num3;i++){  
                var k,item;
                var targetLi='#'+'cell-wrap-li'+'0';
                k = (i+1)*boxW+(i+1)*(num2/(num3+1));
                item = $('<div class="file-wrap-cell" style=""></div>').css('left',k).attr('id','cell'+'0.'+(i+1));
                item.appendTo(targetLi);                                            
            }

            for(let j=0 ;j<num6 ;j++){
                var topM=num5/(num6+1);
                $('<li></li>').attr('id','cell-wrap-li'+(j+1)).css('margin-top',topM).appendTo(element);
                for (let i=0;i<num3+1;i++){  
                    var k,item;
                    var targetLi='#'+'cell-wrap-li'+(j+1);
                    k = i*boxW+(i)*(num2/(num3+1));
                    if(i==0&&j<2){
                        button=$( '<button><i></i><span></span></button>').addClass('btn').attr('id','cellbutton'+(j+1));
                        item = $('<div class="file-wrap-cell filled" style=""></div>').css('left',k).attr('id','cell'+(j+1)+'.'+i);
                        button.appendTo(item)
                    }else{
                        item = $('<div class="file-wrap-cell" style=""></div>').css('left',k).attr('id','cell'+(j+1)+'.'+i);
                    }
                    
                    item.appendTo(targetLi);                                            
                }
               
                
            }
            
            // $('#cell-wrap-li1 .file-wrap-cell').eq(2).append('<div>123</div>')

        }
        window.onload=drawcell();

        // 窗口大小调整之后栅格的变化
        $(window).resize(function(){ 
            window.location.reload()  //重新加载背景的栅格   
        })
        // dragfile('#cellbutton0')
        // dragfile('#cellbutton1')
        // dragfile('#cellbutton2')
        dragfile('.btn')
        
    }
    makeCell('.cell');

    $('#cellbutton1').find('span').html('Go');
    $('#cellbutton2').find('span').html('Dota2');
    $('.btn').hover(function(){
        $(this).toggleClass('hover')
    })



    $('.btn').click(function(e){       
       // e.stopPropagation();
        $('.chosed').removeClass('chosed');
        $(this).addClass('chosed');
    })
    $(document).on('click',function(e){
        var me =$(e.target);
        if(!$(me).parents('.btn').hasClass('chosed')){
            $('.btn').removeClass('chosed');
        }
       
    })


    $(document).on('dblclick','.comm-open',function(){
        $('.window').removeClass('hidden');
    });
    $('.win-min').click(function(){
        $('.window').addClass('hidden');
        $('.min-win').remove();
        var button =$('<button><i class="fa fa-qq"></i></button>').addClass('min-win');
        $('#footer-taskbar').append(button)
    })
    // $('.min-win').click(function(){
    //     //$('.window').removeClass('hidden');
    //     alert('1')
    // })
    $(document).on('click','.min-win',function(){
        $('.window').removeClass('hidden');
        // $(this).remove();
    })
    
    // $(document).on('contextmenu',function(e){
    //     var l = $(e.target);
    //     if(l.parents('.btn').hasClass('hover')){
    //         console.log('1')                            //有文件的情况
    //         return false;
    //     }else{
    //         console.log('2')
    //         return false;                                        //没有文件的情况
    //     }
    
    //     //return false;
    // })

    

    function time(){
        function p(s) {
            return s < 10 ? '0' + s: s;
        }
        var myDate = new Date();
        //获取当前年
        var year=myDate.getFullYear();
        //获取当前月
        var month=myDate.getMonth()+1;
        //获取当前日
        var date=myDate.getDate(); 
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        var s=myDate.getSeconds();  
        
        var now1=year+'-'+p(month)+"-"+p(date)
        var now2=p(h)+':'+p(m)+":"+p(s);
        
        $('#time-teller .up').html(now2);
        $('#time-teller .down').html(now1);
    }

    window.onload=setInterval(function(){
        time()
    },1000)



})