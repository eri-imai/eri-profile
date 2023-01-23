var unit = 100,
	canvasList, // キャンバスの配列
	info = {}, // 全キャンバス共通の描画情報
	colorList; // 各キャンバスの色情報

function init() {
	info.seconds = 0;
	info.t = 0;
	canvasList = [];
	colorList = [];
	// canvas1個めの色指定
	canvasList.push(document.getElementById("waveCanvas"));
	colorList.push(['#eee']);

	// 各キャンバスの初期化
	for (var canvasIndex in canvasList) {
		var canvas = canvasList[canvasIndex];
		canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
		canvas.height = 200;//波の高さ
		canvas.contextCache = canvas.getContext("2d");
	}
	// 共通の更新処理呼び出し
	update();
}

function update() {
	for (var canvasIndex in canvasList) {
		var canvas = canvasList[canvasIndex];
		// 各キャンバスの描画
		draw(canvas, colorList[canvasIndex]);
	}
	// 共通の描画情報の更新
	info.seconds = info.seconds + .014;
	info.t = info.seconds * Math.PI;
	// 自身の再起呼び出し
	setTimeout(update, 35);
}

function draw(canvas, color) {
	// 対象のcanvasのコンテキストを取得
	var context = canvas.contextCache;
	// キャンバスの描画をクリア
	context.clearRect(0, 0, canvas.width, canvas.height);

	//波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
	drawWave(canvas, color[0], 1, 3, 0);
}

function drawWave(canvas, color, alpha, zoom, delay) {
	var context = canvas.contextCache;
	context.fillStyle = color;//塗りの色
	context.globalAlpha = alpha;
	context.beginPath(); //パスの開始
	drawSine(canvas, info.t / 0.5, zoom, delay);
	context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
	context.lineTo(0, canvas.height); //パスをCanvasの左下へ
	context.closePath() //パスを閉じる
	context.fill(); //波を塗りつぶす
}