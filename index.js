/**
 * @author renjiefang
 * @date  2019-06-13 11:28
 */
$(function() {
     let box = $('.box')
     let blank = {}
     let ai = true

     for(let i = 0; i < 15; i++) {
         for(let j = 0; j <15; j++) {
             $('<div>').addClass('chess').attr('id',`${i}_${j}`).prependTo(box);
             blank[i+'_'+j] = true
         }
     }

      let flag = true;
      let arr = []
      let black = {};
      let white = {}
     box.on('click', '.chess', function() {
          let _this = $(this)
          if( _this.hasClass('black') || _this.hasClass('green')) {
             // flag =!flag
              return ;
          }
         flag = !flag;


         if(flag) {
              black[_this.attr('id')] = true
              delete blank[_this.attr('id')]
              _this.addClass('black')
              let res =  success(black, _this.attr('id'))
             if(res ===5) {
                 // setTimeout(function() {
                     alert('已产生赢家')
                     box.off('click')
                 //     $('.black').removeClass('black')
                 //     $('.green').removeClass('green')
                 //
                 // },100)
             }
          }else {
             white[_this.attr('id')] = true
             delete blank[_this.attr('id')]
              _this.addClass('green')
            let res = success(white, _this.attr('id'))
             if(res === 5) {
                 // setTimeout(function() {
                     alert('已产生赢家')
                     box.off('click')
                 //     $('.black').removeClass('black')
                 //     $('.green').removeClass('green')
                 //
                 // },100)
             }

             if(ai) {
                  let pos = AI()
                   black[pos] = true
                  delete blank[pos]
                  $('#'+pos).addClass('black')
                 if(success(black, pos) ===5) {
                         alert('已产生赢家')
                         box.off('click')

                 }
              flag = !flag

             }
          }



     })

    function AI() {
       let blackScore = 0, whiteScore = 0;
        let pos1 = '', pos2 = ''
        for(let i in blank) {
            let score = success(black, i)
             if(score >= blackScore) {
                 blackScore = score
                 pos1 = i
             }
        }
        for(let i in blank) {
            let score = success(white, i)
            if(score >= whiteScore) {
                whiteScore = score
                pos2 = i
            }
        }
        return blackScore > whiteScore ? pos1 : pos2
    }

    function success(obj, id) {
          let  s = 1, c = 1, rx = 1, lx = 1;
          let [x,y] = id.split('_');
          let i = x * 1, j = y * 1;
          //水平
          while(obj[i+'_'+(++j)]) {
              s++
              console.log(s);
          }
          j = y *1 ,i = x *1
          while(obj[i+'_'+(--j)]) {
              s++
              console.log(s);
          }
          //垂直
         i = x *1, j = y*1
        while(obj[(++i)+'_'+j]) {
            c++
        }
        i = x *1
        while(obj[(--i)+'_'+j]) {
            c++
        }
        //右斜

        i = x *1, j = y*1
        while(obj[(--i)+'_'+(++j)]) {
            rx++
        }
        i = x *1, j = y*1
        while(obj[(++i)+'_'+(--j)]) {
            rx++
        }

        //左斜
        i = x *1, j = y*1
        while(obj[(++i)+'_'+(++j)]) {
            lx++
        }
        i = x *1, j = y*1
        while(obj[(--i)+'_'+(--j)]) {
            lx++
        }
        console.log(s,c,rx,lx);

        return  Math.max(s,c,rx,lx)



    }




})