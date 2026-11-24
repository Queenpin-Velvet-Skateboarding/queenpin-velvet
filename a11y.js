/* Barrierefreiheit: Screenreader, Tastatur, weniger Bewegung */
(function(){
  var d=document,main=d.querySelector('main');
  /* Sprungmarke zum Inhalt */
  if(main){main.id=main.id||'inhalt';var s=d.createElement('a');s.className='skip';s.href='#inhalt';s.textContent='Zum Inhalt springen';d.body.insertBefore(s,d.body.firstChild);}
  /* Seitentitel als Überschrift, wo keine sichtbare da ist */
  var t={'events.html':'Events','bald.html':'Bald hier','bloom.html':'It takes courage to bloom','kurse.html':'Kurse'};
  var seite=location.pathname.split('/').pop()||'index.html';
  if(main&&t[seite]&&(seite==='kurse.html'||!main.querySelector('h1'))){var h=d.createElement('h1');h.className='sr';h.textContent=t[seite];main.insertBefore(h,main.firstChild);}
  /* Sprachen */
  d.querySelectorAll('nav .lang a').forEach(function(a){var x=a.textContent.trim(),n={DE:'Deutsch',FR:'Français',EN:'English'}[x],l={DE:'de',FR:'fr',EN:'en'}[x];if(!n)return;a.setAttribute('lang',l);
    if(a.getAttribute('href')==='#'){a.setAttribute('aria-disabled','true');a.setAttribute('aria-label',n+' (noch nicht verfügbar)');a.addEventListener('click',function(e){e.preventDefault();});}else a.setAttribute('aria-label',n);});
  /* Links mit klarem Ziel */
  d.querySelectorAll('a.s-btn').forEach(function(a){var x=a.textContent.trim(),k=a.closest('form'),kurs=k&&k.getAttribute('data-kurs');
    var z=x==='Instagram'?'Queenpin auf Instagram':x==='WhatsApp'&&!kurs?'Queenpin WhatsApp-Gruppe':(kurs?'Anmelden über '+x+' – '+kurs.replace('Ferienkurs ',''):x);
    if(a.target==='_blank')z+=' (öffnet neues Fenster)';a.setAttribute('aria-label',z);});
  d.querySelectorAll('a.corner.tr').forEach(function(a){a.setAttribute('aria-label','Queenpin – Startseite');});
  d.querySelectorAll('a.k-motto').forEach(function(a){a.setAttribute('aria-label','It takes courage to bloom – Spruch');});
  /* Kurse: nach dem Wechsel der Ansicht vorlesen und Fokus auf die Überschrift */
  var art=d.querySelector('.s-kurse');
  if(art){var live=d.createElement('p');live.className='sr';live.setAttribute('aria-live','polite');art.appendChild(live);
    var alt=art.className;
    new MutationObserver(function(){if(art.className===alt)return;alt=art.className;
      setTimeout(function(){var ziel=null;
        if(art.classList.contains('zeige-wahl'))ziel=d.querySelector('.k-wahl a');
        else if(art.classList.contains('zeige-level'))ziel=art.querySelector('.k-levels-titel');
        else art.querySelectorAll('.k-spalte').forEach(function(f){if(!ziel&&f.getClientRects().length)ziel=f.querySelector('.k-name');});
        if(ziel){if(!/^A$/.test(ziel.tagName))ziel.setAttribute('tabindex','-1');ziel.focus({preventScroll:true});live.textContent=ziel.textContent.replace(/\s+/g,' ').trim();}
      },60);}).observe(art,{attributes:true,attributeFilter:['class']});}
  /* Weniger Bewegung gewünscht: Filme gleich auf dem Schlussbild */
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){
    d.querySelectorAll('video').forEach(function(v){v.removeAttribute('autoplay');v.pause();function end(){try{v.currentTime=Math.max(0,(v.duration||0)-.05);}catch(e){}}if(v.readyState>0)end();else v.addEventListener('loadedmetadata',end);v.play=function(){end();return Promise.resolve();};});}
})();
