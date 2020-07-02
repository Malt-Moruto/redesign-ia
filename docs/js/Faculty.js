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
            return selectLang === "ja"?'ja':'en';
        }
    let lang= ChangeLang();

     const FacultyDiv = document.createElement('div');
     FacultyDiv.className = 'faculty';

     const FacultySpan = document.createElement("span"); 

     const FacultyImg = document.createElement("img");
     FacultyImg.className = 'img';
     FacultyImg.src = Faculty['faculty-photo'];//ここもしかしたらリンクに　"　がないせいでエラー出るかも

     const FacultyNameRankDiv = document.createElement("div"); //ここdivにしたけどおかしくなったらごめん〜〜〜〜調整頼む〜〜〜
     FacultyNameRankDiv.className = 'name-rank';

     const FacultyRightdiv = document.createElement("div");
     FacultyRightdiv.className = 'right';
      //ここから<div class = 'right'>の中
      //ここから<div class = 'name-rank'>の中
     const FacultyName = document.createElement("div");
     FacultyName.className = 'name';
     FacultyName.textContent = Faculty[`f-faculty-${lang}`];

     const FacultyRank = document.createElement("div");
     FacultyRank.className = 'rank';
     FacultyRank.textContent = Faculty[`f-faculty-title-${lang}`];
      //</div> (calss = 'name-rank')
     if (Faculty['f-rink']){//ここの処理クソ不安です f-rinkが true ==! null ならばってかいたつもり...........
        const FacultyLink = document.createElement("a")//クラス名なし
        FacultyLink.href = Faculty['f-link'];
        FacultyRightdiv.appendChild(FacultyLink);
     }
     //</div>(class = 'right')

     const FacultyNameReading = document.createElement("div");
     FacultyNameReading.className = 'name-reading';//実質name-enと同じ いらなかったら消してください
     FacultyNameReading.textContent = Faculty['f-faculty-en'];

     const FacultyStudio = document.createElement("span");
     FacultyStudio.className = 'explanation';
     FacultyStudio.textContent = ((lang === 'Ja') ? 'スタジオ' : 'studio') + Faculty[`f-studio-${lang}`];//これあってるかわからない！Faculty[]は文字列だよね....？

     const FacultyMajor = document.createElement("span");
     FacultyMajor.className =  'explanation';
     FacultyMajor.textContent = '研究分野 : '  + Faculty[`major-${lang}`];


     //ここまでconstに内容を入れただけ　ここからそれを出力する
     FacultyDiv.appendChild(FacultySpan); //imgのspan
     FacultySpan.appendChild(FacultyImg);
     FacultyDiv.appendChild(FacultyRightdiv);
        FacultyRightdiv.appendChild(FacultyNameRankDiv);
          FacultyNameRankDiv.appendChild(FacultyName);
          FacultyNameRankDiv.appendChild(FacultyRank);
        FacultyRightdiv.appendChild(FacultyNameReading);
        FacultyRightdiv.appendChild(FacultyStudio);
        FacultyRightdiv.appendChild(FacultyMajor);
     document.getElementById('faculty_list').appendChild(FacultyDiv);
   });
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
  