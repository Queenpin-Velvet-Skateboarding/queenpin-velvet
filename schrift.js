/* Schrift: geo ist Standard. Zum Vergleichen weiterhin ?schrift=normal | nitti | monte (bleibt beim Weiterklicken) */
(function(){
  var m=location.search.match(/schrift=(\w+)/),s;
  try{if(m)sessionStorage.setItem('qp-schrift',m[1]);s=sessionStorage.getItem('qp-schrift');}catch(e){s=m&&m[1];}
  if(!s)s='geo';
  if(s!=='normal')document.documentElement.classList.add('f-'+s);
  if(s==='geo'){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;1,300&display=swap';document.head.appendChild(l);}
})();
