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

    const linkDiv =document.createElement('div');
    linkDiv.className = 'link'

    const linkLeftDiv = document.createElement('div');
    linkLeftDiv.className = 'left';

    const linkHref = document.createElement('a');
    linkHref.href = Link['link'];

    const lincImg = document.createElement("img");
    linkImg.className = 'img';
    linkImg.src = Link['photo'];

    const linkRighteDiv = document.createElement('div');
    linkRightDiv.className = 'right';

    const linkTitle = document.createElement("span");
    linkTitle.className = 'title';
    linkTitle.textContent = link[`name-${lang}`];
    linkTitle.href = Link['link'];

    const linkEx = document.createElement('div');
    linkEx.className = 'explanation';

    const linkVenue = document.createElement("p");
    linkVenue.textContent = Link[`venue-${lang}`];

    const linkDate = document.createElement("p");
    linkDate.textContent = Link[`event-dates-${lang}`];

    const linkDetail = document.createElement('div');
    linkDetail.className = 'detail';
    linkDetail.textContent =Link[`description-${lang}`]

    linkDiv.appendChild(linkLeftDiv);
    linkLeftDiv.appendChild(linkHref);
    linkLeftDiv.appendChild(linkImg);
    linkDiv.appendChild(linkRightDiv);
    linkRightDiv.appendChild(linkTitle);
    linkRightDiv.appendChild(linkEx);
    linkEx.appendChild(linkVenue);
    linkEx.appendChild(linkDate);
    linkRightDiv.appendChild(linkDetail);
    document.getElementById('link_list').appendChild(linkDiv);

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
