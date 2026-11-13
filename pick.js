/* Kurs-Auswahl: angewählte Zeilen werden in die Anmelde-Nachricht übernommen
   (WhatsApp / Mail / SMS). Kein Bezahlen auf der Seite – nur Anmeldung. */
(function(){
  document.querySelectorAll('.pick').forEach(function(box){
    var kurs=box.getAttribute('data-kurs');
    var links=box.querySelectorAll('.s-btn');
    links.forEach(function(a){a.setAttribute('data-base',a.getAttribute('href'));});
    function update(){
      var teile=[kurs];
      box.querySelectorAll('input:checked, select').forEach(function(i){if(i.value)teile.push(i.value);});
      box.querySelectorAll('select').forEach(function(x){x.classList.toggle('gewaehlt',!!x.value);});
      var pr=box.querySelector('.k-preis'),alle=[].every.call(box.querySelectorAll('select'),function(x){return x.value;});
      if(pr){pr.hidden=!alle;pr.textContent=box.getAttribute('data-preis')||'';}
      var text='Hallo Queenpin! Ich möchte mich anmelden: '+teile.join(', ')+'.\nName:\nAlter:';
      var t=encodeURIComponent(text);
      links.forEach(function(a){
        var b=a.getAttribute('data-base');
        if(b.indexOf('mailto:')===0)a.href=b.split('?')[0]+'?subject='+encodeURIComponent('Anmeldung '+kurs)+'&body='+t;
        else if(b.indexOf('sms:')===0)a.href=b.split('?')[0]+'?&body='+t;
        else if(b.indexOf('https://wa.me/')===0)a.href=b.split('?')[0]+'?text='+t;
      });
    }
    /* Gruppen je nach Termin: nur buchbare Gruppen anzeigen */
    var st=box.querySelector('select[name=termin]'),sg=box.querySelector('select[name=gruppe]');
    var info=box.querySelector('.k-info');
    if(st&&sg){
      var alle=[].slice.call(sg.querySelectorAll('option[data-in]'));
      var ph=sg.options[0];
      function fill(){
        var g=(st.selectedOptions[0]||{}).getAttribute?st.selectedOptions[0].getAttribute('data-g'):null;
        alle.forEach(function(o){if(o.parentNode)o.parentNode.removeChild(o);});
        if(g)alle.forEach(function(o){if(o.getAttribute('data-in').indexOf(g)>-1)sg.appendChild(o);});
        sg.value='';ph.textContent=g?'gruppe wählen':'zuerst termin wählen';sg.disabled=!g;
      }
      st.addEventListener('change',fill);fill();
      sg.addEventListener('change',function(){});
    }
    function showInfo(){
      if(!info||!sg)return;var o=sg.selectedOptions[0],t=o&&o.getAttribute('data-info');
      info.hidden=!t;info.textContent=t||'';
    }
    box.addEventListener('change',function(){showInfo();update();});update();
  });
})();
