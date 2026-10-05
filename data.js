/* ==========================================================================
   Business O2 — Référentiel des processus (POC)
   DONNÉES extraites du "Book des processus" v3 (30/07/2026).
   RACI harmonisé, colonne Livrables, annexes numérotées (1 à 15).
   -----------------------------------------------------------------------
   Tout le contenu éditable est ici. Chaque processus suit le même modèle.
   ========================================================================== */

/* --- Catégories de rôles → couleur (vue par acteur) --------------------- */
const CATEGORY_COLORS = {
  propre:      { bg: "#0C447C", label: "Business & Réseau" },                 // bleu
  finance:     { bg: "#B26A00", label: "Finance" },                          // orange
  intervenant: { bg: "#0F6E56", label: "Intervenants & Business Event" },    // vert
  it:          { bg: "#0E7490", label: "IT" },                               // teal
  com:         { bg: "#534AB7", label: "Marketing & Communication" },        // violet
  rh:          { bg: "#A8436B", label: "RH" },                               // rose
  externe:     { bg: "#1A1A1A", label: "Externes" },                         // noir
};

const ROLE_CATEGORIES = {
  "Directeur du Développement": "propre",
  "Responsable de club": "propre",
  "Responsable commercial grands comptes": "propre",
  "Responsable Réseau": "propre",
  "Directeur Réseau & Performance de la marque": "propre",
  "RAF": "finance",
  "Comptable": "finance",
  "Responsable Intervenants": "intervenant",
  "Business Event": "intervenant",
  "Responsable IT": "it",
  "Référent IT": "it",
  "Chef projet IT": "it",
  "Community manager": "com",
  "Agence 360": "com",
  "DRH": "rh",
  "Manager collaborateur": "rh",
  "Comité des Sages": "externe",
  "Animateur du club": "externe",
  "Manager de club franchisé": "externe",
  "Franchisé du board": "externe",
  "Franchisé voisin": "externe",
  "Cabinet d'avocat": "externe",
  "Anecca": "externe",
  "Les fabricants": "externe",
  "Euro Info": "externe",
  "BDL": "externe",
  "Prestataires multi techniques": "externe"};

const PROCESSES = [];

/* =========================================================================
   PARCOURS 1 — PROSPECTION ET PARCOURS MEMBRE
   ========================================================================= */

PROCESSES.push({
  id: "p_prospection", code: "1.1", title: "Prospection", group: "propre",
  description: "Identifier des prospects qualifiés et les convertir en membres, du premier contact à la signature.",
  responsables: ["Directeur du Développement"], acteurs: ["Responsable de club"],
  contributeurs: ["Responsable commercial grands comptes"],
  frequence: "En continu",
  outils: ["Zoho", "Pappers", "LinkedIn", "WhatsApp", "Nomination", "Mail", "Appel"],
  livrables: ["Exemple de messages de prospection "],
  annexes: [1, 2, 3, 13],
  objectif: "Identifier les prospects qualifiés et les convertir en membres, de la première prise de contact à la signature du contrat d'adhésion.",
  etapes: [
    { titre: "1. Identifier et qualifier le prospect", acteur: "Responsable de club", points: [
      "Sources : réseau, recommandation d'un membre, LinkedIn, salons…",
      "Critères : secteur non sur-représenté (un acteur par métier tous les 40 membres), minimum 10 salariés ; demande exceptionnelle → voir le Responsable.",
      "Outils : Zoho (fiche société, suivi des actions), Pappers (identification des dirigeants), LinkedIn (recherche de contacts).",
    ]},
    { titre: "2. Démarcher le prospect", acteur: "Responsable de club", points: [
      "Automatismes dès le contact : groupe WhatsApp « Prospects », connexion LinkedIn, exploitation du réseau du contact (cf. Annexe 1).",
    ]},
    { titre: "3. Organiser un rendez-vous (facultatif)", acteur: "Responsable de club", points: [
      "Lieu à la convenance du prospect. Étape vivement recommandée : crée le lien et évite les relances infructueuses.",
      "Un message de remerciement après chaque échange fait la différence.",
    ]},
    { titre: "4. Présenter l'offre", acteur: "Responsable de club", points: [
      "Remettre le dossier d'adhésion complet (tarifs, engagement, prestations), viser la signature dans la même séance — ⚠️ ne pas se quitter sans décision.",
      "Rester concis (mail, LinkedIn, appel) ; noter chaque échange dans Zoho (cf. Annexe 13).",
    ]},
  ],
  notes: ["Mails types de prospection : Annexe 2. Traitement des objections (ECER) : Annexe 3. Bonnes pratiques : Annexe 1."]});

PROCESSES.push({
  id: "p_visite_usine", code: "1.2", title: "Visite d'usine", group: "propre",
  description: "Organiser une visite d'usine, du premier contact jusqu'au passage de relai au Responsable de club.",
  responsables: ["Responsable commercial grands comptes"],
  acteurs: ["Responsable commercial grands comptes", "Agence 360"],
  contributeurs: ["Responsable de club"],
  frequence: "À la demande", outils: ["Zoho", "LinkedIn"],
  livrables: ["Posts LinkedIn ", "Excel de suivi des inscriptions "],
  annexes: [],
  objectif: "Organiser une visite d'usine pour un club ou un événement, du premier contact avec l'usine jusqu'au passage de relai au Responsable de club.",
  etapes: [
    { titre: "1. Prendre contact avec l'usine et qualifier la demande", acteur: "Responsable commercial grands comptes", points: [] },
    { titre: "2. Valider une date et les horaires de la visite", acteur: "Responsable commercial grands comptes", points: [] },
    { titre: "3. Créer l'invitation de la rencontre", acteur: "Responsable commercial grands comptes / Agence 360", points: [
      "Dans Zoho : campagne d'inscription (Agence 360), formulaire d'inscription (Resp.), ajout des contacts et diffusion.",
    ]},
    { titre: "4. Communiquer sur les réseaux et lors des déjeuners", acteur: "Responsable commercial grands comptes / Responsable de club", points: [
      "Poster sur la page LinkedIn du club, avant et après la visite.",
    ]},
    { titre: "5. Passer le témoin au Responsable de club du secteur", acteur: "Responsable commercial grands comptes / Responsable de club", points: [] },
  ]});

PROCESSES.push({
  id: "p_location_salle", code: "1.3", title: "Location de la salle", group: "propre",
  description: "Louer la salle du niveau 3 (offre simple ou premium tout inclus).",
  responsables: ["Directeur du Développement"], acteurs: ["Responsable de club", "RAF"],
  contributeurs: [],
  frequence: "À la demande", outils: ["Site internet (à venir)", "Planning partagé Outlook", "Zoho"],
  livrables: ["Devis ", "Facture ", "État des lieux de sortie "],
  annexes: [],
  objectif: "Assurer la location de la salle située au niveau 3.",
  etapes: [
    { titre: "1. Communiquer auprès du réseau sur la salle disponible", acteur: "Responsable de club", points: [] },
    { titre: "2. Réceptionner la demande", acteur: "Responsable de club", points: [
      "Trois profils de demandeurs : clubs du réseau BO2, Business Time (même traitement), externes (devis personnalisé).",
    ]},
    { titre: "3. Confirmer la disponibilité de la salle", acteur: "RAF", points: [
      "Outil : planning partagé Outlook, pour éviter les doubles réservations. Tests techniques en amont si besoin.",
    ]},
    { titre: "4. Valider le devis et facturer", acteur: "RAF", points: [
      "Devis validé → facture d'acompte (souvent 100%) → ajustement final en cas de casse/dommage à l'état des lieux.",
    ]},
    { titre: "5. Organiser l'accueil le jour J", acteur: "RAF", points: [
      "Gestion de la prestation ménage si formule premium (commande par le RAF, refacturée au client).",
    ]},
    { titre: "6. Réaliser un état des lieux de sortie", acteur: "RAF", points: ["Réalisé le lendemain si l'événement a lieu en soirée."] },
  ],
  notes: ["Deux offres : location simple (salle seule) ou premium (tout inclus, restauration + ménage, avec marge). Le choix revient à la Direction, au cas par cas."]});

PROCESSES.push({
  id: "p_business_event", code: "1.4", title: "Pôle Business Events", group: "propre",
  description: "Prendre en charge une prestation Business Event, du brief au bilan et au règlement de l'intervenant.",
  responsables: ["Responsable Intervenants"], acteurs: ["Business Event"],
  contributeurs: ["Comptable", "RAF"],
  frequence: "À la demande", outils: ["Zoho Books"],
  livrables: ["Excel de synthèse des demandes ", "Support de présentation de BO2 ", "Contrat Intervenant "],
  annexes: [],
  objectif: "Prendre en charge les demandes de prestations Business Events, de la prise de brief jusqu'au bilan post-événement et au règlement des intervenants.",
  etapes: [
    { titre: "1. Prise de brief", acteur: "Business Event", points: [
      "Demandes entrantes (réseau, franchisés, adhérents) + sourcing (séminaires récurrents, gros événements). Envisager des partenariats avec les lieux de réception.",
      "Suivre dans le Xls de synthèse des projets. Fixer un call de brief détaillé (budget, type d'intervenant, date, lieu, format, thématique, auditoire).",
      "⚠️ Tout collecter dès le premier call. Proposer des profils, solliciter les disponibilités (ordre de priorité).",
    ]},
    { titre: "2. Devis auprès du client (Zoho Books)", acteur: "Business Event", points: [
      "Créer la fiche client si absente, créer le devis (conditions : acompte 70%, transport en sus), le rattacher au club Business Events, envoyer depuis Books.",
      "⚠️ Directeur du Développement en copie. L'acompte (70%) doit être réglé avant toute poursuite ; solde ≤ 7 j après la prestation.",
    ]},
    { titre: "3. Contractualisation de l'intervenant", acteur: "Business Event", points: [
      "Rédiger le contrat (éléments + rémunération) une fois le devis signé, compléter la fiche client (règlement 30 j nets), classer le contrat.",
      "⚠️ Valider la marge sur ces évènements.",
    ]},
    { titre: "4. Facturation de la prestation", acteur: "Business Event / Comptable", points: [
      "Facture d'acompte (70%) au client (Comptable), vérifier son règlement, visio de cadrage, Go-between logistique, facture de solde (≤ 7 j).",
    ]},
    { titre: "5. Suivi du paiement de l'intervenant", acteur: "Business Event / Comptable", points: [
      "Recueillir le retour de l'intervenant, transmettre sa facture à la comptabilité, suivre le règlement de façon proactive.",
      "⚠️ Rappeler qu'il facture Business Events, pas le client final.",
    ]},
    { titre: "6. Bilan et commission", acteur: "Business Event", points: [
      "Recueillir le retour client, clôturer dans le Xls, soumettre la variable en fin de mois.",
      "Commission : marge = CA − (intervenant + logistique). 5% si marge ≤ 1000 €, 10% au-delà ; 500 € pour le franchisé.",
    ]},
  ]});

PROCESSES.push({
  id: "p_qualif_intervenant", code: "1.5", title: "Qualification de l'intervenant", group: "propre",
  description: "Enrichir le book d'intervenants, de l'identification du profil à la signature du contrat.",
  responsables: ["Responsable Intervenants"], acteurs: ["Responsable Intervenants"],
  contributeurs: ["Agence 360"],
  frequence: "À la demande", outils: ["Zoho", "LinkedIn", "Nomination", "Contact Out"],
  livrables: ["Contrat Intervenant ", "Support des nouveaux intervenants du mois "],
  annexes: [],
  objectif: "Enrichir le book d'intervenants disponibles, de l'identification du profil jusqu'à la signature du contrat.",
  etapes: [
    { titre: "1. Identifier et qualifier un profil dans Zoho", acteur: "Responsable Intervenants", points: [
      "Critères : personnalité qui fait l'actualité, recommandée par les membres, ou présente dans le réseau.",
      "Fiche Zoho + coordonnées via Nomination, LinkedIn, Contact Out ou directement.",
    ]},
    { titre: "2. Contacter l'intervenant", acteur: "Responsable Intervenants", points: [
      "Présenter BO2. ⚠️ Documenter le message de premier contact dans Zoho (traçabilité).",
    ]},
    { titre: "3. Approfondir et négocier (si réponse positive)", acteur: "Responsable Intervenants", points: [
      "Second échange téléphonique : présentation du réseau et négociation du tarif.",
    ]},
    { titre: "4. Formaliser l'accord et intégrer au book", acteur: "Responsable Intervenants", points: [
      "Tarif + copie du mail dans Zoho, contrat signé classé dans le Drive.",
      "Onglet « Rencontres » : biographie, photo (libre de droit), thématique, 4 chiffres clés. Cocher « Existant dans Book », autorisations « TOUS ».",
    ]},
    { titre: "5. Communiquer sur le nouvel intervenant", acteur: "Responsable Intervenants", points: [
      "Ajouter au Ppt « Nouveaux intervenants du mois » (réunion mensuelle avec les managers de franchise).",
    ]},
  ],
  notes: ["Sourcing des usines : contacter le dirigeant / la personne en charge de la com', puis renseigner l'usine comme un intervenant. ⚠️ Certaines franchises achètent leurs propres intervenants (hors cahier des charges) — à surveiller."]});

PROCESSES.push({
  id: "p_admission", code: "1.6", title: "Admission d'un nouveau membre", group: "propre",
  description: "Structurer l'admission d'un nouveau membre, du premier contact à l'intégration officielle.",
  responsables: ["Responsable de club"], acteurs: ["Responsable de club", "Comptable"],
  contributeurs: ["Comité des Sages"],
  frequence: "À la demande", outils: ["Zoho Books", "Outlook", "WhatsApp", "LinkedIn"],
  livrables: ["Fiche candidat "],
  annexes: [7, 8],
  objectif: "Garantir la qualité et la cohérence du réseau en structurant l'admission de chaque nouveau membre, du premier contact visiteur à l'intégration officielle.",
  etapes: [
    { titre: "1. Envoyer le devis et la fiche candidat", acteur: "Responsable de club", points: [
      "Le candidat retourne le devis signé + sa fiche complétée. La signature du devis vaut acceptation des CGV.",
    ]},
    { titre: "2. Passage en Comité des Sages", acteur: "Comité des Sages", points: [
      "Évalue l'adéquation du profil avec l'équilibre du club ; valide ou diffère (décision collégiale). Présentation en Annexe 8.",
    ]},
    { titre: "3. Envoyer la facture", acteur: "Comptable", points: [
      "⚠️ Envoyée par le comptable juste après la signature du devis, sous réserve de validation du Comité. Mail auto des accès (Annexe 7).",
    ]},
    { titre: "4. Finaliser l'administratif et le financier", acteur: "Responsable de club / Comptable", points: [
      "Encaisser le 1er règlement sous 30 j. Ajouter aux RDV Outlook / WhatsApp, page LinkedIn, MAJ Zoho (photo + logo). Communication LinkedIn + WhatsApp.",
    ]},
  ],
  notes: ["Entrée d'un « confrère » : si le nouveau membre est concurrent d'un membre présent, prévenir les membres de la même activité — dire « confrère », jamais « concurrent »."]});

PROCESSES.push({
  id: "p_communication_propre", code: "1.7", title: "Communication", group: "propre",
  description: "Animer le réseau et promouvoir les rencontres (détail dans la Ressource Communication).",
  responsables: ["Community manager"], acteurs: ["Responsable de club"],
  contributeurs: ["Agence 360"],
  frequence: "En continu", outils: ["LinkedIn", "WhatsApp"],
  livrables: ["Calendrier éditorial ", "Templates de posts, exemples de contenus "],
  annexes: [], linkComm: true,
  objectif: "Animer le réseau et promouvoir les rencontres. Le détail est regroupé dans la Ressource « Communication »."});

PROCESSES.push({
  id: "p_fidelisation", code: "1.8", title: "Fidélisation des membres", group: "propre",
  description: "Maintenir un portefeuille membres actif via reconnaissance, récompense et intimité.",
  responsables: ["Directeur du Développement"], acteurs: ["Responsable de club"],
  contributeurs: [],
  frequence: "En continu", outils: ["Zoho"],
  livrables: ["Grilles de récompense (cooptation et multi-adhésion) ", "Support présentation offre multi-adhésion "],
  annexes: [],
  objectif: "Maintenir un portefeuille membres actif et engagé en détectant les signaux faibles et en valorisant la fidélité au réseau.",
  etapes: [
    { titre: "1. Suivre mensuellement le portefeuille", acteur: "Responsable de club", points: [
      "Identifier chaque mois les membres actifs, inactifs (> 2 absences) et à risque (impayé, non-renouvellement signalé) ; prioriser les actions.",
    ]},
    { titre: "2. Relancer si nécessaire", acteur: "Responsable de club", points: [
      "⚠️ Message personnalisé, occasion de relancer sur le prochain déjeuner (cf. renouvellement).",
    ]},
    { titre: "3. Remettre les pins de reconnaissance", acteur: "Responsable de club", points: [
      "Pin argent à 1 an, pin or à 3 ans — remise publique lors d'une rencontre.",
    ]},
    { titre: "4. Piloter cooptation, multi-adhésion, récompense", acteur: "Responsable de club", points: [
      "Cooptation : 1 parrainage/an par membre. Multi-adhésion possible. Récompense : 10% de remise pour un parrainage abouti (suivi dans Zoho).",
    ]},
  ],
  notes: ["3 leviers : Intimité · Reconnaissance · Récompense. Rendre visible dans les PPT de déjeuner et via une prise de parole de l'animateur."]});

PROCESSES.push({
  id: "p_resiliation", code: "1.9", title: "Résiliation", group: "propre",
  description: "Traiter une résiliation avec professionnalisme, tenter une rétention et clôturer le dossier.",
  responsables: ["Directeur du Développement"], acteurs: ["Responsable de club"],
  contributeurs: ["Comptable"],
  frequence: "À la demande", outils: ["Zoho", "WhatsApp"],
  livrables: ["Posture pour accompagner la sortie ", "Mail type "],
  annexes: [4, 5],
  objectif: "Traiter chaque demande de résiliation avec professionnalisme, tenter une rétention et clôturer le dossier en coordination avec Finance.",
  etapes: [
    { titre: "1. Réceptionner la demande", acteur: "Responsable de club", points: [
      "Accusé de réception sous 24h, noté dans Zoho. ⚠️ Jamais de validation par simple retour de mail — entretien préalable requis.",
    ]},
    { titre: "2. Organiser un entretien de rétention", acteur: "Responsable de club", points: [
      "Comprendre les raisons réelles, proposer une solution (pause, formule allégée, parrain). Posture : Annexe 5.",
    ]},
    { titre: "3. Traiter administrativement la sortie", acteur: "Responsable de club", points: [
      "Préavis, date de sortie, désactivation des accès, badge récupéré, archivage Zoho + action « perdu », MAJ des fichiers Excel, WhatsApp « membres » → « prospects ».",
    ]},
    { titre: "4. Coordonner le versement des avoirs", acteur: "Responsable de club / Comptable", points: [
      "Suivi des avoirs lors du point hebdomadaire avec le pôle Finance.",
    ]},
    { titre: "5. Envoyer le mail de confirmation", acteur: "Responsable de club", points: ["Mail type : Annexe 4."] },
  ]});

PROCESSES.push({
  id: "p_renouvellement", code: "1.10", title: "Renouvellement de la cotisation", group: "propre",
  description: "Assurer le renouvellement de l'adhésion jusqu'au paiement.",
  responsables: ["Directeur du Développement"], acteurs: ["Responsable de club"],
  contributeurs: ["Comptable"],
  frequence: "Tous les 1ers du mois", outils: ["Zoho", "Zoho Analytics"],
  livrables: ["Exemple de mail de renouvellement "],
  annexes: [6, 14, 15],
  objectif: "Assurer le renouvellement de l'adhésion du membre au sein du club, jusqu'au paiement.",
  etapes: [
    { titre: "1. Vérifier les cotisations à échéance (M-2)", acteur: "Responsable de club", points: [
      "Tous les 1ers du mois. Mail auto listant les sociétés à renouveler (cf. Annexes 14 et 15 pour trouver les membres).",
    ]},
    { titre: "2. Visiter le membre concerné", acteur: "Responsable de club", points: [
      "Visite terrain prioritaire + revue de partenariat. Compte-rendu CRM, qualification du dossier (renouvellement / perdu).",
      "⚠️ Un dossier non passé en « perdu » peut générer une facture à tort.",
    ]},
    { titre: "3. Relance par mail (facultatif)", acteur: "Responsable de club", points: ["En complément d'un appel, après une visite, ou sans réponse. Mails types : Annexe 6."] },
    { titre: "4a. Si renouvellement : facturer et suivre", acteur: "Responsable de club / Comptable", points: [
      "Facture envoyée par le Responsable de club (jamais la compta), suivi du paiement par le Comptable.",
    ]},
    { titre: "4b. Si non-renouvellement : MAJ", acteur: "Responsable de club", points: [
      "Action commerciale en « perdu », motif dans le CRM, éviter la facture auto.",
    ]},
  ]});

/* =========================================================================
   PARCOURS 2 — ORGANISATION D'UN DÉJEUNER
   ⚠️ Dans le cadre des clubs franchisés, le « Responsable de club » est
   remplacé par le « Manager de club franchisé ».
   ========================================================================= */

PROCESSES.push({
  id: "d_reservation", code: "2.1", title: "Réservation des lieux et des prestations", group: "dejeuner",
  description: "Réserver les lieux et prestations le plus rapidement possible.",
  responsables: ["Responsable de club"], acteurs: ["Responsable de club"],
  contributeurs: [],
  frequence: "Annuel", outils: ["Fixer l'agenda", "Site : Manuel Opératoire Business Club"],
  livrables: ["Management visuel"],
  annexes: [],
  objectif: "Réserver les prestations le plus rapidement possible.",
  etapes: [
    { titre: "1. Fixer l'agenda des déjeuners de l'année", acteur: "Responsable de club", points: ["Toutes les dates sont planifiées en amont."] },
    { titre: "2. Appeler les lieux pour les réserver", acteur: "Responsable de club", points: ["Contacter les lieux pressentis pour vérifier leur disponibilité ; transmettre le cahier des charges au lieu retenu."] },
    { titre: "3. Réceptionner et vérifier le devis", acteur: "Responsable de club", points: ["⚠️ Déposer le devis et les documents dans le dossier commun partagé de la rencontre."] },
    { titre: "4. Renseigner le tableau de pilotage et archiver le devis", acteur: "Responsable de club", points: ["Tableau « BUSINESS CLUB – Pilotage des clubs en propre » (dossier COMMERCE / BACK OFFICE) + tableau en salle de réunion."] },
    { titre: "5. En cas de nouveau lieu, le visiter", acteur: "Responsable de club", points: ["Vérifier la conformité au cahier des charges et la disponibilité du matériel."] },
    { titre: "6. Réserver les prestations rapidement", acteur: "Responsable de club", points: ["Confirmer la salle, bon de commande traiteur, briefer le photographe, vérifier le programme intervenant.", "⚠️ Manuel Opératoire envoyé au lieu au plus tard à J-7."] },
    { titre: "7. Partager le cahier des charges à respecter", acteur: "Responsable de club", points: [] },
  ]});

PROCESSES.push({
  id: "d_planif_intervenant", code: "2.2", title: "Planification de l'intervenant", group: "dejeuner",
  description: "Planifier un intervenant pertinent et disponible pour chaque déjeuner, cohérent avec le thème et la date.",
  responsables: ["Responsable de club"], acteurs: ["Responsable Intervenants"],
  contributeurs: ["Directeur du Développement", "Animateur du club"],
  frequence: "Chaque déjeuner ou annuellement", outils: ["Application « historique intervenants »", "Zoho", "My Business Club Manager"],
  livrables: ["Mail de confirmation ", "Bon de commande ", "Fichier de pilotage club x intervenant ", "Modalité Facturation Intervenant "],
  annexes: [],
  objectif: "Planifier un intervenant pertinent et disponible pour chaque déjeuner, en garantissant la cohérence entre le thème, la date et le profil.",
  etapes: [
    { titre: "1. Définir et transmettre les thèmes par club", acteur: "Responsable de club", points: ["Définir les thèmes (par déjeuner ou en bloc annuel) et les transmettre avec la date au Responsable Intervenants. ⚠️ En amont pour garantir le meilleur profil."] },
    { titre: "2. Sourcer un profil adapté", acteur: "Responsable Intervenants", points: ["Vérifier l'historique (éviter doublons, diversifier, équilibre H/F), le budget (~15 K€ / club), le modèle achat-revente.", "⚠️ Intervenants locaux : gratuité, ne pas cocher « Existant dans Book », zone « Local »."] },
    { titre: "3. Confirmer l'intervenant et passer commande", acteur: "Responsable Intervenants", points: ["Mail à l'intervenant (⚠️ trace écrite : date + club). Deux circuits : sourcé localement (agence en copie) ou vendu par BO2."] },
    { titre: "4. Envoyer / signer le bon de commande (club franchisé)", acteur: "Responsable Intervenants / Manager de club franchisé", points: ["Le Manager de club franchisé signe le bon de commande, ce qui déclenche la création de l'invitation sur My Business Manager."] },
  ]});

PROCESSES.push({
  id: "d_logistique_rencontre", code: "2.3", title: "Planification logistique rencontre", group: "dejeuner",
  description: "Assurer un déroulé fluide de la rencontre, de la réservation des prestataires à l'accueil le jour J.",
  responsables: ["Responsable de club"], acteurs: ["Responsable de club"],
  contributeurs: ["Responsable commercial grands comptes"],
  frequence: "À chaque rencontre", outils: ["Zoho (Backstage, Analytics)"],
  livrables: ["Checklist pré-event", "Tableau de bord utilisation voiture "],
  annexes: [],
  objectif: "Assurer un déroulé fluide et professionnel de chaque rencontre, de la réservation des prestataires à l'accueil le jour J.",
  etapes: [
    { titre: "1. Estimer le nombre de participants (J-15)", acteur: "Responsable de club", points: ["Première estimation au traiteur pour le nombre de couverts."] },
    { titre: "2. Finaliser le choix des convives (J-7)", acteur: "Responsable de club", points: ["Les membres choisissent 3 personnes avec qui déjeuner ; nombre définitif confirmé au traiteur."] },
    { titre: "3. Établir le plan de table (J-2)", acteur: "Responsable de club", points: ["Inscriptions dans Backstage, mixité des secteurs, places visiteurs, régimes alimentaires.", "⚠️ Identifier les pins à remettre (renouvellement / ancienneté 3 ans) via Zoho Analytics."] },
    { titre: "4. Briefer les prestataires (J-2)", acteur: "Responsable de club", points: ["Traiteur (heure de mise en place, allergies), photographe (personnes clés, prises de vue)."] },
    { titre: "5. Check pré-event (J-1 / matin J)", acteur: "Responsable de club", points: ["Checklist matériel (mode opératoire). Vigilance : slides Private Business/Business Events, photocalls, nappes.", "Transport : Kangoo si disponible (remplir le tableau de bord)."] },
  ]});

PROCESSES.push({
  id: "d_logistique_intervenant", code: "2.4", title: "Planification logistique intervenant", group: "dejeuner",
  description: "Finaliser la rencontre dans Zoho et organiser la logistique de déplacement de l'intervenant.",
  responsables: ["Responsable Intervenants"], acteurs: ["Responsable Intervenants"],
  contributeurs: ["Responsable de club", "Animateur du club"],
  frequence: "À chaque rencontre", outils: ["Zoho", "Serveur franchisé", "Smash"],
  livrables: ["Mail de go between intervenant x Resp. Club ", "Support de présentation (~20 slides) ", "La minute (10 questions) ", "Bande annonce "],
  annexes: [9],
  objectif: "Finaliser la rencontre dans Zoho et organiser la logistique de déplacement de l'intervenant.",
  etapes: [
    { titre: "1. Demander le mode de transport souhaité (M-2)", acteur: "Responsable Intervenants", points: ["⚠️ Préférences variables : autonome, taxi (Sakil / réseau V9), ou prise en charge intégrale par BO2."] },
    { titre: "2. Réserver et transmettre le billet", acteur: "Responsable Intervenants", points: ["Envoi par mail ou WhatsApp."] },
    { titre: "3. Renseigner les horaires dans la rencontre Zoho", acteur: "Responsable Intervenants", points: [] },
    { titre: "4. Envoyer le Go-Between (~J-45)", acteur: "Responsable Intervenants", points: ["Mail de mise en relation Manager local ↔ intervenant (détail en Annexe 9). ⚠️ Prérequis : bon de commande signé."] },
    { titre: "5. Déposer les documents (1 semaine avant)", acteur: "Responsable Intervenants", points: ["Sur le serveur (franchisé) : Ppt 20 slides, bande annonce (Word), « la minute » (10 questions)."] },
  ]});

PROCESSES.push({
  id: "d_communication", code: "2.5", title: "Communication", group: "dejeuner",
  description: "Orchestrer la communication du déjeuner (détail dans la Ressource Communication).",
  responsables: ["Community manager"], acteurs: ["Responsable de club"],
  contributeurs: ["Agence 360"],
  frequence: "À chaque rencontre", outils: ["Zoho", "My Business Club Manager", "LinkedIn", "WhatsApp"],
  livrables: ["Invitations, relances, plan de table, carte postale, galerie"],
  annexes: [], linkComm: true,
  objectif: "Orchestrer la communication complète d'un déjeuner (création, invitations, relances, plan de table, carte postale). Détail regroupé dans la Ressource « Communication »."});

PROCESSES.push({
  id: "d_inscriptions", code: "2.6", title: "Gestion des inscriptions", group: "dejeuner",
  description: "Gérer les inscriptions des participants à la rencontre.",
  responsables: ["Responsable de club"], acteurs: ["Responsable de club"],
  contributeurs: [],
  frequence: "À chaque rencontre", outils: ["Zoho", "apps Business Club"], livrables: [],
  annexes: [10, 11, 12],
  objectif: "Gérer et suivre les inscriptions des participants au déjeuner.",
  notes: ["Suivi des présences : invitations et relances Outlook (Annexes 10, 11, 12). Viser 90% d'inscrits confirmés à J-7."]});

PROCESSES.push({
  id: "d_invites", code: "2.7", title: "Gestion des invités & visiteurs", group: "dejeuner",
  description: "Suivre les invités et visiteurs du déjeuner jusqu'au closing.",
  responsables: ["Directeur du Développement"], acteurs: ["Responsable de club"],
  contributeurs: ["Animateur du club"],
  frequence: "À chaque rencontre", outils: [],
  livrables: ["Badge visiteur", "Fiche qualification visiteur"],
  annexes: [],
  objectif: "Suivre les invités du déjeuner jusqu'au closing.",
  etapes: [
    { titre: "1. Appeler le visiteur avant de l'inscrire (J-3)", acteur: "Responsable de club", points: ["Recueillir : comment il a connu le réseau, son profil (prestataire / donneur d'ordre…), la taille de l'entreprise.", "⚠️ Une seule venue en tant que visiteur (idem membres Business Time, sauf déjeuners communs)."] },
    { titre: "2. Accueillir le visiteur (jour J)", acteur: "Responsable de club", points: ["Badge spécifique, placé près d'un membre du Comité des Sages ou d'un Ambassadeur.", "⚠️ Rôle de l'ambassadeur : validation en attente avec le Directeur du Développement."] },
    { titre: "3. Suivi post-déjeuner (J+1)", acteur: "Responsable de club", points: ["Appel pour le ressenti ; si intérêt confirmé, proposer une date de présentation de l'offre ou le devis."] },
  ]});

PROCESSES.push({
  id: "d_tenue", code: "2.8", title: "Tenue de l'évènement", group: "dejeuner",
  description: "Assurer le bon déroulé du déjeuner, de la mise en place à la fin de l'intervention.",
  responsables: ["Animateur du club"], acteurs: ["Responsable de club"],
  contributeurs: ["Responsable commercial grands comptes"],
  frequence: "À chaque rencontre", outils: [],
  livrables: ["Badges nominatifs, cartes photo", "Cahier des charges (déroulé du déjeuner)"],
  annexes: [],
  objectif: "Assurer le bon déroulé d'un déjeuner, de la mise en place jusqu'à la fin de l'intervention.",
  etapes: [
    { titre: "1. Mettre en place l'évènement (8h le jour J)", acteur: "Responsable de club", points: ["Arrivée 3-4h avant (voire la veille). ⚠️ Deux flammes à disposer à l'entrée."] },
    { titre: "2. Accueillir les participants", acteur: "Responsable de club / Animateur du club", points: ["Badges nominatifs, placement, présentation de l'intervenant, cartes photo."] },
    { titre: "3. Suivre le déroulé", acteur: "Animateur du club", points: ["Déroulé type : 11h00 salle prête · 11h45 apéritif · 12h30 début intervention (mot du président) · 12h40 nouveaux membres & pins · 12h50 tour de table · 13h15 intervention · 14h07 fin. ⚠️ Timing variable."] },
  ]});

PROCESSES.push({
  id: "d_suivi", code: "2.9", title: "Suivi post évènement", group: "dejeuner",
  description: "Qualifier les absences, mettre à jour le CRM et déclencher les actions de suivi.",
  responsables: ["Directeur du Développement"], acteurs: ["Responsable de club"],
  contributeurs: [],
  frequence: "À chaque rencontre + suivi mensuel", outils: ["Zoho"],
  livrables: ["Suivi des actions "],
  annexes: [13],
  objectif: "Analyser les suites d'une rencontre : qualifier les absences, mettre à jour le CRM, déclencher les actions et améliorer l'animation.",
  etapes: [
    { titre: "1. Identifier les inscrits absents", acteur: "Responsable de club", points: ["Repérer les inscrits non venus pour les contacter en priorité."] },
    { titre: "2. Recontacter absents et visiteurs", acteur: "Responsable de club", points: ["Appel J+1/J+2 : comprendre l'absence, rappeler que l'inscription engage."] },
    { titre: "3. Recueillir les retours utiles", acteur: "Responsable de club", points: ["Attentes non couvertes, besoins business, difficultés, motifs de désengagement. QR code recommandé (non déployé)."] },
    { titre: "4. Mettre à jour le CRM", acteur: "Responsable de club", points: ["Compte-rendu, motifs, besoins, suites (Annexe 13). ⚠️ Qualité de remplissage essentielle."] },
    { titre: "5. Déclencher et piloter les actions", acteur: "Responsable de club / Directeur du Développement", points: ["Tâche, rappel, RDV, visite ; suivi lors d'un bilan mensuel animé par le Directeur du Développement."] },
  ]});

/* =========================================================================
   PARCOURS 3 — GESTION D'UN CLUB FRANCHISÉ
   ========================================================================= */

PROCESSES.push({
  id: "f_admission", code: "3.1", title: "Parcours admission candidat", group: "franchise",
  description: "Conduire le candidat de la prise de contact à la signature du contrat de franchise et au lancement (inclut le dossier d'offre).",
  responsables: ["Responsable Réseau"], acteurs: ["Responsable Réseau"],
  contributeurs: ["Directeur du Développement", "RAF", "Franchisé du board"],
  frequence: "À chaque demande", outils: ["Zoho"],
  livrables: ["Étude de marché ", "BP paramétrable ", "NDA, DIP, Contrat de franchise "], annexes: [],
  objectif: "Conduire le candidat de la prise de contact jusqu'à la signature du contrat de franchise et le lancement de son club.",
  etapes: [
    { titre: "1er contact (J-120) & NDA (J-118)", acteur: "Responsable Réseau / Directeur du Développement", points: [
      "Échange confidentiel sans engagement (compatibilité projet / personne).",
      "Dossier remis sous NDA + présentation « devenir franchisé » : présentation BO2 & positionnement, synthèse territoire & offre membre, droits/redevances/services, modèle économique 4 ans, méthode opérationnelle & recrutement (ex. document 3.01.02 - Offre franchise Reims)." ] },
    { titre: "Déjeuner découverte (J-110)", acteur: "Responsable Réseau", points: ["Le candidat vit un déjeuner de l'intérieur ; feedback recueilli."] },
    { titre: "BP candidat (J-100) & DIP (J-95)", acteur: "Responsable Réseau", points: [
      "Soutenance du BP devant un comité de sélection (6 sessions/an, grille commune). ⚠️ Confronter les hypothèses aux bilans réels des franchisés.",
      "Signature du DIP (Loi Doubin, 20 j avant contrat)." ] },
    { titre: "Contrat (J-90) & formation initiale (J-60)", acteur: "Responsable Réseau", points: ["Signature du contrat + droits d'entrée. Formation initiale de 3 jours au siège. ⚠️ Archiver les documents dans la fiche de la franchise (Zoho)."] },
    { titre: "Inauguration (J-30) & 1er déjeuner (J)", acteur: "Responsable Réseau", points: [
      "Inauguration avec l'appui de BO2 ; 1er déjeuner officiel (rentrée septembre ou début janvier).",
      "⚠️ Ne pas ouvrir un club sans un minimum de membres/contacts : une inauguration précipitée est une cause fréquente de fermeture." ] },
  ]});

PROCESSES.push({
  id: "f_deploiement_it", code: "3.2", title: "Déploiement IT du club", group: "franchise",
  description: "Prise en charge technique complète d'un club, du paramétrage Zoho à la clôture des anciens outils.",
  responsables: ["Responsable IT"],
  acteurs: ["Anecca", "Les fabricants", "Chef projet IT", "Responsable IT", "Agence 360", "RAF"],
  contributeurs: ["Responsable Réseau", "Manager de club franchisé"],
  frequence: "En amont de la formation", outils: ["Zoho", "Stripe", "Silvertool", "Pappers"],
  livrables: ["Guide utilisateur nouvelle app "], annexes: [],
  objectif: "Assurer la prise en charge technique complète d'un nouveau club, du paramétrage initial de l'environnement Zoho jusqu'à la clôture des anciens outils.",
  children: ["it_param", "it_migration", "it_formation", "it_cloture"]});
PROCESSES.push({
  id: "it_param", title: "1. Paramétrage des accès et outils Zoho", group: "it_sub", parent: "f_deploiement_it",
  description: "Préparer l'environnement technique complet du club (accès, Zoho, outils Agence 360).",
  responsables: ["Responsable IT"], acteurs: ["Anecca", "Chef projet IT", "RAF"],
  contributeurs: ["Responsable Réseau", "Manager de club franchisé"],
  frequence: "En amont de la formation", outils: ["Zoho", "Stripe"], livrables: ["Licences et droits utilisateurs", "Environnement testé"], annexes: [],
  objectif: "Préparer l'environnement technique complet du club avant toute migration ou formation.",
  etapes: [
    { titre: "Créer licences et droits utilisateurs", acteur: "Anecca / Chef projet IT / RAF", points: ["Prérequis (validés par le Directeur Réseau) : contrat signé, date d'ouverture, liste des utilisateurs. Licences Zoho achetées auprès d'Anecca ; le Chef de projet IT transfère les demandes au RAF (mail @business-club-group.com)."] },
    { titre: "Configurer Zoho + modules", acteur: "Anecca / Chef projet IT", points: ["Rôles (Admin, Manager, Middle Office, Comptable). Books, Campaigns, Backstage, Desk, Analytics. ⚠️ Template relance impayés dans Books. ⚠️ Ouverture d'accès validée par un référent habilité."] },
    { titre: "Paramétrer les accès Agence 360", acteur: "Agence 360", points: ["Accès MyBusinessClubManager, serveur Business Club Agence 360, page LinkedIn du club."] },
    { titre: "Connecter Stripe & tester", acteur: "Chef projet IT", points: ["Billetterie Stripe, test de paiement de bout en bout, vérification de chaque module avec un cas réel avant migration."] },
  ]});
PROCESSES.push({
  id: "it_migration", title: "2. Reprise et migration des données", group: "it_sub", parent: "f_deploiement_it",
  description: "Reprendre l'historique du club dans les nouveaux outils sans perte de données (nouveau club non concerné).",
  responsables: ["Responsable IT"], acteurs: ["Anecca", "Chef projet IT", "Les fabricants"],
  contributeurs: ["Responsable Réseau", "Manager de club franchisé"],
  frequence: "Si reprise", outils: ["Silvertool", "Zoho", "Pappers"], livrables: ["Historique migré, données membres importées"], annexes: [],
  objectif: "Reprendre l'historique du club dans les nouveaux outils sans perte de données.",
  etapes: [
    { titre: "Exporter et importer les membres", acteur: "Anecca / Chef projet IT", points: ["Export des anciens outils (Silvertool via MSI, MyBusinessManager). Import Zoho : nom, société, secteur (⚠️ vérifier), Pappers possible. ⚠️ Plans de table historiques non repris."] },
    { titre: "Paramétrer site & app + valider", acteur: "Chef projet IT / Les fabricants / Manager de club franchisé", points: ["Logos, photos, couleurs, contenu. Validation des données clés par le Manager de club franchisé avant la formation."] },
  ]});
PROCESSES.push({
  id: "it_formation", title: "3. Formation des équipes", group: "it_sub", parent: "f_deploiement_it",
  description: "Former les équipes du club aux outils (voir aussi 3.4 Formation).",
  responsables: ["Responsable IT"], acteurs: ["Responsable IT"], contributeurs: [],
  frequence: "En amont du go-live", outils: ["Zoho"], livrables: ["Équipes formées"], annexes: [],
  objectif: "Former les équipes du club à l'environnement Zoho avant le go-live. ⚠️ Ne jamais former sur un environnement vide.",
  notes: ["Le détail du programme est décrit dans le processus 3.4 Formation."]});
PROCESSES.push({
  id: "it_cloture", title: "4. Clôture des anciens outils", group: "it_sub", parent: "f_deploiement_it",
  description: "Fermer les anciens outils dans le bon ordre, sans perte de données (nouveau club non concerné).",
  responsables: ["Responsable IT"], acteurs: ["Responsable de club", "Chef projet IT", "Responsable IT", "Agence 360"],
  contributeurs: ["Responsable Réseau", "Manager de club franchisé"],
  frequence: "Après migration", outils: ["Silvertool", "Mailjet"], livrables: ["Anciens outils clôturés"], annexes: [],
  objectif: "Fermer les anciens outils dans le bon ordre, sans perte de données ni confusion pour le club.",
  etapes: [
    { titre: "Vérifier la migration puis fermer", acteur: "Responsable de club / Chef projet IT / Agence 360", points: ["Ne jamais couper avant confirmation des données dans Zoho. Ancien site (redirection), Mailjet, Silvertool."] },
    { titre: "Fermer Silvertool (préavis)", acteur: "Responsable IT", points: ["Licence annuelle renouvelée en janvier : ⚠️ envoyer le préavis 3 mois avant, soit en octobre. Exporter une archive (conservée ≥ 6 mois)."] },
    { titre: "Informer le club", acteur: "Chef projet IT", points: ["Communiquer chaque coupure (date, outil fermé, remplacement)."] },
  ]});

PROCESSES.push({
  id: "f_manop", code: "3.3", title: "Mise à jour MANOP", group: "franchise",
  description: "Tenir le MANOP à jour et garantir que chaque manager dispose de la version à jour.",
  responsables: ["Responsable Réseau"], acteurs: ["Responsable Réseau"], contributeurs: ["Manager de club franchisé"],
  frequence: "En continu", outils: ["Mode opératoire en ligne actualisé"], livrables: ["MANOP à jour"], annexes: [],
  objectif: "Tenir le MANOP à jour et garantir que chaque manager de club franchisé dispose en continu de la version à jour.",
  etapes: [
    { titre: "Identifier le besoin & rédiger la MAJ", acteur: "Responsable Réseau", points: ["Toute évolution du concept déclenche une MAJ. Deux moments : avant chaque formation, et annuellement en juillet. ⚠️ Volets événementiels à obtenir de la Direction du Développement."] },
    { titre: "Notifier les managers", acteur: "Responsable Réseau", points: ["Diffusion à tous les managers (accès acquis via la formation)."] },
    { titre: "Vérifier l'appropriation en visite terrain", acteur: "Responsable Réseau", points: ["⚠️ Écarts corrigés en accompagnement, jamais en sanction."] },
  ],
  notes: ["Différence MANORG (interne BO2, book des processus) vs MANOP (destiné aux franchisés, autonomie de bout en bout). À ne pas confondre."]});

PROCESSES.push({
  id: "f_formation", code: "3.4", title: "Formation", group: "franchise",
  description: "Rendre le franchisé opérationnel dès l'ouverture, en une semaine (métier, outils, organisation).",
  responsables: ["Responsable Réseau"], acteurs: ["Responsable Réseau"],
  contributeurs: ["Directeur du Développement", "Agence 360", "RAF", "Responsable IT", "Responsable Intervenants"],
  frequence: "À chaque demande", outils: ["Accès aux apps, PC"],
  livrables: ["Supports de formation ", "Feuille d'émargement ", "Suivi des formations dispensées "], annexes: [],
  objectif: "Préparer le nouveau franchisé à être opérationnel dès l'ouverture, en couvrant métier, outils et organisation en une semaine.",
  etapes: [
    { titre: "Valider les prérequis", acteur: "Responsable Réseau", points: ["⚠️ Logins créés, environnement configuré et données migrées avant. Le franchisé apporte son PC. ⚠️ Faire signer la feuille d'émargement chaque jour."] },
    { titre: "Lundi — réseau & mode opératoire", acteur: "Directeur du Développement / Responsable Réseau", points: ["Développement réseau (concurrence), MANOP, installation des logiciels."] },
    { titre: "Mardi — Zoho", acteur: "Responsable IT / RAF", points: ["CRM, Books & Campaigns, Backstage & Stripe, Desk."] },
    { titre: "Mercredi — Business Time, Agence 360, intervenants", acteur: "Agence 360 / Responsable Intervenants", points: ["Gabarits, LinkedIn, plan de com', programmation des 3 premiers déjeuners."] },
    { titre: "Jeudi & vendredi — rencontres en réel", acteur: "Responsable Réseau", points: ["Participation active à 2 rencontres (observer, assister, co-animer)."] },
    { titre: "Clôturer la semaine", acteur: "Responsable Réseau", points: ["Remise des feuilles process. Compléter le fichier de suivi de l'onboarding."] },
  ]});

PROCESSES.push({
  id: "f_kit", code: "3.5", title: "Remise du kit de lancement", group: "franchise",
  description: "Fournir au franchisé tous les supports physiques et digitaux nécessaires à l'ouverture.",
  responsables: ["Responsable Réseau"], acteurs: ["Responsable Réseau", "Agence 360"], contributeurs: ["RAF"],
  frequence: "Pendant la formation", outils: ["Zoho", "Référentiel Achat"],
  livrables: ["Référentiel Achat  (ébauche en cours)", "Fiche d'onboarding "], annexes: [],
  objectif: "Fournir au nouveau franchisé l'ensemble des supports physiques et digitaux nécessaires à l'ouverture de son club.",
  etapes: [
    { titre: "Créer l'identité digitale", acteur: "Agence 360", points: ["Logo, site, LinkedIn, masques PPT, gabarits posts, groupes WhatsApp, vidéos. ⚠️ Le siège reste administrateur de tous les comptes."] },
    { titre: "Créer & commander les supports marketing", acteur: "Agence 360 / RAF / Responsable Réseau", points: ["Badges, chevalets, stand parapluie, oriflamme, triptyques, cartons photo, book, kakémono. ⚠️ Objectif kit « clé en main »."] },
    { titre: "Remettre & valider le kit complet", acteur: "Responsable Réseau", points: ["Remis pendant la formation (idéalement jeudi). Checklist signée par le franchisé. Compléter la partie KIT du fichier d'onboarding."] },
  ],
  notes: ["⚠️ État réel : le référentiel achats centralisé n'existe pas encore ; la commande passe par l'agence 360 (4 intermédiaires), à un tarif au minimum deux fois supérieur au marché."]});

PROCESSES.push({
  id: "f_inauguration", code: "3.6", title: "Soirée d'inauguration", group: "franchise",
  description: "Organiser l'inauguration et le premier déjeuner officiel du franchisé.",
  responsables: ["Responsable Réseau"], acteurs: ["Responsable Réseau", "Directeur du Développement", "DRH"],
  contributeurs: ["Manager de club franchisé", "Franchisé voisin"],
  frequence: "À chaque ouverture de club", outils: ["Kit de lancement complet"], livrables: ["Support de présentation Inauguration "], annexes: [],
  objectif: "Organiser l'inauguration du club et le premier déjeuner officiel du franchisé, en capitalisant sur l'expérience des précédentes ouvertures.",
  etapes: [
    { titre: "Réceptionner et préparer les supports", acteur: "Responsable Réseau", points: ["Kit le plus complet possible, mise à jour du support d'inauguration (chiffres, membres)."] },
    { titre: "Co-organiser l'événement", acteur: "Responsable Réseau", points: ["Logistique (lieu, format, invités) avec le formateur réseau."] },
    { titre: "Assurer la présence réseau le jour J", acteur: "Directeur du Développement / DRH", points: ["Présence physique ; un franchisé voisin et des membres de clubs voisins peuvent apporter leur témoignage."] },
    { titre: "Capitaliser l'expérience", acteur: "Responsable Réseau", points: ["Rapport de visite + plan d'action. Lien avec 3.8 Visite terrain (suivi des retombées : rappels, adhésions)."] },
  ]});

PROCESSES.push({
  id: "f_dejeuner", code: "3.7", title: "Organisation déjeuner", group: "franchise",
  description: "Organisation des déjeuners du club franchisé (voir le parcours « Organisation d'un évènement »).",
  responsables: ["Manager de club franchisé"], acteurs: ["Manager de club franchisé"], contributeurs: [],
  frequence: "À chaque rencontre", outils: [], livrables: ["Cf. process concerné"], annexes: [], linkDejeuner: true,
  objectif: "L'organisation des déjeuners d'un club franchisé suit le parcours « Organisation d'un évènement » (le Responsable de club y est remplacé par le Manager de club franchisé)."});

PROCESSES.push({
  id: "f_visite_terrain", code: "3.8", title: "Visite terrain", group: "franchise",
  description: "Maintenir la qualité et la conformité du réseau via des visites structurées (audit 50 points).",
  responsables: ["Responsable Réseau"], acteurs: ["Responsable Réseau"], contributeurs: ["Manager de club franchisé"],
  frequence: "Annuelle", outils: ["Zoho"], livrables: ["Grille d'audit ", "Note de conformité"], annexes: [],
  objectif: "Maintenir un niveau de qualité et de conformité élevé grâce à des visites structurées et un audit des 50 points de contrôle.",
  etapes: [
    { titre: "Visite 1er déjeuner & inauguration (1ère année)", acteur: "Responsable Réseau", points: ["Accompagner le franchisé (accueil, plan de table, présentation intervenant, gestion du stress). Audit 50 points. ⚠️ 1ère année uniquement pour éviter les dérives."] },
    { titre: "Visite à 6 mois", acteur: "Responsable Réseau", points: ["Audit via la grille des 50 points de contrôle."] },
    { titre: "Visite annuelle", acteur: "Responsable Réseau", points: ["Audit complet (logistique, outils, satisfaction, standards). Note de conformité à la direction."] },
    { titre: "Visite corrective si alerte + compte-rendu", acteur: "Responsable Réseau", points: ["En cas de non-conformité : visite corrective + accompagnement commercial. Compte-rendu sous 48h, archivé dans Zoho."] },
  ]});

PROCESSES.push({
  id: "f_accompagnement", code: "3.9", title: "Plan accompagnement commercial", group: "franchise",
  description: "Soutenir les franchisés en difficulté ou en développement pour atteindre leurs objectifs.",
  responsables: ["Responsable Réseau"], acteurs: ["Responsable Réseau"], contributeurs: ["Manager de club franchisé"],
  frequence: "Au besoin", outils: ["Zoho"], livrables: ["Plan d'action", "Bonnes pratiques documentées"], annexes: [],
  objectif: "Soutenir activement les franchisés en difficulté ou en développement pour atteindre et maintenir leurs objectifs de membres et de CA.",
  etapes: [
    { titre: "Diagnostic commercial", acteur: "Responsable Réseau", points: ["Grille d'audit + seuil de rentabilité + entretien diagnostic. ⚠️ Cibler en priorité les clubs en souffrance."] },
    { titre: "Élaborer le plan d'action", acteur: "Responsable Réseau", points: ["Plan sur 4 à 8 semaines co-construit (objectifs, actions, délais), signé par le Manager."] },
    { titre: "Mettre en œuvre les actions", acteur: "Responsable Réseau", points: ["Co-animation, flyers/triptyques, accompagnement terrain physique. ⚠️ L'efficacité dépend de l'investissement réel du franchisé (souvent : manque de temps de prospection)."] },
    { titre: "Suivre, ajuster & clôturer", acteur: "Responsable Réseau", points: ["Point hebdo de 30 min ; clôture si objectifs atteints, sinon escalade vers la direction."] },
  ]});

PROCESSES.push({
  id: "f_resiliation", code: "3.10", title: "Résiliation (fermeture d'un club)", group: "franchise",
  description: "Traiter la fermeture d'un club franchisé et clôturer le dossier (checklist offboarding).",
  responsables: ["Responsable Réseau"],
  acteurs: ["Responsable Réseau", "RAF", "Agence 360", "Responsable IT", "Directeur du Développement"],
  contributeurs: ["Manager de club franchisé"],
  frequence: "À la demande", outils: ["Zoho", "WhatsApp", "LinkedIn"], livrables: ["Checklist offboarding "], annexes: [],
  objectif: "Traiter chaque fermeture de club avec professionnalisme et clôturer le dossier en coordination avec Finance.",
  etapes: [
    { titre: "Désactiver accès et outils internes", acteur: "Responsable Réseau / Responsable IT / Agence 360", points: ["Accès Zoho / Zoho Books (Resp. IT), catalogue intervenants (Resp. IT), serveur Agence 360 & MyBusinessClubManager (Agence 360), manuel opératoire, mot de passe Nomination."] },
    { titre: "Archiver, MAJ site & récupérer les PLV", acteur: "Responsable Réseau / Agence 360", points: ["Archiver la fiche club (Zoho), retrait du club sur le site/carte, récupérer PLV et supports physiques."] },
    { titre: "Traitement financier", acteur: "RAF", points: ["Arrêter la facturation, réaliser le solde de tout compte, vérifier les sommes dues (redevances, factures intervenants)."] },
    { titre: "Gérer litiges, avoirs & continuité membres", acteur: "Responsable Réseau / Directeur du Développement", points: ["⚠️ Inviter chaque membre à basculer vers une autre franchise ; router les mails vers le manager voisin. Registre des litiges recommandé."] },
    { titre: "Valider et signer la clôture (offboarding)", acteur: "Responsable Réseau", points: ["Signature conjointe sur la fiche d'offboarding (vaut arrêté des comptes). Détail intégré à la checklist d'offboarding franchise."] },
  ]});

PROCESSES.push({
  id: "f_renouvellement", code: "3.11", title: "Renouvellement du contrat", group: "franchise",
  description: "Anticiper l'échéance des contrats de franchise pour sécuriser leur renouvellement.",
  responsables: ["Responsable Réseau"], acteurs: ["Responsable Réseau", "Cabinet d'avocat"], contributeurs: [],
  frequence: "6 mois avant fin du contrat", outils: ["Zoho"], livrables: ["Suivi des échéances", "Contrat actualisé"], annexes: [],
  objectif: "Anticiper l'échéance des contrats de franchise pour sécuriser leur renouvellement, en s'appuyant sur la performance réelle du club.",
  etapes: [
    { titre: "Suivre l'échéancier des contrats", acteur: "Responsable Réseau", points: ["Suivi des échéances dans Zoho."] },
    { titre: "Déclencher l'alerte de relance", acteur: "Responsable Réseau", points: ["Relancer le franchisé 6 mois avant l'échéance."] },
    { titre: "Réviser le contrat", acteur: "Responsable Réseau / Cabinet d'avocat", points: ["Revue annuelle des termes (rappel calendaire en septembre)."] },
    { titre: "Décider & formaliser", acteur: "Responsable Réseau", points: ["⚠️ Renouvellement non automatique : conditionné à la performance (note de conformité, historique d'accompagnement)."] },
  ]});

/* =========================================================================
   PARCOURS 4 — FONCTIONS TRANSVERSES
   (catalogue par sous-domaine : Support opérationnel, RH, Juridique & conformité,
    IT, Gouvernance & pilotage)
   ========================================================================= */

PROCESSES.push({
  id: "t_prestataires", code: "4.1", title: "Gestion des prestataires, fournisseurs et multi technique", group: "transverse", sousGroupe: "Support opérationnel",
  description: "Consolider et piloter les prestataires, fournisseurs et le référentiel achats.",
  responsables: ["RAF"], acteurs: ["RAF"], contributeurs: ["Directeur du Développement"],
  frequence: "En continu", outils: ["Zoho Books"], livrables: ["Référentiel fournisseurs consolidés ", "Contrats prestataires à jour ", "Référentiel achats "], annexes: [],
  objectif: "Consolider le référentiel fournisseurs et achats et tenir à jour les contrats prestataires."});
PROCESSES.push({
  id: "t_demandes_it", code: "4.2", title: "Gestion des demandes IT", group: "transverse", sousGroupe: "Support opérationnel",
  description: "Traiter et suivre les demandes et incidents IT (ticketing).",
  responsables: ["Responsable IT"], acteurs: ["Responsable IT"], contributeurs: ["Anecca", "Les fabricants"],
  frequence: "À la demande", outils: ["Zoho Desk", "Ticketing : mail Outlook", "Help desk", "Motion"], livrables: ["Suivi des demandes IT  (à mettre en place dans Zoho Desk)"], annexes: [],
  objectif: "Traiter et suivre les demandes IT via un ticketing structuré."});
PROCESSES.push({
  id: "t_batiment", code: "4.3", title: "Gestion du bâtiment", group: "transverse", sousGroupe: "Support opérationnel",
  description: "Assurer la sécurité, les baux et la maintenance du bâtiment.",
  responsables: ["RAF"], acteurs: ["RAF"], contributeurs: ["Prestataires multi techniques"],
  frequence: "En continu / revue annuelle", outils: ["Zoho"], livrables: ["Registre de sécurité ", "Suivi des contrats de bail/maintenance "], annexes: [],
  objectif: "Assurer la conformité de sécurité, le suivi des baux et de la maintenance du bâtiment."});
PROCESSES.push({
  id: "t_onboarding", code: "4.4", title: "Process RH — Onboarding d'un collaborateur", group: "transverse", sousGroupe: "Ressources Humaines",
  description: "Préparer, accueillir et intégrer un nouveau collaborateur (conformité, outils, intégration).",
  responsables: ["RAF"], acteurs: ["RAF", "DRH"], contributeurs: ["Responsable IT", "Chef projet IT", "Anecca", "Manager collaborateur"],
  frequence: "À chaque arrivée", outils: ["Silae", "Zoho"], livrables: ["Checklist onboarding "], annexes: [],
  objectif: "Préparer, accueillir et intégrer un nouveau collaborateur dans les meilleures conditions (conformité administrative, outils de travail, intégration).",
  etapes: [
    { titre: "1. Préparer l'arrivée", acteur: "RAF / DRH / BDL", points: ["Vérifier le contrat signé (DRH), collecter les pièces administratives (RIB, Vitale, identité…), réaliser la DPAE (BDL), créer le dossier administratif (BDL)."] },
    { titre: "2. Effectuer les formalités administratives", acteur: "RAF", points: ["Mutuelle/prévoyance, Registre Unique du Personnel, Médecine du Travail, création du salarié dans le logiciel de paie."] },
    { titre: "3. Préparer le poste de travail", acteur: "RAF / Euro Info", points: ["Matériel (ordinateur, écran, téléphone), installation des logiciels, vérification, préparation avant l'arrivée."] },
    { titre: "4. Créer les accès informatiques", acteur: "RAF", points: ["Adresse mail pro, Microsoft 365 (Outlook, Teams, OneDrive), logiciels métiers (CRM, Pennylane, SilverTool, Zendoc…), droits conformes au poste."] },
    { titre: "5. Accueillir le collaborateur", acteur: "Manager collaborateur", points: ["Présenter locaux et équipes, remettre le matériel, présenter outils et procédures, faire signer la fiche de remise."] },
    { titre: "6. Accompagner la prise de poste", acteur: "Manager collaborateur", points: ["Parcours d'intégration, missions et interlocuteurs, formation aux outils."] },
    { titre: "7. Finaliser l'intégration", acteur: "Manager collaborateur", points: ["Vérifier les formalités et les accès, point de suivi après quelques semaines, archiver les documents."] },
  ]});
PROCESSES.push({
  id: "t_formations", code: "4.5", title: "Gestion des formations", group: "transverse", sousGroupe: "Ressources Humaines",
  description: "Organiser et tracer les formations internes des collaborateurs.",
  responsables: ["DRH"], acteurs: ["DRH"], contributeurs: ["Directeur du Développement", "Responsable Réseau"],
  frequence: "À chaque arrivée / En continu", outils: ["Manuel opératoire", "Feuille d'émargement"], livrables: ["Suivi du nombre de formations internes ", "Feuille d'émargement ", "Checklist de formation par poste "], annexes: [],
  objectif: "Organiser et tracer les formations internes reçues par les collaborateurs."});
PROCESSES.push({
  id: "t_offboarding", code: "4.6", title: "Process RH — Offboarding (gestion des départs)", group: "transverse", sousGroupe: "Ressources Humaines",
  description: "Organiser le départ d'un collaborateur (conformité, sécurisation des accès, restitution des biens).",
  responsables: ["RAF"], acteurs: ["RAF", "DRH"], contributeurs: ["Responsable IT", "Chef projet IT", "Anecca", "Manager collaborateur"],
  frequence: "À chaque départ", outils: ["Silae", "Zoho"], livrables: ["Checklist offboarding "], annexes: [],
  objectif: "Organiser le départ d'un collaborateur en garantissant la conformité administrative, la sécurisation des accès et la restitution des biens, tout en assurant la continuité de l'activité.",
  etapes: [
    { titre: "1. Formaliser le départ", acteur: "DRH", points: ["Identifier le motif (démission, licenciement, rupture conventionnelle, fin de CDD/essai…), confirmer la date de fin, informer les services concernés."] },
    { titre: "2. Préparer les formalités administratives", acteur: "RAF", points: ["Documents de fin de contrat, MAJ du dossier, informer les organismes (mutuelle, prévoyance…), solde de tout compte avec la paie."] },
    { titre: "3. Organiser la restitution du matériel", acteur: "RAF", points: ["Recenser le matériel confié, planifier la restitution (ordinateur, téléphone, badge, clés…), vérifier l'état, faire signer la fiche."] },
    { titre: "4. Désactiver les accès", acteur: "RAF", points: ["Désactiver à la date de départ, supprimer/transférer les accès (CRM, Microsoft 365, Teams, Zendoc, SilverTool…), rediriger la messagerie, MAJ des listes de diffusion."] },
    { titre: "5. Clôturer le dossier administratif", acteur: "RAF", points: ["Certificat de travail, reçu pour solde de tout compte, attestation France Travail, remise des documents obligatoires."] },
    { titre: "6. Assurer la continuité de l'activité", acteur: "RAF", points: ["Transmission des dossiers en cours, réaffectation des missions, information des interlocuteurs, besoins de remplacement."] },
    { titre: "7. Archiver le dossier", acteur: "RAF", points: ["Vérifier les formalités, archiver selon les règles de conservation, MAJ des listes internes (organigramme, annuaires, registre)."] },
  ]});
PROCESSES.push({
  id: "t_rh_courante", code: "4.7", title: "Gestion administrative RH courante", group: "transverse", sousGroupe: "Ressources Humaines",
  description: "Gérer la paie et les absences au quotidien.",
  responsables: ["DRH"], acteurs: ["DRH"], contributeurs: ["RAF"],
  frequence: "Mensuelle (paie) / en continu (absences)", outils: ["Silae"], livrables: [], annexes: [],
  objectif: "Gérer la paie mensuelle et le suivi des absences en continu."});
PROCESSES.push({
  id: "t_juridique", code: "4.8", title: "Juridique / Gestion des contrats", group: "transverse", sousGroupe: "Juridique & conformité",
  description: "Sécuriser les contrats et engagements juridiques.",
  responsables: ["Directeur du Développement"], acteurs: ["Cabinet d'avocat", "DRH"], contributeurs: ["Responsable Réseau", "Directeur du Développement"],
  frequence: "À la demande / revue annuelle", outils: [], livrables: ["NDA "], annexes: [],
  objectif: "Sécuriser les contrats et engagements juridiques de l'entreprise."});
PROCESSES.push({
  id: "t_rgpd", code: "4.9", title: "Sécurité des données & RGPD", group: "transverse", sousGroupe: "Juridique & conformité",
  description: "Cartographier et maîtriser les risques RGPD.",
  responsables: ["Directeur du Développement"], acteurs: ["Responsable IT"], contributeurs: ["DRH", "Community manager"],
  frequence: "Audit annuel + en continu", outils: [], livrables: ["Cartographie des risques RGPD "], annexes: [],
  objectif: "Cartographier et maîtriser les risques liés à la sécurité des données et au RGPD."});
PROCESSES.push({
  id: "t_admin_si", code: "4.10", title: "Administration des systèmes et logiciels", group: "transverse", sousGroupe: "IT",
  description: "Cartographier et administrer le parc applicatif et les accès.",
  responsables: ["Responsable IT"], acteurs: ["Responsable IT", "RAF"], contributeurs: ["Agence 360"],
  frequence: "En continu", outils: ["Zoho", "logiciels du parc"], livrables: ["Cartographie des applicatifs ", "Cartographie des accès "], annexes: [],
  objectif: "Administrer le parc applicatif et cartographier les accès."});
PROCESSES.push({
  id: "t_gouvernance", code: "4.11", title: "Gouvernance / Comitologie", group: "transverse", sousGroupe: "Gouvernance & pilotage",
  description: "Structurer les instances de gouvernance (CODIR et autres comités).",
  responsables: ["Directeur du Développement"], acteurs: ["Directeur du Développement", "DRH"], contributeurs: ["Responsable Réseau"],
  frequence: "Selon instance (CODIR mensuel, autres comités)", outils: [], livrables: ["Calendrier annuel des instances "], annexes: [],
  objectif: "Structurer et planifier les instances de gouvernance de l'entreprise."});
PROCESSES.push({
  id: "t_documentaire", code: "4.12", title: "Gestion documentaire / Archivage", group: "transverse", sousGroupe: "Gouvernance & pilotage",
  description: "Organiser l'arborescence documentaire et la politique de conservation.",
  responsables: ["Directeur du Développement"], acteurs: ["Responsable IT"], contributeurs: ["DRH"],
  frequence: "En continu", outils: ["Drive", "Zendoc"], livrables: ["Arborescence documentaire ", "Politique de conservation "], annexes: [],
  objectif: "Organiser l'arborescence documentaire et définir la politique de conservation."});

/* =========================================================================
   RESSOURCE — COMMUNICATION (regroupe toute la communication)
   ========================================================================= */

PROCESSES.push({
  id: "c_linkedin", title: "Animation du réseau via LinkedIn", group: "communication",
  description: "Maintenir une présence régulière sur LinkedIn et maximiser le taux d'inscription aux rencontres.",
  responsables: ["Community manager"], acteurs: ["Responsable de club"], contributeurs: ["Agence 360"],
  frequence: "Mensuel / à chaque rencontre", outils: ["LinkedIn"], livrables: ["Calendrier éditorial", "Posts"], annexes: [],
  objectif: "Maintenir une présence régulière sur LinkedIn et maximiser le taux d'inscription aux rencontres via des relances ciblées.",
  etapes: [
    { titre: "Planifier le calendrier éditorial", acteur: "Community manager", points: ["Publications mensuelles (photos rencontres, portraits membres, annonces intervenants), gabarits Agence 360."] },
    { titre: "Promouvoir les rencontres", acteur: "Responsable de club", points: ["Annonce intervenant à J-20 (relance J-10), promotion sur le compte personnel."] },
    { titre: "Post mensuel sur les visites membres", acteur: "Responsable de club", points: ["Montrer la proximité : différenciation, spécificités, besoins, projets du membre."] },
    { titre: "Post déjeuner (focus nouveaux membres)", acteur: "Responsable de club", points: ["Photos post-event sous 48h, portraits membres, photo de qualité devant le photocall."] },
  ],
  notes: ["Crédits : 250 pour inviter à suivre les pages, 100/semaine en personnel."]});

PROCESSES.push({
  id: "c_whatsapp", title: "Animation du réseau via WhatsApp", group: "communication",
  description: "Maintenir une présence régulière sur WhatsApp et maximiser le taux d'inscription.",
  responsables: ["Community manager"], acteurs: ["Responsable de club"], contributeurs: ["Agence 360"],
  frequence: "Régulier", outils: ["WhatsApp"], livrables: [], annexes: [],
  objectif: "Maintenir une présence régulière sur WhatsApp et maximiser le taux d'inscription aux rencontres.",
  etapes: [
    { titre: "Animer les groupes", acteur: "Responsable de club", points: ["2 types : « Membres » et « Prospects » (dès l'obtention d'un contact)."] },
    { titre: "Relayer les posts LinkedIn", acteur: "Responsable de club", points: ["Vie du club, actualités, rappels, parrainage / cooptation."] },
    { titre: "Tenir les groupes à jour", acteur: "Responsable de club", points: ["Ajouter prospects et nouveaux membres, retirer les résiliés."] },
  ],
  vigilance: ["RGPD : créer des communautés distinctes par club (accès aux photos et numéros).", "Ne diffuser aucun message le week-end sur les groupes WhatsApp."]});

PROCESSES.push({
  id: "c_event", title: "Communication autour d'un évènement", group: "communication",
  description: "Orchestrer la communication d'un déjeuner (BO2 · Manager · Agence 360), de la création aux relances.",
  responsables: ["Community manager"], acteurs: ["Responsable de club"], contributeurs: ["Agence 360"],
  frequence: "À chaque rencontre", outils: ["My Business Club Manager", "Zoho (CRM, Backstage, Campaigns)", "Mailjet"],
  livrables: ["Invitation, emailings, plan de table, carte postale, galerie"], annexes: [10, 11, 12],
  objectif: "Orchestrer la communication complète d'un déjeuner entre BO2, le Manager du club et l'Agence 360, de la création de la rencontre jusqu'aux relances.",
  etapes: [
    { titre: "1. Créer la rencontre", acteur: "Agence 360", points: ["Déjeuner créé (photos, logos), visuel d'invitation validé par BO2, mise en ligne, rencontre créée dans Zoho CRM."] },
    { titre: "2. Paramétrer le déjeuner & le paiement", acteur: "Responsable de club / Agence 360", points: ["Manager : lieu, rétroplanning. Agence : paiement / billetterie (Backstage), vérification des liens."] },
    { titre: "3. Préparer emailings & rétroplanning", acteur: "Agence 360", points: ["Gabarit + emailings d'invitation (membres MBCM / Zoho ; visiteurs Mailjet), intégration du rétroplanning."] },
    { titre: "4. Envoyer les relances", acteur: "Agence 360", points: ["Emailing test au Manager (BAT), puis envoi après validation."] },
    { titre: "5. Gérer le choix des convives", acteur: "Responsable de club / Agence 360", points: ["CSV transmis, nettoyé, intégré en liste de diffusion, test avant envoi."] },
    { titre: "6. Générer le plan de table", acteur: "Responsable de club / Agence 360", points: ["CSV remis en forme, PDF plan de table (alphabétique + chronologique), BAT puis visuel final."] },
    { titre: "7. Envoyer la carte postale", acteur: "Responsable de club / Agence 360", points: ["Photos/textes déposés, emailing carte postale (Mailjet/Campaigns), aussi partagée sur le site web."] },
    { titre: "8. Archiver le rétro déjeuner", acteur: "Agence 360", points: ["Photos téléchargées, galerie site web, livre d'or via le CMS."] },
  ],
  notes: ["Deux variantes d'outillage selon le club : « My Business Club Manager » (historique) et « Zoho » (cible). Suivi des présences : Annexes 10, 11, 12."]});

/* =========================================================================
   ANNEXES (1 à 15) — affichées dans la Ressource « Bonnes pratiques »
   block : { sub?, text?, items?[], mail?{objets, corps} }
   ========================================================================= */

const ANNEXES = {
  1: { title: "Bonnes pratiques de prospection", intro: "Identifier les prospects qualifiés et les convertir en membres.", blocks: [
    { sub: "Développer sa visibilité sur le terrain", text: "La présence terrain est un levier essentiel. Chaque participation (salon, soirée réseau, événement, prospection) doit être renseignée dans le fichier « Gestion des événements » (dossier COMMERCE – BACK OFFICE). Sources à surveiller : CCI locale, agendas des réseaux professionnels, plateformes d'événements d'affaires. Des triptyques sont disponibles pour renforcer la visibilité." },
    { sub: "Automatismes dès qu'un contact est établi", items: ["Ajouter le contact au groupe WhatsApp « Prospects ».", "Se connecter à son profil LinkedIn.", "Penser à son réseau : face à un directeur régional, demander les contacts de ses homologues pour les autres franchisés."] },
    { sub: "Pour chaque cible", items: ["Rechercher les entreprises du secteur géographique.", "Créer la fiche société dans Zoho si absente (auto pour le site, manuel pour les événements).", "Identifier les dirigeants via Pappers.", "Rechercher les contacts LinkedIn et initier le contact.", "Suivre toutes les actions (LinkedIn, mail, appel) dans Zoho."] },
    { sub: "Transfert de prospects à Business Time", items: ["Envoyer le contact par mail à l'administratrice des ventes (animateur du club en copie).", "Renseigner le fichier Excel de suivi des leads (prime en cas d'adhésion)."] },
  ]},
  2: { title: "Premier rendez-vous de prospection : messages types (mail / LinkedIn)", intro: "Accroches pour obtenir un premier rendez-vous.", blocks: [
    { mail: { objets: "1. [Entreprise] et les dirigeants industriels de [région] · 2. Une place à table pour [Entreprise] ? · 3. [Prénom], un cercle de décideurs près de chez vous", corps: "Cas n°1 — Prospection à froid\n\nBonjour [Prénom],\n\nJe dirige le [Business Club de région], un cercle de dirigeants industriels qui se retrouvent chaque mois autour d'une table.\n\nSi je vous écris, c'est que [Entreprise] a le profil de nos membres : une maison ancrée dans son territoire, avec des donneurs d'ordre et des partenaires à rencontrer tout près de vous.\n\nNous ne sommes pas un club d'affaires classique. Nous composons les rencontres pour que chacun reparte avec un contact utile.\n\nAuriez-vous 10 à 15 minutes cette semaine pour en parler ?\n\nAu plaisir de vous lire,\n[Signature]" } },
    { mail: { objets: "1. Une ligne de plus, [Prénom] · 2. [Entreprise] — je remonte mon message · 3. Toujours d'actualité ?", corps: "Cas n°1bis — Relance à froid J+4 (sans réponse)\n\nBonjour [Prénom],\n\nJe reviens vers vous une seule fois, après je vous laisse tranquille.\n\nMa question tenait en une ligne : réunir [Entreprise] avec des dirigeants industriels de [région] aurait-il du sens pour vous ?\n\nUn simple oui ou non suffit. Souhaitez-vous que je vous en dise deux mots au téléphone ?\n\nBien à vous,\n[Signature]" } },
    { mail: { objets: "1. Ravi de notre échange, [Prénom] · 2. La suite après notre conversation ? · 3. Notre déjeuner du [date]", corps: "Cas n°2 — Relance après un premier échange\n\nBonjour [Prénom],\n\nMerci pour le temps que vous m'avez accordé. Ce que vous m'avez décrit est exactement ce que vivent nos membres : autour d'une table, entre dirigeants industriels, les bonnes rencontres se font naturellement.\n\nLe mieux, c'est de venir voir par vous-même. Notre prochain déjeuner a lieu le [date] à [lieu] : Lien de la rencontre\n\n[Signature]" } },
    { mail: { objets: "Message LinkedIn — prospection rencontres", corps: "Bonjour Emilie,\n\nVotre parcours a retenu mon attention et je me suis dit que le prochain dîner du Paris Haussmann Business Club pourrait vous intéresser.\n\nLe 24 juin prochain, nous recevrons Éric Turquin à l'Automobile Club de France pour une soirée privée réunissant un nombre limité de dirigeants et décideurs.\n\nSi vous souhaitez en savoir plus ou réserver votre place :\nhttps://businessclub.zohobackstage.eu/2026-06-24PHBCEricTurquin\n\nAu plaisir de vous lire." } },
  ]},
  3: { title: "Traiter les objections — technique ECER", intro: "S'outiller pour traiter les objections classiques. Les 4 temps : Écouter · Comprendre (poser une question) · Expliquer · Reformuler positivement.", blocks: [
    { sub: "« C'est trop cher ! »", items: ["Écouter : « Si je comprends bien, ce qui vous freine, c'est le prix de la cotisation ? »", "Comprendre : « Avec quoi faites-vous cette comparaison ? »", "Expliquer : « Notre objectif n'est pas de vous coûter de l'argent mais d'en générer grâce aux opportunités entre membres. »", "Reformuler : « Le Club est fait pour que chaque rencontre tisse des liens et génère du business. »"] },
    { sub: "« Je n'ai pas le temps ! »", items: ["Écouter : « Je comprends, c'est le quotidien des dirigeants. »", "Comprendre : « Emploi du temps trop chargé, ou peur d'un engagement de plus ? »", "Expliquer : « Les rencontres durent 2h45, le midi, une fois par mois. »", "Reformuler : « Le vrai enjeu n'est pas de trouver du temps mais de le consacrer à ce qui peut vous en faire gagner. »"] },
  ]},
  4: { title: "Mail type en cas de résiliation d'un membre", blocks: [
    { mail: { objets: "Votre renouvellement au [Club]", corps: "Bonjour Monsieur,\n\nÀ la suite de notre échange, je tenais à vous remercier sincèrement pour le temps passé à nos côtés au sein du [Club].\n\nNous prenons bien note de votre souhait de ne pas renouveler votre adhésion à compter du [date].\n\nCe fut un réel plaisir de vous compter parmi nos membres. Les portes du club vous resteront ouvertes, et nous serions ravis de vous accueillir à nouveau.\n\nRespectueusement," } },
  ]},
  5: { title: "Résiliation : posture pour accompagner la sortie d'un membre", intro: "« Une sortie se traite avec la même exigence qu'une entrée : jamais sous le coup de l'agacement, toujours dans la logique des relations choisies. »", blocks: [
    { sub: "⚖️ 3 interdits, sans exception", items: ["Jamais de reproche sur l'absence ou l'engagement.", "Jamais de name-dropping.", "Jamais de menace concurrentielle."] },
    { sub: "🔄 Les 3 temps de toute réponse", items: ["Remercier sincèrement, sans flatterie.", "Prendre acte avec respect, sans se justifier.", "Ouvrir explicitement la porte pour l'avenir."] },
    { sub: "🚪 Cas particulier", items: ["Ne jamais rompre sèchement ; réorienter vers Business Time (maille TPE / afterwork).", "Le membre reste dans la famille et peut réintégrer le Club si son entreprise grandit."] },
    { sub: "📋 Suivi — Zoho CRM", items: ["Tag « Ancien membre — porte ouverte » dès la sortie.", "Relances douces à 6 puis 12 mois, sans pression."] },
    { mail: { objets: "Trame « sortie élégante »", corps: "Bonjour Madame,\n\nJe vous remercie pour votre message, et pour ces nombreuses années partagées au sein du club.\n\nJe prends acte de votre décision avec respect. Sachez que la porte vous reste ouverte : si vos priorités venaient à évoluer, ce serait un plaisir de vous réaccueillir.\n\nBien à vous," } },
  ]},
  6: { title: "Mails types pour le renouvellement de la cotisation", blocks: [
    { mail: { objets: "En cas de non-réponse à l'appel — Objet : Votre renouvellement au [Club]", corps: "Bonjour Monsieur,\n\nJ'ai tenté de vous joindre aujourd'hui, sans succès. Votre renouvellement au [Club] est prévu pour le [date].\n\nVotre avis compte : comment s'est passée votre année ? Les opportunités business ont-elles été au rendez-vous ? Que pourrions-nous améliorer ?\n\nSi vous ne souhaitez pas renouveler, il suffit de nous le notifier avant le [date]. Sans retour, ou en cas de participation à une rencontre après cette date, le renouvellement sera considéré comme effectif.\n\nRespectueusement," } },
    { mail: { objets: "En cas de souhait de renouveler — Objet : Votre renouvellement au [Club]", corps: "Bonjour Monsieur,\n\nSuite à notre échange, je vous confirme que nous sommes ravis de poursuivre l'aventure à vos côtés. Votre adhésion sera renouvelée à compter du [date].\n\nN'hésitez pas à nous faire part de vos attentes : vos retours sont essentiels pour faire évoluer le club.\n\nRespectueusement," } },
  ]},
  7: { title: "Nouvelle adhésion : mail automatique à paramétrer dans Zoho", blocks: [
    { mail: { objets: "Bienvenue, activez votre espace membre", corps: "Bonjour,\n\nBienvenue au Business Club ! Nous sommes ravis de vous compter parmi nos membres.\n\nAfin de profiter de votre adhésion, créez votre espace membre : [lien].\nTéléchargez aussi l'application Business Club (App Store / Google Play : [liens]).\n\nUne fois votre compte activé, complétez votre profil pour développer votre réseau.\n\nEncore bienvenue,\nCordialement," } },
  ]},
  8: { title: "Le Comité des Sages", intro: "Garantir la qualité et l'équilibre du réseau en évaluant collectivement chaque candidature avant toute décision.", blocks: [
    { sub: "Rôle", text: "Organe décisionnel qui évalue l'adéquation du profil du candidat avec l'équilibre du club. Décision définitive (valide ou diffère), portée collectivement. Accueille aussi le visiteur, tel un ambassadeur, lors de son premier déjeuner." },
    { sub: "Constitution", text: "1 Sage pour 5 membres actifs (ex. club de 30 membres = 6 Sages), représentatifs de la diversité du club." },
    { sub: "Critères d'évaluation", items: ["Équilibre sectoriel : le secteur est-il déjà saturé ?", "Esprit réseau : posture de donner avant de recevoir ?", "Engagement : présence et implication attendues compatibles ?"] },
    { sub: "Fonctionnement & fréquence", text: "Évaluation lors d'un déjeuner dédié, distinct de la rencontre mensuelle. 2 fois par saison, BO2 se réunit avec le Comité des Sages de chaque club (points de saison)." },
  ]},
  9: { title: "Planification logistique intervenant — mail de mise en relation", intro: "Mail adressé ~45 jours avant le déjeuner, au franchisé et à l'intervenant, pour faciliter l'organisation logistique.", blocks: [
    { mail: { objets: "BUSINESS CLUB l Mise en relation l PVBC l xx/xx/2026", corps: "Bonjour à tous,\n\nL'intervention de X dans le Business Club de X approche et aura lieu le [date].\n\nAfin de préparer cette rencontre, voici les coordonnées utiles de part et d'autre :\n- Manager local : [nom, mail, tél.]\n- Intervenant : [nom]\n\nFacturation : la relation contractuelle se fait exclusivement entre Business O2 et les intervenants. Merci d'adresser la facture à : Business O2, Immeuble Challenger, 1 Rue George Johann, 59300 FAMARS — compta@business-club-group.com\n\nN'hésitez pas à revenir vers nous." } },
  ]},
  10: { title: "Gestion des rendez-vous Outlook", intro: "Garantir la présence des membres le jour de la rencontre.", blocks: [
    { sub: "Cas de figure", items: ["Planification d'un évènement (date validée par l'intervenant et le manager).", "Planification d'un rendez-vous (appel ou visite).", "Intégration d'un nouveau membre."] },
    { text: "Envoyer une invitation Outlook aux membres, puis paramétrer un message de relance 1 semaine avant (voir Annexes 11 et 12). J-14 / J-7 : mail de rappel (Zoho Campaigns) puis appel personnalisé — viser 90% d'inscrits à J-7." },
  ]},
  11: { title: "Paramétrage des invitations Outlook", intro: "Garantir la présence des membres le jour de la rencontre.", blocks: [
    { mail: { objets: "Message type — invitation (envoi des dates)", corps: "Madame, Monsieur,\n\nAfin de vous permettre d'assister à un maximum de rencontres, nous vous transmettons dès à présent les dates de vos rencontres. Vous pouvez les réserver dans votre agenda et vous inscrire via l'application mobile.\n\nImportant : cette communication ne vaut pas inscription. Pour confirmer, merci d'effectuer la démarche sur l'application mobile (ou sur le site web).\n\nEn cas d'empêchement, merci de me prévenir au moins 48 heures à l'avance pour éviter toute facturation." } },
  ]},
  12: { title: "Paramétrage des relances Outlook", intro: "Garantir la présence des membres le jour de la rencontre.", blocks: [
    { mail: { objets: "Message type — relance (1 semaine avant)", corps: "Madame, Monsieur,\n\nVotre rencontre approche : elle aura lieu dans une semaine ! Si vous n'êtes pas encore inscrit, c'est le moment.\n\nN'hésitez pas à convier vos clients, fournisseurs ou collaborateurs. Pour que la rencontre soit efficace, merci de jouer le jeu du tour de table : « De quoi avez-vous besoin ? » et « Qu'êtes-vous venu chercher au sein du club ? »\n\nPour confirmer, merci d'effectuer la démarche sur l'application mobile (ou le site web).\n\nNous avons hâte de vous retrouver !" } },
  ]},
  13: { title: "Zoho — saisie des comptes rendus", intro: "Assurer la traçabilité des informations liées aux entreprises et aux contacts.", blocks: [
    { sub: "Où saisir ?", items: ["Information sur l'entreprise (résiliation, changement de direction, intérêt Business Event…) → section « Remarques » du module « Comptes ».", "Lien avec un contact (CR de RDV, prospection…) → section « Suivi Commercial » du module « Contacts ».", "💡 Dans les deux cas, tout remonte dans la section « Chronologie »."] },
  ]},
  14: { title: "Renouvellement : trouver les membres à renouveler (M-2)", intro: "Assurer le renouvellement de l'adhésion jusqu'au paiement.", blocks: [
    { items: ["Se rendre dans la rubrique « Comptes », onglet « Échéances membres ».", "Filtrer sur « Club » et « Étapes » = « Devis à faire ».", "Conseil : placer la date de début d'adhésion en première colonne (lecture chronologique)."] },
  ]},
  15: { title: "Renouvellement : consulter les factures impayées", intro: "Assurer le renouvellement de l'adhésion jusqu'au paiement.", blocks: [
    { items: ["Onglet « Analytics » de Zoho (analytics.zoho.eu) → « Business Club ».", "Ouvrir « Retard » puis « Retard Réseau », choisir la franchise (Business O2) et le club.", "Afficher « Détail par compte » : factures impayées par client avec montants."] },
  ]}};

/* =========================================================================
   LOGIGRAMMES (avec questions) — un par parcours
   row : { type:"step", id } | { type:"question", label } | { type:"branches", branches:[{label, ids:[]}] }
   ========================================================================= */

const LOGIGRAMMES = {
  propre: [
    { type: "step", id: "p_prospection" },
    { type: "question", label: "Quel type de prospect ?" },
    { type: "branches", branches: [
      { label: "Entreprise", ids: ["p_visite_usine", "p_location_salle", "p_business_event"] },
      { label: "Intervenant", ids: ["p_qualif_intervenant"] },
      { label: "Membre", ids: ["p_admission", "p_communication_propre", "p_fidelisation"] },
    ]},
    { type: "question", label: "Renouvellement ? (parcours membre)" },
    { type: "branches", branches: [
      { label: "Oui", ids: ["p_renouvellement"] },
      { label: "Non", ids: ["p_resiliation"] },
    ]},
  ],
  dejeuner: [
    { type: "step", id: "d_reservation" },
    { type: "step", id: "d_planif_intervenant" },
    { type: "step", id: "d_logistique_rencontre" },
    { type: "step", id: "d_logistique_intervenant" },
    { type: "step", id: "d_communication" },
    { type: "step", id: "d_inscriptions" },
    { type: "question", label: "Invités ou visiteur ?" },
    { type: "branches", branches: [{ label: "Oui", ids: ["d_invites"] }] },
    { type: "step", id: "d_tenue" },
    { type: "step", id: "d_suivi" },
  ],
  franchise: [
    { type: "step", id: "f_admission" },
    { type: "step", id: "f_deploiement_it" },
    { type: "question", label: "MANOP à jour ?" },
    { type: "branches", branches: [{ label: "Non → mettre à jour", ids: ["f_manop"] }] },
    { type: "step", id: "f_formation" },
    { type: "step", id: "f_kit" },
    { type: "step", id: "f_inauguration" },
    { type: "step", id: "f_dejeuner" },
    { type: "step", id: "f_visite_terrain" },
    { type: "step", id: "f_accompagnement" },
    { type: "question", label: "Résiliations ?" },
    { type: "branches", branches: [
      { label: "Oui", ids: ["f_resiliation"] },
      { label: "Non", ids: ["f_renouvellement"] },
    ]},
  ]};

/* =========================================================================
   GLOSSAIRE
   ========================================================================= */

const GLOSSAIRE = [
  { sigle: "BAT", def: "Bon à Tirer" },
  { sigle: "BC", def: "Business Club" },
  { sigle: "BP", def: "Business Plan" },
  { sigle: "CGV", def: "Conditions Générales de Vente" },
  { sigle: "CMS", def: "Content Management System (gestion de contenu web)" },
  { sigle: "CODIR", def: "Comité de Direction" },
  { sigle: "CRM", def: "Customer Relationship Management" },
  { sigle: "DIP", def: "Document d'Information Précontractuelle" },
  { sigle: "DPAE", def: "Déclaration Préalable à l'Embauche" },
  { sigle: "GC", def: "Grands Comptes" },
  { sigle: "MBCM", def: "My Business Club Manager" },
  { sigle: "NDA", def: "Non-Disclosure Agreement (accord de confidentialité)" },
  { sigle: "PLV", def: "Publicité sur Lieu de Vente" },
  { sigle: "RACI", def: "Responsable / Acteur / Contributeur / Informé" },
  { sigle: "RGPD", def: "Règlement Général sur la Protection des Données" },
];

/* =========================================================================
   PAGE — MODALITÉS DE MISE À JOUR (RACI mis en évidence, hors objectif)
   ========================================================================= */

const MODALITES = {
  title: "Modalités de mise à jour du book des processus",
  objectif: "Maintenir le référentiel à jour dans le PPTX et dans l'application, afin que chaque collaborateur dispose des processus en vigueur et de ses propres responsabilités (RACI).",
  raci: { responsables: ["Référent IT"], acteurs: ["Référent IT"], contributeurs: ["Tous les collaborateurs"]},
  sections: [
    { titre: "J-30 · Collecter les remontées collaborateurs", items: [
      "Canal : conversation Teams.",
      "Chaque collaborateur signale : processus obsolète/inexact, étape manquante, outil ou acteur changé, nouveau processus.",
      "Le Référent IT consolide dans un tableau de synthèse (Processus / Type de modification / Priorité / Source / Validation).",
    ]},
    { titre: "J-15 · Arbitrer et prioriser", items: [
      "Présenter la synthèse au porteur métier concerné (validation du contenu).",
      "Distinguer modification mineure (texte, acteur) et structurelle (nouveau processus, séquence).",
      "Validation en CODIR avant intégration.",
    ]},
    { titre: "J-5 · Mettre à jour le Book (PPTX)", items: [
      "Intégrer les modifications dans Business_O2_Book_des_processus.pptx.",
      "Bien mettre à jour le RACI. Sauvegarder en versionné (Book_processus_v2.1_juillet2026.pptx).",
    ]},
    { titre: "J-3 · Mettre à jour l'application", items: [
      "Importer le book à jour dans l'application (ici : mettre à jour data.js).",
      "Rédiger un bloc « Évolutions de cette version ».",
    ]},
    { titre: "J0 · Diffuser et archiver", items: [
      "Mail de release à tous (lien app, résumé des évolutions, PPTX en partage).",
      "Archiver la version précédente du PPTX et du prompt ; mettre à jour le calendrier de gouvernance.",
    ]},
  ]};

// __END__
