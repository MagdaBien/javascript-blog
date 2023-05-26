const opts = {
  optArticleSelector: ".post",
  optTitleSelector: ".post-title",
  optTitleListSelector: ".titles",
  optArticleTagsSelector: ".post-tags .list",
  optArticleAuthorSelector: ".post-author",
  optTagsListSelector: ".tags.list",
  optAuthorsListSelector: ".authors.list",
  optCloudClassCount: 5,
  optCloudClassPrefix: "tag-size-",
};

// wyświetla kliknięty artykuł
const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll(".titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  console.log("clickedElement:", clickedElement);
  clickedElement.classList.add("active");

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll("article");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add("active");
};

// funkcja która generuje listę artykułów po lewej stronie
function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.optTitleListSelector);
  titleList.innerHTML = "";

  /* for each article: get the article id, find the title element, get the title from the title element
      create HTML of the link and insert link into titleList */
  const articles = document.querySelectorAll(
    opts.optArticleSelector + customSelector
  );
  let html = "";

  for (let article of articles) {
    const articleId = article.getAttribute("id");
    const articleTitle = article.querySelector(opts.optTitleSelector).innerHTML;
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  // dodaje listenera do linków z tytułami
  const links = document.querySelectorAll(".titles a");
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const params = {
    min: 999999,
    max: 0,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + " is used " + tags[tag] + " times");
  }
  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor(
    ((count - params.min) / (params.max - params.min)) *
      (opts.optCloudClassCount - 1) +
      1
  );
  const className = opts.optCloudClassPrefix + classNumber;
  return className;
}

function generateTags() {
  /* find all articles and for every article: find tags wrapper, get tags from data-tags attribute
      split tags into array and for each tag: generate HTML of the link and add generated code to html variable
      then insert HTML of all the links into the tags wrapper  */

  let allTags = {};
  const articles = document.querySelectorAll("article");

  for (let article of articles) {
    const tagWrapper = article.querySelector(opts.optArticleTagsSelector);
    let html = "";

    const dataTags = article.getAttribute("data-tags");

    const tags = dataTags.split(" ");
    for (let tag of tags) {
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html = html + linkHTML;

      /* check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagWrapper.innerHTML = html;
  }

  const tagList = document.querySelector(opts.optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  console.log("tagsParams:", tagsParams);
  let allTagsHTML = "";

  for (let tag in allTags) {
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += `<li><a href="#tag-${tag}" class="${tagLinkHTML}">${tag} </a></li>`;
  }
  tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTag of activeTags) {
    activeTag.classList.remove("active");
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const linkTags = document.querySelectorAll('a[href="' + href + '"]');

  for (let linkTag of linkTags) {
    linkTag.classList.add("active");
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const links = document.querySelectorAll('a[href^="#tag-"]');
  for (let link of links) {
    link.addEventListener("click", tagClickHandler);
  }
}

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll("article");

  for (let article of articles) {
    const tagWrapper = article.querySelector(opts.optArticleAuthorSelector);
    const dataAuthor = article.getAttribute("data-author");
    const linkHTML = `<li><a href="#author-${dataAuthor}">${dataAuthor}</a></li>`;
    tagWrapper.innerHTML = linkHTML;

    /* check if this link is NOT already in allTags */
    if (!allAuthors[dataAuthor]) {
      /* add tag to allTags object */
      allAuthors[dataAuthor] = 1;
    } else {
      allAuthors[dataAuthor]++;
    }
  }
  const authorList = document.querySelector(opts.optAuthorsListSelector);
  let allAuthorsHTML = "";
  for (let author in allAuthors) {
    allAuthorsHTML += `<li><a href="#author-${author}">${author} (${allAuthors[author]})</a></li>`;
  }
  authorList.innerHTML = allAuthorsHTML;
}

function addClickListenersToAuthors() {
  const links = document.querySelectorAll('a[href^="#author-"]');
  for (let link of links) {
    link.addEventListener("click", authorClickHandler);
  }
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");

  const author = href.replace("#author-", "");

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove("active");
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const linkAuthors = document.querySelectorAll('a[href="' + href + '"]');

  for (let linkAuthor of linkAuthors) {
    linkAuthor.classList.add("active");
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

generateTitleLinks();

generateTags();
addClickListenersToTags();

generateAuthors();
addClickListenersToAuthors();
