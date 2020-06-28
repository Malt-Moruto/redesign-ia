const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
let sheet = 'studio';
let endpoint = `${uri}?id=${id}&sheet=${sheet}`;

//idが "studios" のものを探してそこにjsonのデータを格納する。 これはgetElementByIdの話？
const renderJson = (json) => {
  const studios = json.records;
  studios.forEach(studio => {

    /* const : class名 : スプレッドシートの列
    studioGridDiv : 'grid-containr'  (一番外のdiv) 
    studioTitleDiv : 'studio'
      studioTitle : 'text_studio' : name-ja
      studioTitleEn : 'text_studio-en' : name-en
    studioCoreDiv : 'core'
      studioCore : 'text_core' : core-ja
      studioCoreEn : 'text_core-en' : core-en
    studioFacultyDiv : 'faculty'(担当教員って書くだけのやつ)
      studioFaculty : 'text_faculty'
      studioFacultyEn : 'text_faculty-en' 
    studioNameDiv : 'name' 
      studioName : 'text_name' : faculty-ja
      studioName : 'text_name-en' : faculty-en
    studioRank : 'rank'
      studioRank : 'text_rank' : faculty-title-ja
      studioRank : 'text_rank-en' : faculty-title-en
    */ 

  const studioGridDiv = document.createElement('div');
  studioGridDiv.className = 'grid-containr';

    const StudioTitleDiv = document.createElement('div');
    StudioTitleDiv.className = 'studio';

      const studioTitle = document.createElement("span");
      studioTitle.className = 'text_studio';
      studioTitle.textContent = studio['name-ja'];

      const studioTitleEn = document.createElement("span");
      studioTitleEn.className = 'text_studio-en';
      studioTitleEn.textContent = studio['name-en'];

    const StudioCoreDiv = document.createElement('div');
    StudioCoreDiv.className = 'core';

      const studioCore = document.createElement("span");
      studioCore.className = 'text_core';
      studioCore.textContent = studio['core-ja'];

      const studioCoreEn = document.createElement("span");
      studioCoreEn.className = 'text_core-en';
      studioCoreEn.textContent = studio['core-en'];

    const StudioFacultyDiv = document.createElement('div');
    StudioFacultyDiv.className = 'faculty';

      const studioFaculty = document.createElement("span");
      studioFaculty.className = 'text_faculty';
      studioFaculty.textContent = '担当教員'; //あってるとは思うけどちょい不安

      const studioFaculty = document.createElement("span");
      studioFaculty.className = 'text_faculty-en';
      studioFaculty.textContent = 'Faculty';

    const StudioNameDiv = document.createElement('div');//ここややこしい
    StudioNameDiv.className = 'name';

      const studioName = document.createElement("span");
      studioName.className = 'text_name';
      studioName.textContent = studio['faculty-ja'];

      const studioNameEn = document.createElement("span");
      studioNameEn.className = 'text_name-en';
      studioNameEn.textContent = studio['faculty-en'];

    const StudioRankDiv = document.createElement('div');
    StudioRankDiv.className = 'rank';

      const studioRank = document.createElement("span");
      studioRank.className = 'text_rank';
      studioRank.textContent = studio['faculty-title-ja'];

      const studioRankEn = document.createElement("span");
      studioRankEn.className = 'text_rank-en';
      studioRankEn.textContent = studio['faculty-title-en'];

   studioGridDiv.appendChild(studioTitleDiv);
     studioTitleDiv.appendChild(studioTitle);
     studioTitleDiv.appendChild(studioTitleEn);
   studioGridDiv.appendChild(StudioCoreDiv);
     studioCoreDiv.appendChild(studioCore);
     studioCoreDiv.appendChild(studioCoreEn);
   studioGridDiv.appendChild(StudioFacultyDiv);
     studioFacultyDiv.appendChild(studioFaculty);
     studioFacultyDiv.appendChild(studioFacultyEn);
   studioGridDiv.appendChild(StudioNameDiv);
     studioNameDiv.appendChild(studioName);
     studioNameDiv.appendChild(studioNameEn);
  studioGridDiv.appendChild(StudioRankDiv);
     studioRankDiv.appendChild(studioRank);
     studioRankDiv.appendChild(studioRankEn);
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
