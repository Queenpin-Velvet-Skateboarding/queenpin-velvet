/* Schrift-Test (nur Entwurf): ?schrift=nitti | monte | normal – bleibt beim Weiterklicken */
(function(){
  var m=location.search.match(/schrift=(\w+)/),s;
  try{if(m)sessionStorage.setItem('qp-schrift',m[1]);s=sessionStorage.getItem('qp-schrift');}catch(e){s=m&&m[1];}
  if(s&&s!=='normal')document.documentElement.classList.add('f-'+s);
})();
