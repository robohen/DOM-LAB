const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = ("var(--main-bg)");
const headingEl = document.createElement("h1");
headingEl.textContent = "DOM Manipulation";
mainEl.appendChild(headingEl);
mainEl.classList.add('flex-ctr');

const topMenuEl = document.querySelector('#top-menu');
topMenuEl.style.height = "100%";
topMenuEl.style.background = ('var(--top-menu-bg)');
topMenuEl.classList.add('flex-around');
// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];
menuLinks.forEach(function (link){
    var linkEl = document.createElement('a');
    linkEl.setAttribute('href', link.href);
    linkEl.textContent = link.text;
    topMenuEl.appendChild(linkEl);
});
const subMenuEl = document.querySelector("#sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = ('var(--sub-menu-bg)');
subMenuEl.classList.add("flex-around");
subMenuEl.style = "absolute";
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
var topMenuLinks = topMenuEl.querySelectorAll('a');


topMenuEl.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') {
    return;
  }
  console.log(event.target.textContent);

  topMenuLinks.forEach(function(link) {
    link.classList.remove('active');
  });

  event.target.classList.add('active');
  showingSubMenu = !!menuLinks.find(function(link) {
    return link.text === event.target.textContent && link.subLinks;
  });

  if (showingSubMenu) {
    buildSubMenu(event.target.textContent);
    subMenuEl.style.top = '100%';
  } else {
    subMenuEl.style.top = '0';
  }
});
subMenuEl.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') {
    return;
  }
  console.log(event.target.textContent);
  showingSubMenu = false;
  subMenuEl.style.top = '0';
 
  topMenuLinks.forEach(function(link) {
    link.classList.remove('active');
  });
});
function buildSubMenu(linkText) {
  subMenuEl.innerHTML = '';
  var linkObject = menuLinks.find(function(link) {
    return link.text === linkText;
  });
  if (linkObject && linkObject.subLinks) {
    linkObject.subLinks.forEach(function(subLink) {
      var aEl = document.createElement('a');
      aEl.href = subLink.href;
      aEl.textContent = subLink.text;
      subMenuEl.appendChild(aEl);
    });
  }

}
