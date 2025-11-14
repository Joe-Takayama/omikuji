//おみくじを引くボタンが押されたときの処理 //無名関数
document.getElementById('draw').addEventListener('click', async function() {
    try {
        //JSONファイルを読み込む(非同期)
        const response = await fetch('main.json');
        //ファイルの読み込みに失敗したときのエラー文
        if (!response.ok) {
            throw new Error('JSONファイルの読み込みに失敗しました');
        }

        //JSONデータを取り出し、オブジェクトに変換している
        const data = await response.json();

        //運勢をランダムで選ぶ
        //resultsオブジェクトを取得する
        const results = data.results;
        
        //運勢をランダムで選ぶ
        //Math.randomで0以上1未満のランダムな小数が割りあてられる
        //ランダムで割り当てられた小数×resultsオブジェクトの中に入ってる要素の数を掛ける
        //例 Math.random(0.9999) * 8 => ここからMath.floorで小数点を切り捨てる
        //0.9999 * 8 => 7.9992 切り捨てなので7となる 7となったら大凶が選ばれる
        const result = results[Math.floor(Math.random() * results.length)];

        //結果を表示
        document.getElementById('result').textContent = result;

        //運勢に応じたメッセージを表示
        //メッセージを格納するので最初はnull
        let message = '';
        
        //switch文を使い、それぞれの運勢の結果に応じてメッセージをつける
        //break文で次の運勢の結果の処理にうつるようにする
        switch (result) {
            case "大吉": message = '最高の運勢!この先もうまくやっていける!';break;
            case "中吉": message = 'なかなか良い運勢!前向きにやっていこう!'; break;
            case "小吉": message = 'ちょっとした幸運がありそう!'; break;
            case "吉": message = '普通に良い日!気楽にいこう!'; break;
            case "凶": message = 'トラブル注意!身の回りに慎重に'; break;
            case "小凶": message = '小さなトラブルの可能性あり!いつも以上に慎重に!'; break;
            case "中凶": message = '無理せずに家で落ち着いていよう!'; break;
            case "大凶": message = '今日はおとなしくしているのが一番!外出は控えよう!'; break;
            default: message = '運勢不明';
        }

        //メッセージ表示欄にメッセージを表示する
        document.getElementById('message').textContent = message;


    } catch (error) {
        //エラーが起きたときの表示
        document.getElementById('result').textContent = "エラーが発生しました";
        document.getElementById('message').textContent = error.message;
    }
});

//時刻や日にちを表示させるための処理
function updatetime() {
    const now = new Date();
    const year = now.getFullYear(); //年
    const month = now.getMonth() + 1; //月
    const date = now.getDate(); //日にち
    const dayIndex = now.getDay(); //曜日
    const hour = now.getHours(); //時間
    const minutes = now.getMinutes(); //分

    const NewMutes =  minutes < 10 ? '0' + minutes : minutes; //分が10未満だったら0を付け足す
    const NewHour = hour < 10 ? '0' + hour : hour; //時間が10未満だったら0を付け足す
    const NewMonth = month < 10 ? '0' + month : month; //月も同様
    const NewDates = date < 10 ? '0' + date : date; //日にちも同様

    const days = ["日", "月", "火", "水", "木", "金", "土"]; //曜日のリスト
    const day = days[dayIndex];

    const today = `${year}/${NewMonth}/${NewDates} (${day})`;
    const time = `${NewHour}:${NewMutes}`;

    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = today;
}

// 初期表示 & 1分ごとに更新（60000ミリ秒）
updatetime();   
setInterval(updatetime, 60000);

document.addEventListener('DOMContentLoaded', () => {
    const clickSound = new Audio('sounds/18099.wav');

    const drawBtn = document.getElementById('draw');
    if (drawBtn) {
        console.log('drawボタン見つかった！');
        drawBtn.addEventListener('click', function() {
            console.log('drawボタンが押された！');
            clickSound.currentTime = 0;
            clickSound.play();
        });
    } else {
        console.log('drawボタンが見つからない！');
    }
});

const clickSound = new Audio('sounds/18100.wav');

document.getElementById('topBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
    clickSound.play();
    clickSound.onended = function() {
        location.href = 'index.html';  // 音が終わったらページ遷移
    };
});
