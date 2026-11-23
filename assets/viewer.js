(function(){
  var links=[].slice.call(document.querySelectorAll('a.zoom'));
  if(links.length){
    var box=document.createElement('div');box.className='lightbox';
    box.innerHTML='<button class="lb-close" aria-label="Fermer">×</button><button class="lb-prev" aria-label="Précédente">‹</button><img alt=""><button class="lb-next" aria-label="Suivante">›</button><span class="lb-count"></span>';
    document.body.appendChild(box);
    var img=box.querySelector('img'),cnt=box.querySelector('.lb-count'),i=0;
    function show(k){i=(k+links.length)%links.length;img.src=links[i].href;img.alt=links[i].querySelector('img').alt;cnt.textContent='Diapositive '+links[i].dataset.n;}
    function close(){box.classList.remove('open');var f=links[i].closest('figure');if(f)f.scrollIntoView({block:'center'});}
    links.forEach(function(a,k){a.addEventListener('click',function(ev){ev.preventDefault();show(k);box.classList.add('open');});});
    box.querySelector('.lb-prev').onclick=function(){show(i-1)};
    box.querySelector('.lb-next').onclick=function(){show(i+1)};
    box.querySelector('.lb-close').onclick=close;
    box.addEventListener('click',function(ev){if(ev.target===box)close();});
    document.addEventListener('keydown',function(ev){if(!box.classList.contains('open'))return;
      if(ev.key==='ArrowRight')show(i+1);else if(ev.key==='ArrowLeft')show(i-1);else if(ev.key==='Escape')close();});
  }
  var toc=[].slice.call(document.querySelectorAll('.toc li a'));
  if(toc.length&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){toc.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+en.target.id);});}});},{rootMargin:'-30% 0px -60% 0px'});
    toc.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)io.observe(s);});
  }
})();
