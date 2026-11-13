/* Kurs-Auswahl: angewählte Zeilen werden in die Anmelde-Nachricht übernommen
   (WhatsApp / Mail / SMS). Kein Bezahlen auf der Seite – nur Anmeldung. */
(function(){
  document.querySelectorAll('.pick').forEach(function(box){
    var kurs=box.getAttribute('data-kurs');
    var links=box.querySelectorAll('.s-btn');
    links.forEach(function(a){a.setAttribute('data-base',a.getAttribute('href'));});
    function update(){
      var teile=[kurs];
      box.querySelectorAll('input:checked').forEach(function(i){teile.push(i.value);});
      var text='Hallo Queenpin! Ich möchte mich anmelden: '+teile.join(', ')+'.\nName:\nAlter:';
      var t=encodeURIComponent(text);
      links.forEach(function(a){
        var b=a.getAttribute('data-base');
        if(b.indexOf('mailto:')===0)a.href=b.split('?')[0]+'?subject='+encodeURIComponent('Anmeldung '+kurs)+'&body='+t;
        else if(b.indexOf('sms:')===0)a.href=b.split('?')[0]+'?&body='+t;
        else if(b.indexOf('https://wa.me/')===0)a.href=b.split('?')[0]+'?text='+t;
      });
    }
    box.addEventListener('change',update);update();
  });
})();
