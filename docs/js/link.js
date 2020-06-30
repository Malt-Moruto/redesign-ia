const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
let sheet = 'Link';
let endpoint = `${uri}?id=${id}&sheet=${sheet}`;

//idが "links" のものを探してそこにjsonのデータを格納する。 これはgetElementByIdの話？
const renderJson = (json) => {
  const links = json.records;
  links.forEach(link => {

    const ChangeLang = ()=>{
      let selectLang = document.getElementById("lang");
      return selectlang === "日本語"?'Ja':'En';
    }
    let lang= ChangeLang();

  const linkGridDiv = document.createElement('div');
  linkGridDiv.className = 'grid-containr';

    const linkHederDiv = document.createElement('div');
    linkHederDiv.className = 'link_header';

    const linkTextDiv = document.createElement('div');
    linkTextDiv.className = 'text_link';

    const linkLeftDiv = document.createElement('div');
    inkLeftDiv.className = 'left';

    const linkHref = document.createElement('a');
    linkHref.href = Link[`name-${lang}`];

    const linkRighteDiv = document.createElement('div');
    linkRightDiv.className = 'right';//ここまで

      const linkCore = document.createElement("span");
      linkCore.className = 'text_core';
      linkCore.textContent = link[`core-${lang}`];

    const linkFacultyDiv = document.createElement('div');
    linkFacultyDiv.className = 'faculty';

      const linkFaculty = document.createElement("span");
      linkFaculty.className = 'text_faculty';
      linkFaculty.textContent = ((lang === 'Ja')? '担当教員' : 'Faulty'); //あってるとは思うけどちょい不安

    const linkNameDiv = document.createElement('div');//ここややこしい
    linkNameDiv.className = 'name';

      const linkName = document.createElement("span");
      linkName.className = 'text_name';
      linkName.textContent = link[`faculty-${lang}`];

    const linkRankDiv = document.createElement('div');
    linkRankDiv.className = 'rank';

      const linkRank = document.createElement("span");
      linkRank.className = 'text_rank';
      linkRank.textContent = link[`faculty-title-${lang}`];

   linkGridDiv.appendChild(linkTitleDiv);
     linkTitleDiv.appendChild(linkTitle);
   linkGridDiv.appendChild(linkCoreDiv);
     linkCoreDiv.appendChild(linkCore);
   linkGridDiv.appendChild(linkFacultyDiv);
     linkFacultyDiv.appendChild(linkFaculty);
   linkGridDiv.appendChild(linkNameDiv);
     linkNameDiv.appendChild(linkName);
  linkGridDiv.appendChild(linkRankDiv);
     linkRankDiv.appendChild(linkRank);
   document.getElementById('links').appendChild(linkDiv);

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
