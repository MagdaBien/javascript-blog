const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
  optArticleTagsSelector = '.post-tags .list';
  optArticleAuthorSelector = '.post-author';


// wyświetla kliknięty artykuł
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector=clickedElement.getAttribute('href');
  //console.log('articleSelector:', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle=document.querySelector(articleSelector);
  //console.log('targetArticle:', targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};


// funkcja która generuje listę artykułów po lewej stronie
function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList=document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article: get the article id, find the title element, get the title from the title element
      create HTML of the link and insert link into titleList */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  // dodaje listenera do linków z tytułami
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
    //console.log(link);
  }

}


function generateTags(){
  /* find all articles and for every article: find tags wrapper, get tags from data-tags attribute
      split tags into array and for each tag: generate HTML of the link and add generated code to html variable
      then insert HTML of all the links into the tags wrapper  */
  const articles = document.querySelectorAll('article');

  for(let article of articles){
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    // console.log(tagWrapper);
    let html = '';

    const dataTags = article.getAttribute('data-tags');
    // console.log(dataTags);

    const tags = dataTags.split(' ');
    for(let tag of tags){
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html = html + linkHTML;
    }
    tagWrapper.innerHTML = html;

  }
}


function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href=clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag=href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* for each active tag link remove class active */
  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const linkTags = document.querySelectorAll('a[href="' + href + '"]');

  /* for each found tag link add class active */
  for(let linkTag of linkTags){
    linkTag.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');

  /* for each link : add tagClickHandler as event listener for that link */
  for(let link of links){
    link.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors(){
  const articles = document.querySelectorAll('article');

  for(let article of articles){
    const tagWrapper = article.querySelector(optArticleAuthorSelector);
    const dataAuthor = article.getAttribute('data-author');
    const linkHTML = '<li><a href="#author-' + dataAuthor + '">' + dataAuthor + '</a></li>';
    tagWrapper.innerHTML = linkHTML;

  }
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#author-"]');

  /* for each link : add tagClickHandler as event listener for that link */
  for(let link of links){
    link.addEventListener('click', authorClickHandler);
  }
}


function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href=clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author=href.replace('#author-', '');

  /* find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* for each active tag link remove class active */
  for(let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const linkAuthors = document.querySelectorAll('a[href="' + href + '"]');

  /* for each found tag link add class active */
  for(let linkAuthor of linkAuthors){
    linkAuthor.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}


generateTitleLinks();

generateTags();
addClickListenersToTags();

generateAuthors();
addClickListenersToAuthors();

