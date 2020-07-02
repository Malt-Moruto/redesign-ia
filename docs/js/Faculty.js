//グーグルスプレットシートのurl
const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
//グーグルスプレットシートのid(すべてのシートで共通)
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
//グーグルスプレットシートのシート（studio, Link, Facultyの三種類）
let sheet = 'Faculty';
//上のものを結合して一つのurlにする
let endpoint = `${uri}?id=${id}&sheet=${sheet}`;

const renderJson = (json) => {
    const Facultys = json.records; 
    Facultys.forEach(Faculty => {

        const ChangeLang = ()=>{
            let selectLang = document.documentElement.lang;
            return selectlang === "ja"?'Ja':'En';
        }
    let lang= ChangeLang();

     const FacultyDiv = document.createElement('div');

     const FacultySpan = document.createElement("span"); 

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
     FacultyName.textContent = Faculty[`f-faculty-${lang}`];

     const FacultyRank = document.createElement("span");
     FacultyRank.className = 'rank';
     FacultyRank.textContent = Faculty[`f-faculty-title-${lang}`];
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
     FacultyStudio.textContent = ((lang === 'Ja') ? 'スタジオ' : 'studio') + Faculty[`f-studio-${lang}`];//これあってるかわからない！Faculty[]は文字列だよね....？

     const FacultyMajor = document.createElement("span");
     FacultyMajor.classname =  'explanation';
     FacultyMajor.textContent = '研究分野 : '  + Faculty[`major-${lang}`];


     //ここまでconstに内容を入れただけ　ここからそれを出力する
     FacultyDiv.appendChild(FacultySpan); //imgのspan
     FacultySpan.appendChild(FacultyImg);
     FacultyDiv.appendChild(FacultyRightdiv);
      FacultyRightDiv.appendChild(FacultyNameRankDiv);
         FacultyNameRankDiv.appendChild(FacultyTitle);
      FacultyRightdiv.appendChild(FacultyLink);
     FacultyDiv.appendChild(FacultyNameReading);
     FacultyDiv.appendChild(FacultyStudio);
     FacultyDiv.appendChild(FacultyMajor);
     document.getElementById('faculty_list').appendChild(FacultyDiv);
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
  