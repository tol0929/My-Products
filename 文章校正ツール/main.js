(function () {
  'use strict';

  function isZen(obj){
    var len=escape(obj).length;
    if(len>=4 || escape(obj) == '%0A'){
      // 全角の場合
      return true;
    }else{
      // 半角の場合
      return false;
    }
  }

  // strのidx文字目の次にvalを挿入
  function strIns(str, idx, val){
    var res = str.slice(0, idx) + val + str.slice(idx);
    return res;
  };

  document.getElementById('btn').addEventListener('click', function(){
    var text = document.getElementById('text1').value;
    var spacenum = [];
    var j = 0;

    text = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    });


    for (var i = 0; i < text.length; i++) {
      if (text[i] == '{' || text[i] == '\n') {
        continue;
      }else if ((isZen(text[i]) == true && isZen(text[i + 1]) == false )
      || (isZen(text[i]) == false && isZen(text[i + 1]) == true )) {
        if (text[i + 1] == '}') {continue;}
        spacenum[j] = i+1;
        j++;
      }
    }
    console.log(spacenum);
    var k = 0;
    for (var i = 0; i < spacenum.length; i++) {
      text = strIns(text, spacenum[i] + k, ' ');
      k++;
    }
    document.getElementById('text2').value = text; //text2に出力
  });


})();
