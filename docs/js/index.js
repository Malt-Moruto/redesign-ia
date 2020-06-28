//グーグルスプレットシートのurl
const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
//グーグルスプレットシートのid(すべてのシートで共通)
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
//グーグルスプレットシートのシート（studio, Link, Facultyの三種類）
let sheet = 'studio';
//上のものを結合して一つのurlにする
let endpoint = `${uri}?id=${id}&sheet=${sheet}`;

//受け取ったJsonをHtmlに反映させる。これはStudioのシート用。 idが "studios" のものを探してそこにjsonのデータを格納する。シートのうちname-jaとname-enのみ使っている。
const renderJson = (json) => {
  const studios = json.records;
    studios.forEach(studio => {
   const studioDiv = document.createElement('div');
   const studioTitle = document.createElement("span");
   studioTitle.className = 'studio-title';
   //グーグルスプレットシートのシートの"name-ja"列を取得。
   studioTitle.textContent = studio['name-ja'];
   const studioTitleEn = document.createElement("span");
   studioTitleEn.className = 'studio-title-en';
   studioTitleEn.textContent = studio['name-en'];
   studioDiv.appendChild(studioTitle);
   studioDiv.appendChild(studioTitleEn);
   document.getElementById('studios').appendChild(studioDiv);
   /*
   こんな感じのhtmlが生成されて差し込まれる。
   <div>
        <span class="studio-title">インタフェースデザインスタジオ</span>
        <span class="studio-title-en">Interface Design Studio</span>
   </div>
   */
 });
  document.getElementById('result').textContent = JSON.stringify(json, null, 2);
}
//urlを受け取ってjsonにする。
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