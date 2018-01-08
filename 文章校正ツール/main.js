/*
＜半角スぺースを入れないパターン＞
全角カンマ（ピリオド）＋半角文字
"「" + "半角文字" + "」"
*/
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

  function convert_kigo_han_zen(str, option) {
  //option=0:半角から全角, 1:全角から半角
  var pairs, pairs_length, i, before, after;
  if(option !== 0) {
    option = 1;
  }
  pairs = [
    ["\u0020", "\u3000"], // 半角スペース⇔全角スペース
    // ["\u0021", "\uFF01"], // !⇔！
    // ["\u0022", "\u201D"], // "⇔”
    // ["\u0023", "\uFF03"], // #⇔＃
    // ["\u0024", "\uFF04"], // $⇔＄
    // ["\u0025", "\uFF05"], // %⇔％
    // ["\u0026", "\uFF06"], // &⇔＆
    // ["\u0027", "\u2019"], // '⇔’
    ["\u0028", "\uFF08"], // (⇔（
    ["\u0029", "\uFF09"], // )⇔）
    // ["\u002A", "\uFF0A"], // *⇔＊
    // ["\u002B", "\uFF0B"], // +⇔＋
    // ["\u002C", "\uFF0C"], // ,⇔，
    // ["\u002D", "\uFF0D"], // -⇔－
    // ["\u002E", "\uFF0E"], // .⇔．
    // ["\u002F", "\uFF0F"], // /⇔／
    // ["\u003A", "\uFF1A"], // :⇔：
    // ["\u003B", "\uFF1B"], // ;⇔；
    // ["\u003C", "\uFF1C"], // <⇔＜
    // ["\u003D", "\uFF1D"], // =⇔＝
    // ["\u003E", "\uFF1E"], // >⇔＞
    // ["\u003F", "\uFF1F"], // ?⇔？
    // ["\u0040", "\uFF20"], // @⇔＠
    // ["\u005B", "\uFF3B"], // [⇔［
    // ["\u005C", "\uFFE5"], // \⇔￥
    // ["\u005D", "\uFF3D"], // ]⇔］
    // ["\u005E", "\uFF3E"], // ^⇔＾
    // ["\u005F", "\uFF3F"], // _⇔＿
    // ["\u0060", "\uFF40"], // `⇔｀
    // ["\u007B", "\uFF5B"], // {⇔｛
    // ["\u007C", "\uFF5C"], // |⇔｜
    // ["\u007D", "\uFF5D"], // }⇔｝
    // ["\u007E", "\uFF5E"], // ~⇔～
    // ["\uFF61", "\u3002"], // ｡⇔。
    // ["\uFF62", "\u300C"], // ｢⇔「
    // ["\uFF63", "\u300D"], // ｣⇔」
    // ["\uFF64", "\u3001"], // ､⇔、
    // ["\uFF65", "\u30FB"] // ･⇔・
  ];
  pairs_length = pairs.length;
  for(i = 0; i < pairs_length; i++) {
    before = pairs[i][option];
    after = pairs[i][1 - option];
    while(str != str.replace(before, after)) {
      str = str.replace(before, after);
    }
  }
  return str;
}

  // str の idx 文字目の次に val を挿入
  function strIns(str, idx, val){
    var res = str.slice(0, idx) + val + str.slice(idx);
    return res;
  };

  document.getElementById('btn').addEventListener('click', function(){
    var text = document.getElementById('text1').value;
    var spacenum = [];
    var j = 0;

    text = convert_kigo_han_zen(text, 1);//全角括弧→半角括弧へ変換
    text = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    });


    for (var i = 0; i < text.length; i++) {
      if (text[i] == '{' || text[i] == '\n' || text[i] == '．' || text[i] == '，' || text[i] == '「' || text[i] == '」' || text[i] == ' ') {
        continue;
      }else if ((isZen(text[i]) == true && isZen(text[i + 1]) == false )
      || (isZen(text[i]) == false && isZen(text[i + 1]) == true )) {
        if (text[i + 1] == '}' || text[i + 1] == '」' || text[i + 1] == ' ') {continue;}
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
