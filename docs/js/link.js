const uri = 'https://script.google.com/macros/s/AKfycbxyacpN8y4nxSAnU0Eji6E_rBRDFTY7YoWWFa0clY5ELRhskgpt/exec';
const id = '1BpGnuwC4lZf9G2yFyiSrxbJuGO8gviV8mr-I2D3x4vA';
let sheet = 'Link';
let endpoint = `${uri}?id=${id}&sheet=${sheet}`;

//idが "links" のものを探してそこにjsonのデータを格納する。 これはgetElementByIdの話？
const renderJson = (json) => {
  const links = json.records;
  links.forEach(link => {

    const ChangeLang = ()=>{
      let selectLang = document.documentElement.lang;
      return selectLang === "ja"?'ja':'en';
    }
    let lang= ChangeLang();

    const linkDiv =document.createElement('div');
    linkDiv.className = 'link'

    const linkLeftDiv = document.createElement('div');
    linkLeftDiv.className = 'left';

    const linkHref = document.createElement('a');
    linkHref.href = link['link'];
    const linkHrefunderText = document.createElement('a');
    linkHref.href = link['link'];
    const linkImg = document.createElement("img");
    linkImg.className = 'img';
    linkImg.src = link['photo'];
    const linkImgunderTitle = document.createElement("img");
    linkImgunderTitle.className = 'img';
    linkImgunderTitle.src = './picture/prof-link.svg';

    const linkRighteDiv = document.createElement('div');
    linkRighteDiv.className = 'right';

    const linkTitle = document.createElement("span");
    linkTitle.className = 'title';
    linkTitle.textContent = link[`name-${lang}`];
    linkTitle.href = link['link'];

    const linkEx = document.createElement('div');
    linkEx.className = 'explanation';

    const linkVenue = document.createElement("p");
    linkVenue.textContent = link[`venue-${lang}`];

    const linkDate = document.createElement("p");
    linkDate.textContent = link[`event-dates-${lang}`];

    const linkDetail = document.createElement('div');
    linkDetail.className = 'detail';
    linkDetail.textContent =link[`description-${lang}`]

    linkDiv.appendChild(linkLeftDiv);
    linkLeftDiv.appendChild(linkHref);
    linkHref.appendChild(linkImg);
    linkDiv.appendChild(linkRighteDiv);
    linkRighteDiv.appendChild(linkTitle);
    linkTitle.appendChild(linkHrefunderText);
    linkHrefunderText.appendChild(linkImgunderTitle);
    linkRighteDiv.appendChild(linkEx);
    linkEx.appendChild(linkVenue);
    linkEx.appendChild(linkDate);
    linkRighteDiv.appendChild(linkDetail);
    document.getElementById('link_list').appendChild(linkDiv);

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
  }
  catch(error){
    console.log(error);
  }
}

getData(endpoint);
