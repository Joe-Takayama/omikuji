//時刻や日にちを表示させるための処理
function updatetime() {
    const now = new Date();
    const year = now.getFullYear(); //年
    const month = now.getMonth() + 1; //月
    const date = now.getDate(); //日にち
    const dayIndex = now.getDay(); //曜日
    const hour = now.getHours(); //時間
    const minutes = now.getMinutes(); //分
    const seconds = now.getSeconds();

    const NewMutes =  minutes < 10 ? '0' + minutes : minutes; //分が10未満だったら0を付け足す
    const NewHour = hour < 10 ? '0' + hour : hour; //時間が10未満だったら0を付け足す
    const NewMonth = month < 10 ? '0' + month : month; //月も同様
    const NewDates = date < 10 ? '0' + date : date; //日にちも同様
    const NewSeconds = seconds < 10 ? '0' + seconds : seconds;

    const days = ["日", "月", "火", "水", "木", "金", "土"]; //曜日のリスト
    const day = days[dayIndex];

    const today = `${year}/${NewMonth}/${NewDates} (${day})`;
    const time = `${NewHour}:${NewMutes}:${NewSeconds}`;

    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = today;
}

//初期表示&1分ごとに更新
updatetime();
setInterval(updatetime, 1000);

const clickSound = new Audio('sounds/18099.wav');

document.getElementById('omikujiBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
    clickSound.play();
    clickSound.onended = function() {
        location.href = 'result.html';  // 音が終わったらページ遷移
    };
});