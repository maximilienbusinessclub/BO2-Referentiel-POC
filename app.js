/* ==========================================================================
   Business O2 — Référentiel des processus (POC)
   Logique d'affichage. Données : data.js (PROCESSES / ANNEXES / LOGIGRAMMES / MODALITES).
   JavaScript pur, sans dépendance : fonctionne par simple ouverture d'index.html.
   ========================================================================== */

const NR = "Non renseigné";
const APP_VERSION = "1.1";
const BOOK_VERSION = "v5";
const BOOK_DATE = "22/09/2026";
const RACI_LABEL = { R: "Responsable", A: "Acteur", C: "Contributeur" };

const GROUP_LABELS = {
  propre: "Prospection et parcours membre",
  dejeuner: "Organisation d'un évènement",
  franchise: "Club franchisé",
  transverse: "Fonctions transverses",
  communication: "Communication",
  it_sub: "Club franchisé — Déploiement IT",
};
const PARCOURS_TITLES = {
  propre: "Prospection et parcours membre",
  dejeuner: "Organisation d'un évènement",
  franchise: "Club franchisé",
  transverse: "Fonctions transverses",
  communication: "Communication",
};

// Ordre d'affichage des sous-domaines des fonctions transverses
const TRANSVERSE_ORDER = ["Support opérationnel", "Ressources Humaines", "Juridique & conformité", "IT", "Gouvernance & pilotage"];

const PROSPECTION_TYPES = {
  entreprise: { label: "Entreprise", icon: "🏭", desc: "Prospecter une entreprise en vue d'une visite d'usine, d'une location de salle ou d'un business event.",
    ids: ["p_visite_usine", "p_location_salle", "p_business_event"] },
  intervenant: { label: "Intervenant", icon: "🎤", desc: "Identifier et qualifier un intervenant pour enrichir le book.",
    ids: ["p_qualif_intervenant"] },
  membre: { label: "Membre", icon: "🤝", desc: "Prospecter et faire adhérer un nouveau membre, puis animer sa vie au club.",
    ids: ["p_prospection", "p_admission", "p_communication_propre", "p_fidelisation", "p_renouvellement", "p_resiliation"] },
};

const state = { tab: "process", nav: { type: "home" }, role: null, prospectionType: null, parcoursLayout: "liste", openAnnexe: null, searchQuery: "" };

// --- Utilitaires --------------------------------------------------------
const $ = (s) => document.querySelector(s);
function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function joinR(arr) { return (arr && arr.length) ? arr.map(esc).join(", ") : NR; }
function byGroup(g) { return PROCESSES.filter((p) => p.group === g); }
function byId(id) { return PROCESSES.find((p) => p.id === id); }
function roleColor(role) { const c = ROLE_CATEGORIES[role]; return c ? CATEGORY_COLORS[c].bg : "#8A8A85"; }

function allRoles() {
  const set = new Set();
  PROCESSES.forEach((p) => {
    [...(p.responsables || []), ...(p.acteurs || []), ...(p.contributeurs || [])]
      .forEach((r) => { if (r && r !== NR) set.add(r); });
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b, "fr"));
}
function tagsForRole(p, role) {
  const t = [];
  if ((p.responsables || []).includes(role)) t.push("R");
  if ((p.acteurs || []).includes(role)) t.push("A");
  if ((p.contributeurs || []).includes(role)) t.push("C");
  return t;
}

// --- Page d'accueil -----------------------------------------------------
function renderHome() {
  const parcours = [
    { group: "propre", icon: "🤝", desc: "De la prospection à la fidélisation : le cycle de vie complet d'un membre." },
    { group: "dejeuner", icon: "🍽️", desc: "L'organisation d'une rencontre, de la réservation au suivi post-évènement." },
    { group: "franchise", icon: "🏢", desc: "Le déploiement et l'accompagnement d'un club franchisé." },
  ].map((p) => `
    <button class="home-card" data-parcours="${p.group}">
      <div class="home-card__icon">${p.icon}</div>
      <div class="home-card__title">${esc(PARCOURS_TITLES[p.group])}</div>
      <div class="home-card__desc">${esc(p.desc)}</div>
      <div class="home-card__go">Ouvrir ›</div>
    </button>`).join("");

  const transverse = `
    <button class="home-card" data-parcours="transverse">
      <div class="home-card__icon">🧩</div>
      <div class="home-card__title">Fonctions transverses</div>
      <div class="home-card__desc">Support opérationnel, RH, juridique &amp; RGPD, IT, gouvernance — les fonctions qui soutiennent les métiers.</div>
      <div class="home-card__go">Ouvrir ›</div>
    </button>`;

  const utils = [
    { act: `data-parcours="communication"`, icon: "📣", title: "Communication", desc: "Toute la communication : LinkedIn, WhatsApp et communication évènement." },
    { act: `data-page="bonnes-pratiques"`, icon: "⭐", title: "Bonnes pratiques", desc: "Les annexes du Book : mails types, ECER, checklists, procédures." },
    { act: `data-page="glossaire"`, icon: "📖", title: "Glossaire", desc: "La signification des sigles utilisés dans le référentiel." },
    { act: `data-page="modalites"`, icon: "🔄", title: "Modalités de mise à jour", desc: "Comment faire vivre et actualiser le référentiel." },
  ].map((u) => `
    <button class="home-card home-card--util" ${u.act}>
      <div class="home-card__icon">${u.icon}</div>
      <div class="home-card__title">${esc(u.title)}</div>
      <div class="home-card__desc">${esc(u.desc)}</div>
      <div class="home-card__go">Consulter ›</div>
    </button>`).join("");

  return `
    <div class="home-intro">Le référentiel réunit <b>3 macro-processus métiers</b> (parcours membre, organisation d'un évènement, club franchisé) et un ensemble de <b>fonctions transverses</b> qui les soutiennent.</div>
    <div class="section-title">Processus métier</div>
    <div class="home-grid">${parcours}</div>
    <div class="section-title">Processus transverses</div>
    <div class="home-grid">${transverse}</div>
    <div class="section-title">Ressources</div>
    <div class="home-grid">${utils}</div>`;
}

// --- Liste déroulée : une étape = un bouton + RACI/fréquence/livrables --
function raciMini(letter, arr) {
  const val = (arr && arr.length) ? arr.map(esc).join(", ") : "—";
  return `<div class="vraci-line"><span class="raci-badge raci-badge--${letter}">${letter}</span><span>${val}</span></div>`;
}
function renderStepButton(p) {
  const hasChildren = p.children && p.children.length;
  const attr = hasChildren ? `data-subparcours="${p.id}"` : `data-id="${p.id}"`;
  const code = p.code ? `<span class="vstep__code">${esc(p.code)}</span> ` : "";
  const childHint = hasChildren ? `<span class="vstep__more">${p.children.length} étapes ›</span>` : "";
  const liv = (p.livrables && p.livrables.length) ? `<div class="vliv">📕 ${p.livrables.map(esc).join(" · ")}</div>` : "";
  return `
    <button class="vstep" ${attr}>
      <div class="vstep__left">
        <div class="vstep__title">${code}${esc(p.title)} ${childHint}</div>
        ${p.description ? `<div class="vstep__desc">${esc(p.description)}</div>` : ""}
      </div>
      <div class="vstep__right">
        <div class="vraci">
          ${raciMini("R", p.responsables)}
          ${raciMini("A", p.acteurs)}
          ${raciMini("C", p.contributeurs)}
        </div>
        <div class="vmeta">⌛ ${esc(p.frequence || NR)}</div>
        ${liv}
      </div>
    </button>`;
}
function renderVerticalList(steps) {
  return `<div class="vlist">${steps.map(renderStepButton).join("")}</div>`;
}

// --- Logigramme (avec questions) ---------------------------------------
function logiBox(id) {
  const p = byId(id);
  if (!p) return "";
  const hasChildren = p.children && p.children.length;
  const attr = hasChildren ? `data-subparcours="${p.id}"` : `data-id="${p.id}"`;
  return `<button class="logi-step" ${attr}>${p.code ? `<b>${esc(p.code)}</b> ` : ""}${esc(p.title)}${hasChildren ? " ›" : ""}</button>`;
}
function renderLogigramme(group) {
  const rows = LOGIGRAMMES[group] || [];
  const html = rows.map((row, i) => {
    const conn = i > 0 ? `<div class="logi-conn">↓</div>` : "";
    if (row.type === "step") return conn + logiBox(row.id);
    if (row.type === "question") return conn + `<div class="logi-q">◆ ${esc(row.label)}</div>`;
    if (row.type === "branches") {
      const cols = row.branches.map((b) => `
        <div class="logi-branch">
          <div class="logi-branch__label">${esc(b.label)}</div>
          ${b.ids.map((id) => logiBox(id)).join("")}
        </div>`).join("");
      return conn + `<div class="logi-branches">${cols}</div>`;
    }
    return "";
  }).join("");
  return `<div class="logi">${html}</div>`;
}

// --- Vue parcours -------------------------------------------------------
function renderParcours(group) {
  const back = `<button class="back-btn" data-home>‹ Retour à l'accueil</button>`;
  const title = `<div class="section-title">${esc(PARCOURS_TITLES[group] || GROUP_LABELS[group])}</div>`;
  const steps = byGroup(group);
  const hasLogi = !!LOGIGRAMMES[group];

  const toggle = hasLogi ? `
    <div class="layout-toggle">
      <button class="ltbtn${state.parcoursLayout === "logigramme" ? " ltbtn--active" : ""}" data-layout="logigramme">◆ Logigramme</button>
      <button class="ltbtn${state.parcoursLayout === "liste" ? " ltbtn--active" : ""}" data-layout="liste">≣ Liste déroulée</button>
    </div>` : "";

  const bodyDefault = (hasLogi && state.parcoursLayout === "logigramme") ? renderLogigramme(group) : renderVerticalList(steps);

  if (group === "propre") {
    const cards = Object.entries(PROSPECTION_TYPES).map(([key, t]) => `
      <button class="type-card${state.prospectionType === key ? " type-card--active" : ""}" data-type="${key}">
        <div class="type-card__icon">${t.icon}</div>
        <div class="type-card__label">${esc(t.label)}</div>
        <div class="type-card__desc">${esc(t.desc)}</div>
      </button>`).join("");

    let body;
    if (state.prospectionType) {
      const t = PROSPECTION_TYPES[state.prospectionType];
      const list = renderVerticalList(t.ids.map(byId).filter(Boolean));
      body = `<button class="back-btn" data-type-reset>‹ Revenir au parcours complet</button>
        <div class="subhead">Prospection « ${esc(t.label)} » — ${t.ids.length} processus</div>${list}`;
    } else {
      body = toggle + bodyDefault;
    }
    return `${back}${title}
      <div class="hint" style="margin-bottom:12px">Trois types de prospection alimentent ce parcours. Cliquez sur un type pour voir les processus concernés, ou explorez le parcours complet ci-dessous.</div>
      <div class="types-grid">${cards}</div>${body}`;
  }

  if (group === "transverse") {
    const groupsSeen = [];
    steps.forEach((p) => { const sg = p.sousGroupe || "Autres"; if (!groupsSeen.includes(sg)) groupsSeen.push(sg); });
    const order = TRANSVERSE_ORDER.filter((g) => groupsSeen.includes(g)).concat(groupsSeen.filter((g) => !TRANSVERSE_ORDER.includes(g)));
    const sections = order.map((sg) => {
      const items = steps.filter((p) => (p.sousGroupe || "Autres") === sg);
      return `<div class="subhead">${esc(sg)}</div>${renderVerticalList(items)}`;
    }).join("");
    return `${back}${title}
      <div class="hint" style="margin-bottom:12px">Les fonctions qui soutiennent les métiers, regroupées par domaine.</div>
      ${sections}`;
  }

  return `${back}${title}${toggle}${bodyDefault}`;
}

// --- Sous-parcours (Déploiement IT) ------------------------------------
function renderSubParcours(parentId) {
  const parent = byId(parentId);
  if (!parent) return renderHome();
  const children = (parent.children || []).map(byId).filter(Boolean);
  return `
    <button class="back-btn" data-parcours="franchise">‹ Retour au parcours « Club franchisé »</button>
    <div class="section-title">${parent.code ? esc(parent.code) + " · " : ""}${esc(parent.title)}</div>
    ${parent.objectif ? `<div class="objectif">${esc(parent.objectif)}</div>` : ""}
    ${renderVerticalList(children)}`;
}

// --- Page : Bonnes pratiques (annexes en accordéons) -------------------
function renderAnnexeBody(a) {
  return (a.blocks || []).map((b) => {
    let h = "";
    if (b.sub) h += `<div class="an-sub">${esc(b.sub)}</div>`;
    if (b.text) h += `<p class="an-text">${esc(b.text)}</p>`;
    if (b.items && b.items.length) h += `<ul class="tag-list">${b.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>`;
    if (b.mail) h += `<div class="an-mail"><div class="an-mail__obj">✉️ ${esc(b.mail.objets)}</div><div class="an-mail__body">${esc(b.mail.corps)}</div></div>`;
    return h;
  }).join("");
}
function renderBonnesPratiques() {
  const rows = Object.keys(ANNEXES).map((n) => {
    const a = ANNEXES[n];
    const open = String(state.openAnnexe) === String(n);
    return `
      <div class="accordion" id="annexe-${n}">
        <button class="accordion__btn" data-annexe-toggle="${n}" aria-expanded="${open}" aria-controls="annexe-body-${n}">
          <span class="accordion__cas">Annexe ${n} — ${esc(a.title)}</span>
          <span class="accordion__chev">${open ? "▾" : "▸"}</span>
        </button>
        <div class="accordion__body" id="annexe-body-${n}"${open ? "" : " hidden"}>
          ${a.intro ? `<div class="objectif">${esc(a.intro)}</div>` : ""}
          ${renderAnnexeBody(a)}
        </div>
      </div>`;
  }).join("");
  return `
    <button class="back-btn" data-home>‹ Retour à l'accueil</button>
    <div class="section-title">Bonnes pratiques &amp; annexes</div>
    <div class="hint" style="margin-bottom:14px">Les 15 annexes du Book. Cliquez sur un titre pour déplier son contenu.</div>
    ${rows}`;
}

// --- Page : Modalités de mise à jour (RACI en évidence) ----------------
function renderModalites() {
  const m = MODALITES;
  const raci = `
    <div class="raci-block">
      <div class="raci-block__title">Vision RACI</div>
      <dl class="raci-grid">
        <dt>Responsable</dt><dd>${joinR(m.raci.responsables)}</dd>
        <dt>Acteur</dt><dd>${joinR(m.raci.acteurs)}</dd>
        <dt>Contributeur</dt><dd>${joinR(m.raci.contributeurs)}</dd>
      </dl>
    </div>`;
  const sections = m.sections.map((s) => `
    <div class="page-section">
      <div class="subhead">${esc(s.titre)}</div>
      <ul class="tag-list">${s.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>
    </div>`).join("");
  return `
    <button class="back-btn" data-home>‹ Retour à l'accueil</button>
    <div class="section-title">${esc(m.title)}</div>
    <div class="objectif">${esc(m.objectif)}</div>
    ${raci}
    ${sections}`;
}

// --- Page : Glossaire ---------------------------------------------------
function renderGlossaire() {
  const rows = GLOSSAIRE.map((g) => `
    <div class="glo-row"><span class="glo-sigle">${esc(g.sigle)}</span><span class="glo-def">${esc(g.def)}</span></div>`).join("");
  return `
    <button class="back-btn" data-home>‹ Retour à l'accueil</button>
    <div class="section-title">Glossaire</div>
    <div class="hint" style="margin-bottom:14px">La signification des sigles utilisés dans le référentiel.</div>
    <div class="glossaire">${rows}</div>`;
}

// --- Vue par acteur -----------------------------------------------------
function renderActorView() {
  const roles = allRoles();
  const pills = roles.map((r) => {
    const bg = roleColor(r);
    const active = state.role === r;
    const style = active ? `style="background:${bg};color:#fff;border-color:${bg}"` : `style="border-color:${bg};color:${bg}"`;
    return `<button class="role-pill${active ? " role-pill--active" : ""}" data-role="${esc(r)}" ${style}>${esc(r)}</button>`;
  }).join("");
  
  const resetBtn = state.role ? `<button class="reset-btn" data-role-reset title="Réinitialiser la sélection">Réinitialiser</button>` : "";

  const legendCats = Object.values(CATEGORY_COLORS).map((c) =>
    `<span><span class="cat-dot" style="background:${c.bg}"></span> ${esc(c.label)}</span>`).join("");
  const raciLeg = `
    <div class="legend">
      <span><span class="raci-badge raci-badge--R">R</span> Responsable</span>
      <span><span class="raci-badge raci-badge--A">A</span> Acteur</span>
      <span><span class="raci-badge raci-badge--C">C</span> Contributeur</span>
    </div>`;

  let body;
  if (!state.role) {
    body = `<div class="hint">Sélectionnez une fonction ci-dessus pour voir toutes les étapes sur lesquelles elle intervient.</div>`;
  } else {
    const rows = [];
    PROCESSES.forEach((p) => { const t = tagsForRole(p, state.role); if (t.length) rows.push({ p, t }); });
    const items = rows.map(({ p, t }) => `
      <button class="step-row" data-id="${p.id}">
        <div>
          <div>${p.code ? esc(p.code) + " · " : ""}${esc(p.title)}</div>
          <div class="step-row__meta">${esc(GROUP_LABELS[p.group] || p.group)}</div>
        </div>
        <div class="raci-badges">${t.map((x) => `<span class="raci-badge raci-badge--${x}" title="${RACI_LABEL[x]}">${x}</span>`).join("")}</div>
      </button>`).join("");
    body = `<div class="section-title">${rows.length} étape${rows.length > 1 ? "s" : ""} pour « ${esc(state.role)} »</div><div class="step-list">${items}</div>`;
  }

  return `<div class="legend legend--cats">${legendCats}</div><div class="role-filters">${pills}${resetBtn}</div>${raciLeg}${body}`;
}

// --- Panneau de détail --------------------------------------------------
function openDetail(id) {
  const p = byId(id);
  if (!p) return;

  const raci = `
    <dl class="raci-grid">
      <dt>Responsable</dt><dd>${joinR(p.responsables)}</dd>
      <dt>Acteur</dt><dd>${joinR(p.acteurs)}</dd>
      <dt>Contributeur</dt><dd>${joinR(p.contributeurs)}</dd>
      <dt>Fréquence</dt><dd>${esc(p.frequence || NR)}</dd>
      <dt>Outils</dt><dd>${joinR(p.outils)}</dd>
      <dt>Livrables</dt><dd>${joinR(p.livrables)}</dd>
    </dl>`;

  const objectif = p.objectif ? `<div class="objectif">Objectif : ${esc(p.objectif)}</div>` : "";

  let links = "";
  if (p.linkComm) links += `<button class="drawer-btn drawer-btn--primary" data-parcours="communication">Voir la Ressource « Communication » ›</button>`;
  if (p.linkDejeuner) links += `<button class="drawer-btn drawer-btn--primary" data-parcours="dejeuner">Voir le parcours « Organisation d'un déjeuner » ›</button>`;
  if (p.children && p.children.length) links += `<button class="drawer-btn drawer-btn--primary" data-subparcours="${p.id}">Voir les ${p.children.length} étapes du déploiement ›</button>`;

  const etapes = (p.etapes || []).map((e) => `
    <div class="etape">
      <div class="etape__titre">${esc(e.titre)}</div>
      ${e.acteur ? `<div class="etape__acteur">👤 ${esc(e.acteur)}</div>` : ""}
      ${(e.points && e.points.length) ? `<ul>${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>` : ""}
    </div>`).join("");

  const notes = (p.notes || []).map((n) => `<div class="box box--info">${esc(n)}</div>`).join("");
  const vigilance = (p.vigilance || []).map((v) => `<div class="box box--warn">⚠️ ${esc(v)}</div>`).join("");

  const annexeLinks = (p.annexes && p.annexes.length) ? `
    <div class="subhead">📎 Annexes liées</div>
    <div class="annexe-links">${p.annexes.map((n) => ANNEXES[n]
      ? `<button type="button" class="annexe-link" data-annexe="${n}">Annexe ${n} — ${esc(ANNEXES[n].title)}</button>` : "").join("")}</div>` : "";

  const hasDetail = (p.etapes && p.etapes.length) || (p.annexes && p.annexes.length);
  const detailBlock = hasDetail
    ? `<button class="drawer-btn drawer-btn--outline" id="toggle-detail">Voir le détail complet ▸</button>
       <div id="detail-body" hidden>${objectif}${etapes}${annexeLinks}</div>`
    : (objectif || `<div class="box box--neutral">Détail à compléter lors d'une prochaine itération.</div>`);

  $("#drawer").innerHTML = `
    <div class="drawer__head">
      <div>
        <div class="drawer__code">${p.code ? esc(p.code) + " · " : ""}${esc(GROUP_LABELS[p.group] || "")}</div>
        <div class="drawer__title" id="drawer-title">${esc(p.title)}</div>
      </div>
      <button class="drawer__close" id="drawer-close" aria-label="Fermer">×</button>
    </div>
    ${raci}${notes}${vigilance}${links}${detailBlock}`;

  const drawerEl = $("#drawer");
  drawerEl.setAttribute("role", "dialog");
  drawerEl.setAttribute("aria-modal", "true");
  drawerEl.setAttribute("aria-labelledby", "drawer-title");

  $("#drawer-overlay").hidden = false;
}
function closeDetail() { $("#drawer-overlay").hidden = true; }

// --- Recherche plein texte -----------------------------------------------
function normalizeString(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Supprimer les accents
}

function searchProcesses(query) {
  if (!query || query.trim().length === 0) return [];
  
  const q = normalizeString(query);
  const results = [];
  
  PROCESSES.forEach((p) => {
    let matchType = null;
    let matchContext = null;
    
    // Chercher dans les champs principaux
    if (normalizeString(p.code).includes(q)) { matchType = "Code"; matchContext = p.code; }
    else if (normalizeString(p.title).includes(q)) { matchType = "Titre"; matchContext = p.title; }
    else if (normalizeString(p.description).includes(q)) { matchType = "Description"; matchContext = p.description; }
    else if ((p.frequence && normalizeString(p.frequence).includes(q))) { matchType = "Fréquence"; matchContext = p.frequence; }
    else if ((p.outils || []).some(o => normalizeString(o).includes(q))) { matchType = "Outil"; matchContext = (p.outils || []).find(o => normalizeString(o).includes(q)); }
    else if ((p.livrables || []).some(l => normalizeString(l).includes(q))) { matchType = "Livrable"; matchContext = (p.livrables || []).find(l => normalizeString(l).includes(q)); }
    else if ((p.responsables || []).some(r => normalizeString(r).includes(q))) { matchType = "Responsable"; matchContext = (p.responsables || []).find(r => normalizeString(r).includes(q)); }
    else if ((p.acteurs || []).some(a => normalizeString(a).includes(q))) { matchType = "Acteur"; matchContext = (p.acteurs || []).find(a => normalizeString(a).includes(q)); }
    else if ((p.contributeurs || []).some(c => normalizeString(c).includes(q))) { matchType = "Contributeur"; matchContext = (p.contributeurs || []).find(c => normalizeString(c).includes(q)); }
    else if (p.objectif && normalizeString(p.objectif).includes(q)) { matchType = "Objectif"; matchContext = p.objectif; }
    else if ((p.etapes || []).some(e => normalizeString(e.titre).includes(q) || (e.points || []).some(pt => normalizeString(pt).includes(q)))) {
      matchType = "Étape";
      const step = (p.etapes || []).find(e => normalizeString(e.titre).includes(q) || (e.points || []).some(pt => normalizeString(pt).includes(q)));
      matchContext = step ? step.titre : "";
    }
    else if ((p.notes || []).some(n => normalizeString(n).includes(q))) { matchType = "Note"; matchContext = (p.notes || []).find(n => normalizeString(n).includes(q)); }
    else if ((p.vigilance || []).some(v => normalizeString(v).includes(q))) { matchType = "Vigilance"; matchContext = (p.vigilance || []).find(v => normalizeString(v).includes(q)); }
    
    if (matchType) {
      results.push({ p, matchType, matchContext: esc(String(matchContext).substring(0, 100)) });
    }
  });
  
  // Chercher dans le glossaire
  GLOSSAIRE.forEach((g) => {
    if (normalizeString(g.sigle).includes(q) || normalizeString(g.def).includes(q)) {
      results.push({ glossaire: g, matchType: "Glossaire", matchContext: esc(g.def.substring(0, 100)) });
    }
  });
  
  // Chercher dans les annexes
  Object.keys(ANNEXES).forEach((n) => {
    const a = ANNEXES[n];
    if (normalizeString(a.title).includes(q) || (a.intro && normalizeString(a.intro).includes(q))) {
      results.push({ annexe: { n, a }, matchType: "Annexe", matchContext: esc(a.title) });
    }
  });
  
  return results;
}

// --- Page : Résultats de recherche -----------------------------------
function renderSearchResults() {
  const q = state.searchQuery.trim();
  if (!q) return `<div class="hint" style="padding:20px">Entrez un terme pour rechercher dans le référentiel.</div>`;
  
  const results = searchProcesses(q);
  if (results.length === 0) return `<div class="hint" style="padding:20px">Aucun résultat pour « ${esc(q)} ».</div>`;
  
  const items = results.map((r, i) => {
    if (r.p) {
      return `<button class="search-result" data-id="${r.p.id}">
        <div>
          <div class="search-result__title">${r.p.code ? esc(r.p.code) + " · " : ""}${esc(r.p.title)}</div>
          <div class="search-result__type">${r.matchType}</div>
          <div class="search-result__excerpt">${r.matchContext}</div>
        </div>
      </button>`;
    } else if (r.glossaire) {
      return `<div class="search-result search-result--glossaire">
        <div>
          <div class="search-result__title">${esc(r.glossaire.sigle)}</div>
          <div class="search-result__type">Glossaire</div>
          <div class="search-result__excerpt">${esc(r.glossaire.def.substring(0, 100))}</div>
        </div>
      </div>`;
    } else if (r.annexe) {
      return `<button class="search-result" data-annexe="${r.annexe.n}">
        <div>
          <div class="search-result__title">Annexe ${r.annexe.n} — ${r.matchContext}</div>
          <div class="search-result__type">Annexe</div>
        </div>
      </button>`;
    }
  }).join("");
  
  return `
    <div class="search-header">
      <button class="back-btn" data-home>‹ Retour à l'accueil</button>
      <div class="search-title">Résultats pour « ${esc(q)} »</div>
    </div>
    <div class="hint">${results.length} résultat${results.length > 1 ? "s" : ""}</div>
    <div class="search-results">${items}</div>`;
}

// --- Rendu principal ----------------------------------------------------
function render() {
  document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("tab--active", b.dataset.tab === state.tab));
  
  // Mettre à jour le champ de recherche
  const searchInput = $("#search-input");
  if (searchInput) searchInput.value = state.searchQuery;
  
  if (state.searchQuery.trim()) {
    $("#main").innerHTML = renderSearchResults();
  } else if (state.tab === "process") {
    const n = state.nav;
    if (n.type === "parcours") $("#main").innerHTML = renderParcours(n.group);
    else if (n.type === "subparcours") $("#main").innerHTML = renderSubParcours(n.parentId);
    else if (n.type === "page" && n.key === "bonnes-pratiques") $("#main").innerHTML = renderBonnesPratiques();
    else if (n.type === "page" && n.key === "modalites") $("#main").innerHTML = renderModalites();
    else if (n.type === "page" && n.key === "glossaire") $("#main").innerHTML = renderGlossaire();
    else $("#main").innerHTML = renderHome();
    if (state.openAnnexe) { const el = document.getElementById("annexe-" + state.openAnnexe); if (el) el.scrollIntoView({ block: "start" }); }
  } else {
    $("#main").innerHTML = renderActorView();
  }
}

function goParcours(group) { state.tab = "process"; state.nav = { type: "parcours", group }; state.prospectionType = null; closeDetail(); render(); }

// --- Événements ---------------------------------------------------------

// Recherche
document.addEventListener("input", (e) => {
  if (e.target.id === "search-input") {
    state.searchQuery = e.target.value;
    render();
  }
});

document.addEventListener("click", (e) => {
  // Bouton de réinitialisation de recherche
  if (e.target.id === "search-clear") {
    state.searchQuery = "";
    render();
    const inp = $("#search-input");
    if (inp) inp.focus();
    return;
  }
  
  const t = e.target.closest("[data-tab],[data-id],[data-parcours],[data-subparcours],[data-page],[data-home],[data-type],[data-type-reset],[data-role-reset],[data-role],[data-layout],[data-annexe],[data-annexe-toggle],#drawer-close,#toggle-detail");
  if (!t) return;

  if (t.dataset.tab) { state.tab = t.dataset.tab; state.nav = { type: "home" }; state.prospectionType = null; state.openAnnexe = null; closeDetail(); render(); return; }
  if (t.hasAttribute("data-home")) { state.nav = { type: "home" }; state.prospectionType = null; state.openAnnexe = null; render(); return; }
  if (t.dataset.parcours) { goParcours(t.dataset.parcours); return; }
  if (t.dataset.subparcours) { state.tab = "process"; state.nav = { type: "subparcours", parentId: t.dataset.subparcours }; closeDetail(); render(); return; }
  if (t.dataset.page) { state.tab = "process"; state.nav = { type: "page", key: t.dataset.page }; state.openAnnexe = null; closeDetail(); render(); return; }
  if (t.dataset.type) { state.prospectionType = t.dataset.type; render(); return; }
  if (t.hasAttribute("data-type-reset")) { state.prospectionType = null; render(); return; }
  if (t.hasAttribute("data-role-reset")) { state.role = null; render(); return; }
  if (t.dataset.layout) { state.parcoursLayout = t.dataset.layout; render(); return; }
  if (t.dataset.annexe) { closeDetail(); state.tab = "process"; state.nav = { type: "page", key: "bonnes-pratiques" }; state.openAnnexe = t.dataset.annexe; render(); return; }
  if (t.dataset.annexeToggle) { state.openAnnexe = (String(state.openAnnexe) === t.dataset.annexeToggle) ? null : t.dataset.annexeToggle; render(); return; }
  if (t.dataset.role !== undefined && t.dataset.role !== "") { state.role = t.dataset.role; render(); return; }
  if (t.dataset.id) { openDetail(t.dataset.id); return; }
  if (t.id === "drawer-close") { closeDetail(); return; }
  if (t.id === "toggle-detail") {
    const body = $("#detail-body"); body.hidden = !body.hidden;
    t.textContent = body.hidden ? "Voir le détail complet ▸" : "Masquer le détail complet ▾";
    return;
  }
});

$("#drawer-overlay").addEventListener("click", (e) => { if (e.target.id === "drawer-overlay") closeDetail(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDetail(); });

// --- Initialisation des onglets -----------------------------------------
function initTabs() {
  const tabsNav = $("#tabs");
  if (tabsNav) {
    tabsNav.innerHTML = `
      <button class="tab tab--active" data-tab="process">Processus</button>
      <button class="tab" data-tab="actor">Par acteur</button>
    `;
  }
}

// Initialiser les onglets avant le rendu
initTabs();
render();
