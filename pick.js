/* Kurs-Auswahl: angewählte Zeilen werden in die Anmelde-Nachricht übernommen
   (WhatsApp / Mail / SMS). Kein Bezahlen auf der Seite – nur Anmeldung. */
(function(){
  document.querySelectorAll('.pick').forEach(function(box){
    var kurs=box.getAttribute('data-kurs');
    var links=box.querySelectorAll('.s-btn');
    links.forEach(function(a){a.setAttribute('data-base',a.getAttribute('href'));});
    function update(){
      var termin='',kat='',rest=[],jahr=box.getAttribute('data-jahr')||'';
      box.querySelectorAll('input:checked, select').forEach(function(i){
        if(!i.value)return;
        if(i.name==='kategorie')kat=i.value.split(' ')[0];
        else if(i.name==='termin')termin=i.value.replace(/(\d+\.\d+\.)( ·|$)/,'$1'+jahr+'$2');
        else rest.push(i.value);
      });
      box.querySelectorAll('select').forEach(function(x){x.classList.toggle('gewaehlt',!!x.value);});
      var pr=box.querySelector('.k-preis'),alle=[].every.call(box.querySelectorAll('select'),function(x){return x.value;});
      var mit=box.querySelector('input[name=board]:checked');
      if(pr){pr.hidden=!alle||!(box.getAttribute('data-preis'));pr.textContent=(mit&&box.getAttribute('data-preis-mit'))||(kat==='Seeds'&&box.getAttribute('data-preis-seeds'))||box.getAttribute('data-preis')||'';}
      var detail=[termin,kat].concat(rest).filter(Boolean).join(' · ');
      var text='Liebe Irene\nWir interessieren uns für diesen Kurs:\n'+kurs+',\n'+(detail||'')+'\nName:\nAlter:';
      var t=encodeURIComponent(text);
      links.forEach(function(a){
        var b=a.getAttribute('data-base');
        if(b.indexOf('mailto:')===0)a.href=b.split('?')[0]+'?subject='+encodeURIComponent('Anmeldung '+kurs)+'&body='+t;
        else if(b.indexOf('sms:')===0)a.href=b.split('?')[0]+'?&body='+t;
        else if(b.indexOf('https://wa.me/')===0)a.href=b.split('?')[0]+'?text='+t;
      });
    }
    /* Kategorie: voller Text bleibt nach der Wahl sichtbar (bricht um, statt abgeschnitten) */
    var skat=box.querySelector('select[name=kategorie]');
    if(skat){
      var wrap=document.createElement('div');wrap.className='dd-wrap';
      skat.parentNode.insertBefore(wrap,skat);wrap.appendChild(skat);
      var anz=document.createElement('span');anz.className='dd-anzeige';anz.setAttribute('aria-hidden','true');
      wrap.appendChild(anz);
      function zeig(){var o=skat.selectedOptions[0],t=o?o.textContent:'',x=t.split(' · ');
        anz.innerHTML='';
        var zeilen=[x.slice(0,2).join(' · ')];
        zeilen.forEach(function(z,i){if(i)anz.appendChild(document.createElement('br'));anz.appendChild(document.createTextNode(z));});wrap.classList.toggle('gewaehlt',!!skat.value);}
      skat.addEventListener('change',zeig);zeig();
    }
    /* Erst Kategorie, dann nur die passenden Kurse (mit Datum + Zeit) */
    var sk=box.querySelector('select[name=kategorie]'),st=box.querySelector('select[name=termin]');
    if(sk&&st){
      var alle=[].slice.call(st.querySelectorAll('option[data-k]')),ph=st.options[0];
      function fill(){
        var k=sk.value?sk.value.split(' ')[0]:'';
        alle.forEach(function(o){if(o.parentNode)o.parentNode.removeChild(o);});
        if(k)alle.forEach(function(o){if(o.getAttribute('data-k')===k)st.appendChild(o);});
        st.value='';if(sk.hasAttribute('data-bald')){ph.textContent='Bald buchbar';st.disabled=true;return;}ph.textContent=k?'Kurs wählen':'Zuerst Kategorie wählen';st.disabled=!k;
      }
      sk.addEventListener('change',fill);fill();
    }
    box.addEventListener('change',update);update();
  });
})();
