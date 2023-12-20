function initMap() {
  if (navigator.geolocation) { /* geolocationが使えるかの判定 */
    navigator.geolocation.getCurrentPosition(function (position) { /* positionの中にユーザーの位置情報を格納してuserLocationに渡す */
      var userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // マップを初期化
      /*var map = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 12
      }); */

      var service = new google.maps.places.PlacesService(map); /* PlacesService内のメソッドを利用するためのインスタンスを生成,引数mapは形式上 */

      var request = { /* nearbySearchで使用する検索条件の格納 */
        location: userLocation,
        radius: 2000,
        keyword: '焼肉'
      };

      service.nearbySearch(request, function (results, status) {  /* requestを元にAPIを叩く、結果をresultsに配列として保存、成否をstatusに保存*/
        if (status === google.maps.places.PlacesServiceStatus.OK) { /* 検索に成功してたら */
          showInfoList(results);
        }
      });
    });
  } else {
    alert('このブラウザはGeolocationをサポートしていません。');
  }

  function showInfoList(results) {
    var infoDiv = document.getElementById('info'); /* infoというidを持つhtmlの要素を格納 */
    var infoContent = '<h2>周辺の焼肉店一覧</h2><ul>'; /* 一覧情報のベースを定義 */

    for (var i = 0; i < results.length; i++) { /* 配列に格納された検索結果を繰り返し処理 */
      infoContent += '<li><strong>' + results[i].name + '</strong><br>';
      infoContent += '評価: ' + (results[i].rating || '評価なし') + '<br>';
      infoContent += '住所: ' + results[i].vicinity + '<br>';

      if (results[i].photos && results[i].photos.length > 0) {
        infoContent += '<img src="' + results[i].photos[0].getUrl({ maxWidth: 100, maxHeight: 100 }) + '" alt="外観">';
      }

      infoContent += '</li>';
    }

    infoContent += '</ul>';
    infoDiv.innerHTML = infoContent;
  }
}
