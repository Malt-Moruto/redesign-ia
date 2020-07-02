const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
let sheet = 'Studio';
let endpoint = `${uri}?id=${id}&sheet=${sheet}`;

//idが "studios" のものを探してそこにjsonのデータを格納する。 これはgetElementByIdの話？
const renderJson = (json) => {
  const studios = json.records;
  let studio = studios[""];
  studios.forEach(studio => {


    const ChangeLang = ()=>{
      let selectLang = document.documentElement.lang;
      return selectLang === "ja"?'ja':'en';
    }
    let lang= ChangeLang();

  const studioGridDiv = document.createElement('div');
  studioGridDiv.className = 'grid-containr';

    const studioTitleDiv = document.createElement('div');
    studioTitleDiv.className = 'studio';

      const studioTitle = document.createElement("span");
      studioTitle.className = 'text_studio';
      studioTitle.textContent = studio[`name-${lang}`];

    const studioCoreDiv = document.createElement('div');
    studioCoreDiv.className = 'core';

      const studioCore = document.createElement("span");
      studioCore.className = 'text_core';
      studioCore.textContent = studio[`core-${lang}`];

    const studioFacultyDiv = document.createElement('div');
    studioFacultyDiv.className = 'faculty';

      const studioFaculty = document.createElement("span");
      studioFaculty.className = 'text_faculty';
      studioFaculty.textContent = ((lang === 'Ja')? '担当教員' : 'Faulty'); //あってるとは思うけどちょい不安

    const studioNameDiv = document.createElement('div');//ここややこしい
    studioNameDiv.className = 'name';

      const studioName = document.createElement("span");
      studioName.className = 'text_name';
      studioName.textContent = studio[`faculty-${lang}`];

    const studioRankDiv = document.createElement('div');
    studioRankDiv.className = 'rank';

      const studioRank = document.createElement("span");
      studioRank.className = 'text_rank';
      studioRank.textContent = studio[`faculty-title-${lang}`];

   studioGridDiv.appendChild(studioTitleDiv);
     studioTitleDiv.appendChild(studioTitle);
   studioGridDiv.appendChild(studioCoreDiv);
     studioCoreDiv.appendChild(studioCore);
   studioGridDiv.appendChild(studioFacultyDiv);
     studioFacultyDiv.appendChild(studioFaculty);
   studioGridDiv.appendChild(studioNameDiv);
     studioNameDiv.appendChild(studioName);
  studioGridDiv.appendChild(studioRankDiv);
     studioRankDiv.appendChild(studioRank);
   document.getElementById('studios').appendChild(studioGridDiv);
   /*
   こんな感じのhtmlが生成されて差し込まれる。
   <div>
        <span class="studio-title">インタフェースデザインスタジオ</span>
        <span class="studio-title-en">Interface Design Studio</span>
   </div>
   */

 });
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
    console.log(response.ok);
  }
  catch(error){
    console.log(error);
  }
}

getData(endpoint).then(r => console.log(r));
