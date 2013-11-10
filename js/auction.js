var template = Handlebars.compile($("#entry-template").html());

Handlebars.registerHelper('asItemName', function(str) {
	return str.substr(0, 150);
});

Handlebars.registerHelper('asImageUrl', function(str) {
	return str.replace("?_ex=128x128", "");
});

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(
			window.location.href.indexOf('?') + 1).split('&');
	for ( var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

function setSlider(data) {
	$("#contents").html(template(data));
	if (data.Items.length > 0) {
		$('#slider').slider({ // スライドさせるセレクタ
			showControls : true, // コントロールボタン
			autoplay : true, // 自動スライド
			showPosition : true, // 現在の表示位置
			hoverPause : true, // マウスオーバーで停止
			wait : 3500, // 停止時間
			fade : 500, // フェード時間
			direction : 'left' // スライド方向
		});
	}
}

function getData() {

	var keyword = decodeURI(getUrlVars()['keyword']);
	var genreId = decodeURI(getUrlVars()['genreId']);

		var sendData = {
						format : 'json',
						applicationId : '1007197101771563387',
						affiliateId: '10ce9708.441ef7f3.10ce9709.16fe3972'
					};
		
		if (keyword != "undefined" && keyword != "") {
			sendData.keyword = keyword;
			$('#keyword').val(keyword);
		}
		
		if (genreId == "undefined" || genreId == "") {
			genreId = $('#genreId').val();
		} else {
			$('#genreId').val(genreId);
		}

		sendData.auctionGenreId = genreId;
	
		$.ajax({
					url : 'https://app.rakuten.co.jp/services/api/AuctionItem/Search/20130110',
					data : sendData,
					dataType : 'jsonp',
					jsonp : 'callback',
					success : function(data, status) {
						setSlider(data);
					}
				});

}

$(function() {

	var template = Handlebars.compile($("#genre-template").html());

	$('#page').change(function () {
		location.href = $('#page').val();
		return false;
	});

	$.ajax({
		url : 'https://app.rakuten.co.jp/services/api/AuctionGenreId/Search/20120927',
		data : {
			format : 'json',
			applicationId : '1007197101771563387',
			auctionGenreId : 0
		},
		dataType : 'jsonp',
		jsonp : 'callback',
		success : function(data, status) {
			$("#genreContents").html(template(data));
			getData();
		}
	});
});
