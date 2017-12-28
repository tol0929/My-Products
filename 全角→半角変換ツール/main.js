(function () {
    'use strict';

    document.getElementById('btn').addEventListener('click', function () {
        var text = document.getElementById('text').value;
        text = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 65248);
        });
        document.getElementById('result').value = text;
    });

})();
