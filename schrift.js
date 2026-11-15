/* Schrift: geo ist Standard. Zum Vergleichen: ?schrift=normal | nitti | monte (nur für diese Seite) */
(function(){
  var m=location.search.match(/schrift=(\w+)/),s=(m&&m[1])||'geo';
  try{sessionStorage.removeItem('qp-schrift');}catch(e){}
  if(s!=='normal')document.documentElement.classList.add('f-'+s);
  if(s==='geo'){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;1,300&display=swap';document.head.appendChild(l);}
})();
