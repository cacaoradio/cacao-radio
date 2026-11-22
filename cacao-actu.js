
/* CACAO RADIO — CACAO ACTU
   Fichier commun à l'accueil et à la page dédiée.
   Événements, bonnes nouvelles, flux et carrousel.
   Mise à jour : 22 novembre 2026.
*/

(function () {
  "use strict";

  const bloc = document.getElementById("cr-actu-chocolat");
  if (!bloc || bloc.dataset.initialise === "oui") return;
  bloc.dataset.initialise = "oui";

  const grille = bloc.querySelector(".cr-actu-grille");
  if (!grille) return;

  /* DESIGN ORIGINAL CONSERVÉ */

  if (!document.getElementById("cr-actu-styles-communs")) {
    const style = document.createElement("style");
    style.id = "cr-actu-styles-communs";

    style.textContent = `
#cr-actu-chocolat {
  width:94%;
  max-width:1100px;
  margin:28px auto;
  padding:24px;
  background-color:#f8f2e9;
  background-image:
    linear-gradient(rgba(248,242,233,.22),rgba(248,242,233,.22)),
    url("https://cacaoradio.github.io/cacao-radio/Cacao_Actu_Fond_Chocolat.jpg");
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
  border:1px solid #e7d8c5;
  border-radius:12px;
  color:#302019;
  font-family:Georgia,"Times New Roman",serif;
  box-sizing:border-box;
}

#cr-actu-chocolat * {
  box-sizing:border-box;
}

#cr-actu-chocolat .cr-actu-entete {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  flex-wrap:wrap;
  gap:14px;
  margin-bottom:20px;
  border-radius:8px;
  background:linear-gradient(
    90deg,
    rgba(248,242,233,.94),
    rgba(248,242,233,.82) 39%,
    rgba(248,242,233,.04) 85%
  );
}

#cr-actu-chocolat .cr-actu-entete h1,
#cr-actu-chocolat .cr-actu-entete h2 {
  font:normal clamp(25px,3.2vw,36px)/1.15 Georgia,serif;
  margin:0 0 9px;
  color:#2e1a13;
}

#cr-actu-chocolat .cr-actu-entete p {
  font-size:16px;
  line-height:1.55;
  margin:0;
  color:#604b3b;
}

#cr-actu-chocolat .cr-actu-badge {
  background:#e9ddcc;
  color:#60402f;
  border-radius:999px;
  font:700 9px/1.3 Arial,sans-serif;
  letter-spacing:.8px;
  padding:6px 9px;
  white-space:nowrap;
  opacity:.8;
}

/* CARROUSEL HORIZONTAL */

#cr-actu-chocolat .cr-actu-grille {
  display:flex;
  flex-wrap:nowrap;
  gap:14px;
  overflow-x:auto;
  overflow-y:hidden;
  scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;
  overscroll-behavior-x:contain;
  scrollbar-width:none;
  cursor:grab;
  padding-bottom:3px;
}

#cr-actu-chocolat .cr-actu-grille::-webkit-scrollbar {
  display:none;
}

#cr-actu-chocolat .cr-actu-grille.cr-actu-glisse {
  cursor:grabbing;
  user-select:none;
  scroll-snap-type:none;
}

/* QUATRE CARTES VISIBLES SUR ORDINATEUR */

#cr-actu-chocolat .cr-actu-carte {
  display:flex;
  flex-direction:column;
  flex:0 0 calc((100% - 42px)/4);
  min-width:0;
  min-height:188px;
  gap:13px;
  padding:18px 16px;
  background:#fffdf9;
  border:1px solid #e5d6c5;
  border-radius:10px;
  color:#302019;
  text-decoration:none;
  scroll-snap-align:start;
  transition:border-color .16s,transform .16s;
}

#cr-actu-chocolat a.cr-actu-carte:hover,
#cr-actu-chocolat a.cr-actu-carte:focus-visible {
  border-color:#8a583d;
  transform:translateY(-2px);
  outline-offset:2px;
}

#cr-actu-chocolat .cr-actu-rubrique {
  font:700 10px/1.35 Arial,sans-serif;
  letter-spacing:.75px;
  text-transform:uppercase;
  color:#8a583d;
}

#cr-actu-chocolat .cr-actu-titre-carte {
  font:normal 19px/1.35 Georgia,serif;
  overflow-wrap:anywhere;
  color:#302019;
}

#cr-actu-chocolat .cr-actu-bas {
  margin-top:auto;
}

#cr-actu-chocolat .cr-actu-source {
  font:12px/1.4 Arial,sans-serif;
  color:#79695e;
  margin-bottom:8px;
}

#cr-actu-chocolat .cr-actu-lire {
  font:700 12px/1.4 Arial,sans-serif;
  color:#713f29;
}

#cr-actu-chocolat .cr-actu-vide {
  opacity:.72;
}

#cr-actu-chocolat .cr-actu-pied {
  margin-top:14px;
  padding:8px 10px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:10px;
  background:rgba(248,242,233,.9);
  border-radius:8px;
}

#cr-actu-chocolat .cr-actu-note {
  margin:0;
  flex:1 1 400px;
  font:12px/1.5 Arial,sans-serif;
  color:#79695e;
}

#cr-actu-chocolat .cr-actu-plus {
  text-align:center;
  margin:16px 0 0;
}

#cr-actu-chocolat .cr-actu-plus a {
  display:inline-block;
  padding:10px 16px;
  border:1px solid #d8c8b8;
  border-radius:8px;
  background:#fffdf9;
  color:#493023;
  text-decoration:none;
  font:700 13px/1.4 Arial,sans-serif;
}

/* TABLETTES */

@media(max-width:900px) {
  #cr-actu-chocolat .cr-actu-carte {
    flex-basis:calc((100% - 14px)/2);
  }
}

/* SMARTPHONES */

@media(max-width:560px) {
  #cr-actu-chocolat {
    padding:18px 14px;
  }

  /* MARGE DU TITRE ET DU TEXTE DE PRÉSENTATION */

  #cr-actu-chocolat .cr-actu-entete {
    padding-left:14px;
    padding-right:14px;
  }

  #cr-actu-chocolat .cr-actu-carte {
    flex-basis:88%;
  }

  #cr-actu-chocolat .cr-actu-badge {
    white-space:normal;
  }
}
    `;

    document.head.appendChild(style);
  }

  /* SOURCES RSS EXISTANTES */

  const sources = [
    {
      nom:"Ville de Senlis · OpenAgenda",
      flux:"https://openagenda.com/agendas/56170473/events.v2.rss"
    },
    {
      nom:"Bordeaux Mon Commerce · OpenAgenda",
      flux:"https://openagenda.com/agendas/72599993/events.v2.rss"
    },
    {
      nom:"AubeActu",
      flux:"https://aubeactu.fr/flux/rss.xml"
    }
  ];

  /* ÉVÉNEMENTS CHOCOLATÉS */

  const evenements = [
    {
      titre:"Alès : le Salon MIAM célèbre les artisans gourmands et les produits du terroir",
      source:"Salon MIAM — organisateur",
      lien:"https://www.miam-ales.com/",
      dates:"20–23 nov. 2026",
      debut:"2026-11-20",
      fin:"2026-11-23",
      ajouteLe:"2026-11-21T20:40:00+01:00"
    },
    {
      titre:"Rodez : le Salon du Chocolat et des Délices réunit 38 exposants",
      source:"Office de tourisme de Rodez",
      lien:"https://www.rodez-tourisme.fr/offres/salon-du-chocolat-et-des-delices-rodez-fr-5361085/",
      dates:"21–22 nov. 2026",
      debut:"2026-11-21",
      fin:"2026-11-22",
      ajouteLe:"2026-11-21T20:39:00+01:00"
    },
    {
      titre:"Canet-en-Roussillon : salon du chocolat et de l’artisanat gourmand",
      source:"Tourisme Pyrénées-Orientales",
      lien:"https://www.tourisme-pyreneesorientales.com/agenda/salon-du-chocolat-et-de-lartisanat-gourmand-canet-en-roussillon-fr-6049576/",
      dates:"21–22 nov. 2026",
      debut:"2026-11-21",
      fin:"2026-11-22",
      ajouteLe:"2026-11-21T20:38:00+01:00"
    },
    {
      titre:"Gruissan : le Salon Chocolat et Délices revient début décembre",
      source:"Office de tourisme de Gruissan",
      lien:"https://www.gruissan-mediterranee.com/agenda-evenement-gruissan/salon-chocolat-et-delices/",
      dates:"4–6 déc. 2026",
      debut:"2026-12-04",
      fin:"2026-12-06",
      ajouteLe:"2026-11-21T20:37:00+01:00"
    },
    {
      titre:"Paris : chocolats et spécialités gourmandes au Salon Saveurs",
      source:"Salon Saveurs — organisateur",
      lien:"https://www.salon-saveurs.com/infos-pratiques/dates-et-lieux/",
      dates:"4–7 déc. 2026",
      debut:"2026-12-04",
      fin:"2026-12-07",
      ajouteLe:"2026-11-21T20:36:00+01:00"
    },
    {
      titre:"Santenay : dégustations et artisans au Marché du Chocolat",
      source:"Beaune Tourisme",
      lien:"https://www.beaune-tourisme.fr/sejourner/agenda/marche-du-chocolat-de-santenay-santenay-fr-3949406/",
      dates:"6 déc. 2026",
      debut:"2026-12-06",
      fin:"2026-12-06",
      ajouteLe:"2026-11-21T20:35:00+01:00"
    },

    /* ÉVÉNEMENTS DÉJÀ ENREGISTRÉS */

    {
      titre:"Paris : des chocolatiers à découvrir au Salon du Made in France jusqu’au 15 novembre",
      source:"MIF Expo — organisateur",
      lien:"https://www.mifexpo.fr/infos-pratiques-paris-2026/",
      dates:"12–15 nov. 2026",
      debut:"2026-11-12",
      fin:"2026-11-15",
      ajouteLe:"2026-11-13T20:00:00+01:00"
    },
    {
      titre:"Chartres : les artisans chocolatiers réunis pour une journée gourmande le 21 novembre",
      source:"Office de tourisme de Chartres",
      lien:"https://www.chartres-tourisme.com/vivez/agenda/agenda-des-manifestations/ici-c-est-chocolat-mini-salon-du-chocolat-6852320",
      dates:"21 nov. 2026",
      debut:"2026-11-21",
      fin:"2026-11-21",
      ajouteLe:"2026-11-11T11:00:00+01:00"
    },
    {
      titre:"Asnières-sur-Seine : le Salon Vin et Chocolat revient du 13 au 15 novembre",
      source:"Ville d’Asnières-sur-Seine",
      lien:"https://asnieres-sur-seine.fr/actualites/detail/salon-vin-et-chocolat-2026",
      dates:"13–15 nov. 2026",
      debut:"2026-11-13",
      fin:"2026-11-15",
      ajouteLe:"2026-11-09T09:00:00+01:00"
    },
    {
      titre:"Courtry : le Salon du chocolat fête sa douzième édition",
      source:"Seine-et-Marne Vivre en Grand",
      lien:"https://www.tourisme-seine-et-marne.fr/visiter-decouvrir/6304022-salon-chocolat/",
      dates:"14–15 nov. 2026",
      debut:"2026-11-14",
      fin:"2026-11-15",
      ajouteLe:"2026-11-09T08:59:00+01:00"
    },
    {
      titre:"Pontoise accueille le Salon Chocolat & Champagne",
      source:"Département du Val-d’Oise",
      lien:"https://www.valdoise.fr/agenda/22377/177-salon-du-chocolat-champagne.htm",
      dates:"20–22 nov. 2026",
      debut:"2026-11-20",
      fin:"2026-11-22",
      ajouteLe:"2026-11-09T08:58:00+01:00"
    },
    {
      titre:"Saint-Just-Saint-Rambert : trois jours pour célébrer le chocolat",
      source:"Ville de Saint-Just-Saint-Rambert",
      lien:"https://www.stjust-strambert.fr/evenement/cest-tout-chocolat-2026/",
      dates:"20–22 nov. 2026",
      debut:"2026-11-20",
      fin:"2026-11-22",
      ajouteLe:"2026-11-09T08:57:00+01:00"
    },
    {
      titre:"Le Grau-du-Roi organise trois jours de découvertes chocolatées",
      source:"Ville du Grau-du-Roi",
      lien:"https://ville-legrauduroi.fr/actualites/salon-du-chocolat-2026/",
      dates:"13–15 nov. 2026",
      debut:"2026-11-13",
      fin:"2026-11-15",
      ajouteLe:"2026-11-09T08:56:00+01:00"
    }
  ];

  /* BONNES NOUVELLES DU CHOCOLAT */

  const actualitesSelection = [
    {
      titre:"Saint-Malo : Noémie Bessec, ancienne candidate de Koh-Lanta, ouvre Le Comptoir de Mathilde",
      source:"Noémie Bessec",
      lien:"https://fr.linkedin.com/posts/no%C3%A9mie-bessec-4280ab275_nouvelle-casquette-dentrepreneuse-l-activity-7520767052119470080-bXOC",
      date:"2026-11-22",
      ligneSource:"Annonce de Noémie Bessec · sélection du 22 nov. 2026",
      fin:"2027-01-22"
    },
    {
      titre:"Valrhona et l’Institut Lyfe s’unissent pour former les talents de demain",
      source:"Valrhona",
      lien:"https://www.valrhona.com/fr-FR/nos-actualites/toutes-nos-actualites/valrhona-et-institut-lyfe-s-unissent-pour-former-les-talents-de-la-gastronomie-de-demain",
      date:"2026-11-17",
      fin:"2027-01-15"
    },
    {
      titre:"Valrhona met à l’honneur la créativité au Concours de la Pâtisserie Durable",
      source:"Valrhona",
      lien:"https://www.valrhona.com/fr-FR/nos-actualites/toutes-nos-actualites/l-audace-a-l-honneur-de-la-3e-edition-du-concours-de-la-patisserie-durable-2026",
      date:"2026-11-14",
      fin:"2027-01-15"
    },
    {
      titre:"Justin Brocq sacré meilleur pain au chocolat de France 2026",
      source:"Confédération de la boulangerie-pâtisserie",
      lien:"https://boulangerie.org/blog/2026/10/30/justin-brocq-grand-vainqueur-du-5e-master-national-du-meilleur-pain-au-chocolat-2026/",
      date:"2026-10-30",
      fin:"2027-01-15"
    }
  ];

  /* FILTRES DES FLUX */

  const motsChocolat = [
    "chocolat",
    "cacao",
    "chocolatier",
    "cacaoyer",
    "praline"
  ];

  const negatifs = [
    "crise","hausse des prix","inflation","penurie",
    "fermeture","ferme ses portes","deces","mort",
    "rappel produit","rappel de produit","contamin",
    "fraude","scandale","chute des cours",
    "deforestation","licenciement","greve",
    "en difficulte","en danger","incendie",
    "annulation","annule","menace","alerte",
    "pesticide","plainte","condamn","chocolatine",
    "satirique","coup dur","en baisse","en hausse",
    "rappel de lots","cadmium"
  ];

  const cacheCle = "cacao-radio-cacao-actu-flux-v2";

  function normaliser(texte) {
    return String(texte || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .toLowerCase();
  }

  function estPositif(titre) {
    const t = normaliser(titre);

    return motsChocolat.some(m => t.includes(m)) &&
           !negatifs.some(m => t.includes(m));
  }

  function dateFR(timestamp) {
    return new Intl.DateTimeFormat("fr-FR",{
      day:"numeric",
      month:"short",
      year:"numeric",
      timeZone:"Europe/Paris"
    }).format(new Date(timestamp));
  }

  function element(tag,classe,texte) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texte !== undefined) el.textContent = texte;
    return el;
  }

  /* ÉVÉNEMENTS NON EXPIRÉS */

  function annoncesValides() {
    return evenements
      .filter(e =>
        Date.parse(e.fin+"T23:59:59+01:00") >= Date.now()
      )
      .map(e => ({
        ...e,
        timestamp:Date.parse(e.ajouteLe),
        debutTimestamp:Date.parse(
          e.debut+"T00:00:00+01:00"
        ),
        rubrique:"ÉVÉNEMENT",
        ligneSource:e.source+" · "+e.dates,
        automatique:false
      }));
  }

  /* ACTUALITÉS ÉDITORIALES NON EXPIRÉES */

  function actualitesValides() {
    return actualitesSelection
      .filter(a =>
        Date.parse(a.fin+"T23:59:59+01:00") >= Date.now()
      )
      .map(a => ({
        ...a,
        timestamp:Date.parse(
          a.date+"T12:00:00+01:00"
        ),
        rubrique:"BONNE NOUVELLE",
        ligneSource:a.ligneSource ||
          (a.source+" · "+
          dateFR(Date.parse(a.date+"T12:00:00+01:00"))),
        automatique:false
      }));
  }

  /* CLASSEMENT CHRONOLOGIQUE */

  function selectionner(flux) {
    const vus = new Set();

    return [
      ...annoncesValides(),
      ...actualitesValides(),
      ...flux
    ]
      .filter(a => {
        try {
          if (new URL(a.lien).protocol !== "https:") {
            return false;
          }
        } catch (_) {
          return false;
        }

        if (!Number.isFinite(a.timestamp)) return false;

        const id = normaliser(a.titre)
          .replace(/[^a-z0-9]/g,"");

        if (vus.has(id)) return false;

        vus.add(id);
        return true;
      })
      .sort((a,b) => {

        const aEvenement =
          Number.isFinite(a.debutTimestamp);

        const bEvenement =
          Number.isFinite(b.debutTimestamp);

        /* Salons : date de début croissante */

        if (aEvenement && bEvenement) {
          return (
            a.debutTimestamp-b.debutTimestamp
          ) || (
            b.timestamp-a.timestamp
          );
        }

        /* Les salons passent avant les actualités */

        if (aEvenement !== bEvenement) {
          return aEvenement ? -1 : 1;
        }

        /* Actualités : les plus récentes en premier */

        return b.timestamp-a.timestamp;
      });
  }

  /* AFFICHAGE DES CARTES */

  function afficher(articles) {
    grille.replaceChildren();

    for (
      let i=0;
      i<Math.max(4,articles.length);
      i++
    ) {
      const a = articles[i];

      const carte = element(
        a ? "a" : "div",
        "cr-actu-carte" +
        (a ? "" : " cr-actu-vide")
      );

      if (a) {
        carte.href = a.lien;
        carte.target = "_blank";
        carte.rel = "noopener noreferrer";
      }

      carte.appendChild(
        element(
          "span",
          "cr-actu-rubrique",
          a
            ? (
                i===0
                  ? "À LA UNE"
                  : a.rubrique || "BONNE NOUVELLE"
              )
            : "À VENIR"
        )
      );

      carte.appendChild(
        element(
          "div",
          "cr-actu-titre-carte",
          a
            ? a.titre
            : "Une prochaine belle nouvelle du chocolat…"
        )
      );

      const bas = element("div","cr-actu-bas");

      if (a) {
        bas.appendChild(
          element(
            "div",
            "cr-actu-source",
            a.ligneSource ||
            a.source+" · "+dateFR(a.timestamp)
          )
        );

        bas.appendChild(
          element(
            "span",
            "cr-actu-lire",
            a.automatique
              ? "VOIR L'ANNONCE →"
              : "DÉCOUVRIR →"
          )
        );
      }

      carte.appendChild(bas);
      grille.appendChild(carte);
    }
  }

  /* GLISSEMENT HORIZONTAL À LA SOURIS */

  let souris = false;
  let depart = 0;
  let scrollDepart = 0;
  let glisse = false;

  grille.addEventListener("mousedown",e => {
    if (e.button !== 0) return;

    souris = true;
    depart = e.clientX;
    scrollDepart = grille.scrollLeft;
    glisse = false;
  });

  window.addEventListener("mousemove",e => {
    if (!souris) return;

    const distance = e.clientX-depart;

    if (Math.abs(distance)>6 || glisse) {
      glisse = true;
      grille.classList.add("cr-actu-glisse");
      grille.scrollLeft = scrollDepart-distance;
      e.preventDefault();
    }
  });

  window.addEventListener("mouseup",() => {
    if (!souris) return;

    souris = false;
    grille.classList.remove("cr-actu-glisse");

    if (glisse) {
      setTimeout(() => {
        glisse=false;
      },0);
    }
  });

  grille.addEventListener("dragstart",e => {
    e.preventDefault();
  });

  grille.addEventListener("click",e => {
    if (glisse) {
      e.preventDefault();
      e.stopPropagation();
      glisse=false;
    }
  },true);

  /* CHARGEMENT DES FLUX RSS */

  async function chargerFlux(source) {
    const url =
      "https://api.rss2json.com/v1/api.json?rss_url=" +
      encodeURIComponent(source.flux);

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),12000
    );

    try {
      const reponse = await fetch(url,{
        signal:controller.signal
      });

      if (!reponse.ok) {
        throw new Error("HTTP "+reponse.status);
      }

      const json = await reponse.json();

      if (
        json.status !== "ok" ||
        !Array.isArray(json.items)
      ) return [];

      return json.items.map(item => ({
        titre:String(item.title || "").trim(),
        date:String(item.pubDate || ""),
        lien:String(item.link || ""),
        source:source.nom,
        automatique:true
      }));

    } finally {
      clearTimeout(timeout);
    }
  }

  /* CACHE DES ACTUALITÉS RSS */

  function obtenirCache() {
    try {
      const c = JSON.parse(
        localStorage.getItem(cacheCle) || "null"
      );

      if (
        c &&
        Array.isArray(c.articles) &&
        Date.now()-c.sauvegarde < 7*86400000
      ) return c.articles;

    } catch (_) {}

    return [];
  }

  /* ACTUALISATION AUTOMATIQUE */

  async function actualiser() {
    const resultats = await Promise.allSettled(
      sources.map(chargerFlux)
    );

    const maintenant = Date.now();

    const articles = resultats
      .flatMap(r =>
        r.status==="fulfilled" ? r.value : []
      )
      .filter(a => {
        const d = Date.parse(a.date.replace(" ","T"));

        if (
          !Number.isFinite(d) ||
          d > maintenant+86400000 ||
          d < maintenant-120*86400000
        ) return false;

        if (!estPositif(a.titre)) return false;

        a.timestamp = d;
        a.rubrique = "BONNE NOUVELLE";

        return true;
      });

    if (articles.length) {
      afficher(selectionner(articles));

      try {
        localStorage.setItem(
          cacheCle,
          JSON.stringify({
            articles,
            sauvegarde:maintenant
          })
        );
      } catch (_) {}

    } else {
      afficher(
        selectionner(obtenirCache())
      );
    }
  }

  /* DÉMARRAGE */

  afficher(selectionner(obtenirCache()));

  actualiser().catch(() => {});

  /* RAFRAÎCHISSEMENT TOUTES LES HEURES */

  setInterval(
    () => actualiser().catch(() => {}),
    60*60*1000
  );

})();
