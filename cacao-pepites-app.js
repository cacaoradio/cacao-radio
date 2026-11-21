
/* CACAO RADIO — LA PÉPITE
   AFFICHAGE COMMUN ACCUEIL / PAGE DÉDIÉE.
   Reprise du code d'origine:
   carrousel, articles, YouTube, partage et historique URL.
*/
(function(){

const root=document.getElementById("cacao-pepite");
if(!root||root.dataset.initialise==="oui")return;
root.dataset.initialise="oui";

/* Accueil ou page dédiée */
const EST_PAGE_PEPITES=
  location.pathname.replace(/\/+$/,'')==='/la-pepite';

const SITE=EST_PAGE_PEPITES
  ?'https://www.cacaoradio.com/la-pepite'
  :'https://www.cacaoradio.com/';

const SECTION=EST_PAGE_PEPITES
  ?''
  :'page-zones__main-widgets__6adc67e1c2da7';

const articles=Array.isArray(window.CACAO_PEPITES)
  ?window.CACAO_PEPITES.slice()
  :[];

/* Classement automatique */

articles.sort((a,b)=>{
  const d=b.date.localeCompare(a.date);
  return d||((a.ordreInitial||0)-(b.ordreInitial||0));
});

const rail=root.querySelector("#pepite-rail");
const zone=root.querySelector("#pepite-article");
const nav=root.querySelector("#pepite-navigation");
const prev=root.querySelector("#pepite-prev");
const next=root.querySelector("#pepite-next");
const compteur=root.querySelector("#pepite-compteur");

function creer(tag,classe,texte){
  const e=document.createElement(tag);
  if(classe)e.className=classe;
  if(texte!==undefined)e.textContent=texte;
  return e;
}

function videoId(url){
  try{
    const u=new URL(url);
    const host=u.hostname.replace(/^www\./,"");
    let id=null;

    if(host==="youtu.be"){
      id=u.pathname.split("/")[1];
    }else if(host==="youtube.com"||host==="m.youtube.com"){
      if(u.pathname==="/watch"){
        id=u.searchParams.get("v");
      }else if(
        ["embed","shorts","live"].includes(
          u.pathname.split("/")[1]
        )
      ){
        id=u.pathname.split("/")[2];
      }
    }

    return /^[A-Za-z0-9_-]{11}$/.test(id||"")
      ?id
      :null;

  }catch(e){
    return null;
  }
}

function lienArticle(a){
  const u=new URL(SITE);
  u.searchParams.set("pepite",a.id);
  u.hash=SECTION;
  return u.toString();
}

function fermer(){
  zone.replaceChildren();
  zone.classList.remove("visible");

  const u=new URL(location.href);

  if(u.searchParams.has("pepite")){
    u.searchParams.delete("pepite");

    history.replaceState(
      null,
      "",
      u.pathname+u.search+u.hash
    );
  }
}

function ouvrir(a,depuisLien=false){
  zone.replaceChildren();

  const interieur=creer("div","interieur");
  const entete=creer("div","article-entete");

  entete.appendChild(
    creer("span","categorie",a.categorie)
  );

  const fermerBtn=creer(
    "button",
    "fermer",
    "Fermer ✕"
  );

  fermerBtn.onclick=fermer;

  entete.appendChild(fermerBtn);
  interieur.appendChild(entete);

  interieur.appendChild(
    creer("h2","",a.titre)
  );

  if(a.image){
    const img=creer("img","article-image");

    img.src=a.image;
    img.alt=a.titre;
    img.loading="lazy";

    interieur.appendChild(img);
  }

  a.contenu.forEach(s=>{
    if(s.titre){
      interieur.appendChild(
        creer("h3","",s.titre)
      );
    }

    interieur.appendChild(
      creer("p","",s.texte)
    );
  });

  /* Lecteur YouTube intégré */

  const id=videoId(a.youtube);

  if(id){
    interieur.appendChild(
      creer("h3","","Découvrez le clip")
    );

    const video=creer("div","video");
    const iframe=document.createElement("iframe");

    iframe.src=
      "https://www.youtube-nocookie.com/embed/"+id;

    iframe.title="Clip de "+a.titre;
    iframe.loading="lazy";

    iframe.allow=
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";

    iframe.allowFullscreen=true;

    iframe.referrerPolicy=
      "strict-origin-when-cross-origin";

    video.appendChild(iframe);
    interieur.appendChild(video);
  }

  interieur.appendChild(
    creer(
      "div",
      "signature",
      "Cacao Radio – Easy Listening Radio"
    )
  );

  /* Boutons de partage */

  const partage=creer("div","partage");

  partage.appendChild(
    creer("strong","","Partager cette Pépite")
  );

  const actions=creer("div","partage-actions");

  const url=lienArticle(a);
  const texte="Découvrez "+a.titre+" sur Cacao Radio";

  const fb=creer("a","partage-btn","Facebook");

  fb.href=
    "https://www.facebook.com/sharer/sharer.php?u="+
    encodeURIComponent(url);

  fb.target="_blank";
  fb.rel="noopener noreferrer";

  actions.appendChild(fb);

  const wa=creer("a","partage-btn","WhatsApp");

  wa.href=
    "https://api.whatsapp.com/send?text="+
    encodeURIComponent(texte+" "+url);

  wa.target="_blank";
  wa.rel="noopener noreferrer";

  actions.appendChild(wa);

  const copier=creer(
    "button",
    "partage-btn",
    "Copier le lien"
  );

  copier.onclick=async()=>{
    try{
      if(navigator.clipboard&&window.isSecureContext){
        await navigator.clipboard.writeText(url);
      }else{
        const t=document.createElement("textarea");

        t.value=url;
        document.body.appendChild(t);
        t.select();

        if(!document.execCommand("copy")){
          throw Error("Copie impossible");
        }

        t.remove();
      }

      copier.textContent="Lien copié !";

      setTimeout(()=>{
        copier.textContent="Copier le lien";
      },2500);

    }catch(e){
      window.prompt("Copiez ce lien :",url);
    }
  };

  actions.appendChild(copier);

  if(typeof navigator.share==="function"){
    const natif=creer(
      "button",
      "partage-btn",
      "Autres applications"
    );

    natif.onclick=async()=>{
      try{
        await navigator.share({
          title:a.titre+" – Cacao Radio",
          text:texte,
          url
        });
      }catch(e){}
    };

    actions.appendChild(natif);
  }

  partage.appendChild(actions);
  interieur.appendChild(partage);

  zone.appendChild(interieur);
  zone.classList.add("visible");

  if(
    !depuisLien &&
    ["www.cacaoradio.com","cacaoradio.com"].includes(
      location.hostname
    )
  ){
    history.pushState(null,"",url);
  }

  zone.scrollIntoView({
    behavior:depuisLien?"auto":"smooth",
    block:"start"
  });
}

/* Vérification des données */

if(!articles.length){
  rail.textContent=
    "Les Pépites sont momentanément indisponibles.";

  nav.style.display="none";
  return;
}

/* Création des cartes */

articles.forEach(a=>{
  const carte=creer("article","carte");

  carte.setAttribute("role","button");
  carte.setAttribute("tabindex","0");

  carte.setAttribute(
    "aria-label",
    "Découvrir la pépite : "+a.titre
  );

  carte.onclick=()=>ouvrir(a);

  carte.onkeydown=e=>{
    if(
      e.target===carte &&
      (e.key==="Enter"||e.key===" ")
    ){
      e.preventDefault();
      ouvrir(a);
    }
  };

  if(a.image){
    const img=creer("img","image");

    img.src=a.image;
    img.alt=a.titre;
    img.loading="lazy";

    carte.appendChild(img);
  }

  const contenu=creer("div","contenu");

  contenu.appendChild(
    creer("span","categorie",a.categorie)
  );

  const date=creer(
    "time",
    "date",
    new Date(a.date+"T12:00:00").toLocaleDateString(
      "fr-FR",
      {
        day:"numeric",
        month:"long",
        year:"numeric"
      }
    )
  );

  date.dateTime=a.date;
  contenu.appendChild(date);

  contenu.appendChild(
    creer("h3","titre",a.titre)
  );

  contenu.appendChild(
    creer("p","resume",a.resume)
  );

  const btn=creer(
    "button",
    "bouton",
    "Découvrir la pépite →"
  );

  btn.onclick=e=>{
    e.stopPropagation();
    ouvrir(a);
  };

  contenu.appendChild(btn);
  carte.appendChild(contenu);
  rail.appendChild(carte);
});

/* Navigation du carrousel */

function maj(){
  const cartes=rail.querySelectorAll(".carte");

  if(!cartes.length)return;

  const largeur=
    cartes[0].getBoundingClientRect().width+16;

  const index=Math.min(
    cartes.length-1,
    Math.max(
      0,
      Math.round(rail.scrollLeft/largeur)
    )
  );

  compteur.textContent=
    (index+1)+" / "+cartes.length;

  prev.disabled=rail.scrollLeft<5;

  next.disabled=
    rail.scrollLeft >=
    rail.scrollWidth-rail.clientWidth-5;
}

function deplacer(d){
  const c=rail.querySelector(".carte");

  if(c){
    rail.scrollBy({
      left:d*(c.getBoundingClientRect().width+16),
      behavior:"smooth"
    });
  }
}

prev.onclick=()=>deplacer(-1);
next.onclick=()=>deplacer(1);

rail.addEventListener(
  "scroll",
  maj,
  {passive:true}
);

window.addEventListener("resize",maj);

if(articles.length<=1){
  nav.style.display="none";
  rail.style.justifyContent="center";
}

maj();

/* Ouverture directe d'un article */

function ouvrirDepuisLien(){
  const id=
    new URLSearchParams(location.search)
    .get("pepite");

  const a=articles.find(x=>x.id===id);

  if(a)ouvrir(a,true);
}

if(document.readyState==="complete"){
  ouvrirDepuisLien();
}else{
  window.addEventListener(
    "load",
    ouvrirDepuisLien,
    {once:true}
  );
}

window.addEventListener("popstate",()=>{
  const id=
    new URLSearchParams(location.search)
    .get("pepite");

  const a=articles.find(x=>x.id===id);

  if(a){
    ouvrir(a,true);
  }else{
    zone.replaceChildren();
    zone.classList.remove("visible");
  }
});

})();
