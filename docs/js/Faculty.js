//グーグルスプレットシートのurl
const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
//グーグルスプレットシートのid(すべてのシートで共通)
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
//グーグルスプレットシートのシート（studio, Link, Facultyの三種類）
let sheet = 'Faculty';
//上のものを結合して一つのurlにする
let endpoint = `${uri}?id=${id}&sheet=${sheet}`;

/* const : class名 : スプレッドシートの列
FacltyDiv : 'Faclty' (一番外側のdiv)
  //FacltySpan(imgやリンクを入れ子にしたい時用の、spanを作るためだけの要素)
  FacultyImg : 'img' : faculty-photo(写真)
  FacrtyNameRankDiv : 'name-rank' (内容なし class名とdivだけ)
    FacrtyRightDiv : 'right' (同上)
      FacultyName : 'name' : f-faculty-ja(教授の名前日本語)
      FacultyNameEn : 'name-en' : f-faculty-en(↑の英語)
      FacultyRank : 'rank' : f-faculty-title-ja(教授、准教授とかいうやつ)
      FacultyRankEn : 'rank-en' : f-faculty-title-en
    facultyLinl : undifined : f-link(リンク、クラス名なし)
  FacultyNameReading : 'name-reading' : f-faculty-en(教授の名前英語)
  FacultyStudio : 'explanation' : f-studio-ja(スタジオ)
  FacultyStudioEn : 'explanation-en' : f-studio-en
  FacultyMajor : 'explanation' : major-ja(研究分野)
  FacultyMajorEn : 'explanation-en' : major-en
*/

const renderJson = (json) => {
    const Facultys = json.records; 
    Facultys.forEach(Faculty => { 

     const FacultyDiv = document.createElement('div');

     const FacultySpan = document.createElement("span"); //モルトさんのHTMLでは全部divになってたけどコピペ元を踏襲して1行のものはspanにします 調整任せた

     const FacultyImg = document.createElement("img");
     FacultyImg.className = 'img';
     FacultyImg.src = Faculty['faculty-photo'];//ここもしかしたらリンクに　"　がないせいでエラー出るかも

     const FacultyNameRankDiv = document.createElement("div"); //ここdivにしたけどおかしくなったらごめん〜〜〜〜調整頼む〜〜〜
     FacultyNameRankDiv.classname = 'name-rank';

     const FacultyRightdiv = document.createElement("div");
     FacultyRightdiv.className = 'right';

     //ここから<div class = 'right'>の中
      //ここから<div class = 'name-rank'>の中
     const FacultyName = document.createElement("span");
     FacultyName.className = 'name';
     FacultyName.textContent = Faculty['f-faculty-ja'];

     const FacultyNameEn = document.createElement("span");
     FacultyNameEn.className = 'name-en';
     FacultyNameEn.textContent = Faculty['f-faculty-en'];

     const FacultyRank = document.createElement("span");
     FacultyRank.className = 'rank';
     FacultyRank.textContent = Faculty['f-faculty-title-ja'];

     const FacultyRankEn = document.createElement("span");
     FacultyRankEn.className = 'rank-en';
     FacultyRankEn.textContent = Faculty['f-faculty-title-en'];
      //</div> (calss = 'name-rank')
    
     if (Faculty['f-rink']){//ここの処理クソ不安です f-rinkが true ==! null ならばってかいたつもり...........
        const FacultyLink = document.createElement("a")//クラス名なし
        FacultyLink.href = Faculty['f-link'];
     }
     //</div>(class = 'right')

     const FacultyNameReading = document.createElement("span");
     FacultyNameReading.classname = 'name-reading';//実質name-enと同じ いらなかったら消してください
     FacultyNameReading.textContent = Faculty['f-faculty-en'];

     const FacultyStudio = document.createElement("span");
     FacultyStudio.classname = 'explanation';
     FacultyStudio.textContent = 'スタジオ : '  + Faculty['f-studio-ja'];//これあってるかわからない！Faculty[]は文字列だよね....？


     const FacultyStudioEn = document.createElement("span");
     FacultyStudioEn.classname = 'explanation-en';
     FacultyStudioEn.textContent = 'studio : ' + Faculty['f-studio-en'];

     const FacultyMajor = document.createElement("span");
     FacultyMajor.classname =  'explanation';
     FacultyMajor.textContent = '研究分野 : '  + Faculty['major-ja'];

     const FacultyMajorEn = document.createElement("span");
     FacultyMajorEn.classname =  'explanation-en';
     FacultyMajorEn.textContent = 'major : '  + Faculty['major-en'];


     //ここまでconstに内容を入れただけ　ここからそれを出力する
     FacultyDiv.appendChild(FacultySpan); //imgのspan
     FacultySpan.appendChild(FacultyImg);
     FacultyDiv.appendChild(FacultyRightdiv);
     FacultyRightDiv.appendChild(FacultyNameRankDiv);
     FacultyNameRankDiv.appendChild(FacultyTitle);
     FacultyNameRankDiv.appendChild(FacultyTitleEn);
     FacultyRightdiv.appendChild(FacultyLink);
     FacultyDiv.appendChild(FacultyNameReading);
     FacultyDiv.appendChild(FacultyStudio);
     FacultyDiv.appendChild(FacultyStudioEn);
     FacultyDiv.appendChild(FacultyMajor);
     FacultyDiv.appendChild(FacultyMajorEn);
     document.getElementById('おまかせします').appendChild(FacultyDiv); 
   });
    document.getElementById('result').textContent = JSON.stringify(json, null, 2);//**全然わからない 急なnull
  }
  //urlを受け取ってjsonにする。 //ここから下いじってません
  const getData = async (endpoint) => {
    try{
      const response =  await fetch(endpoint);
      if(response.ok){
              let jsonResponse = await response.json();
              //jsonResponseに入っているデータのうち、最後のデータを削除する。
              jsonResponse.records.pop();
              renderJson(jsonResponse);
      }
    }
    catch(error){
      console.log(error);
    }
  }
  
  getData(endpoint);
  