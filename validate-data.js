#!/usr/bin/env node
/**
 * validate-data.js — Outil de validation du référentiel Business O2
 * 
 * Usage:
 *   node validate-data.js
 *   node validate-data.js data.js
 * 
 * Valide la structure, les références et la cohérence du fichier data.js
 * Retourne exit code 0 si valide, 1 si erreurs
 */

const fs = require('fs');
const path = require('path');

const dataFilePath = process.argv[2] || 'data.js';

let errors = [];
let warnings = [];
let stats = { processes: 0, annexes: 0, logigrammes: 0, roles: 0 };

// Charger data.js
let PROCESSES, ANNEXES, LOGIGRAMMES, GLOSSAIRE, MODALITES, ROLE_CATEGORIES, CATEGORY_COLORS;

try {
  const dataContent = fs.readFileSync(dataFilePath, 'utf8');
  // Créer un contexte d'exécution
  const context = {};
  const script = `
    (function() {
      ${dataContent}
      return {PROCESSES, ANNEXES, LOGIGRAMMES, GLOSSAIRE, MODALITES, ROLE_CATEGORIES, CATEGORY_COLORS};
    })()
  `;
  const result = eval(script);
  PROCESSES = result.PROCESSES;
  ANNEXES = result.ANNEXES;
  LOGIGRAMMES = result.LOGIGRAMMES;
  GLOSSAIRE = result.GLOSSAIRE;
  MODALITES = result.MODALITES;
  ROLE_CATEGORIES = result.ROLE_CATEGORIES;
  CATEGORY_COLORS = result.CATEGORY_COLORS;
} catch (e) {
  errors.push(`Erreur de syntaxe dans ${dataFilePath}: ${e.message}`);
  showResults();
  process.exit(1);
}

// --- PROCESSUS ---
if (!PROCESSES || !Array.isArray(PROCESSES)) {
  errors.push('[PROCESSUS] PROCESSES doit être un tableau');
} else {
  stats.processes = PROCESSES.length;
  const ids = new Set();
  const codes = new Set();

  PROCESSES.forEach((p, idx) => {
    const loc = `[PROCESSUS ${p.code || p.id || idx}]`;

    // ID unique
    if (!p.id) errors.push(`${loc} Pas d'ID`);
    else if (p.id.trim() === '') errors.push(`${loc} ID vide`);
    else if (ids.has(p.id)) errors.push(`${loc} ID dupliqué: "${p.id}"`);
    else ids.add(p.id);

    // Code unique (si fourni)
    if (p.code) {
      if (codes.has(p.code)) errors.push(`${loc} Code dupliqué: "${p.code}"`);
      else codes.add(p.code);
    }

    // Titre
    if (!p.title || p.title.trim() === '') errors.push(`${loc} Titre manquant`);

    // Groupe valide
    const validGroups = ['propre', 'dejeuner', 'franchise', 'communication', 'transverse', 'it_sub'];
    if (!p.group || !validGroups.includes(p.group)) {
      errors.push(`${loc} Groupe invalide: "${p.group}"`);
    }

    // Si transverse, doit avoir sousGroupe
    if (p.group === 'transverse' && (!p.sousGroupe || p.sousGroupe.trim() === '')) {
      errors.push(`${loc} Groupe "transverse" doit avoir un sousGroupe`);
    }

    // Si it_sub, ne doit pas avoir sousGroupe (c'est un enfant)
    if (p.group === 'it_sub' && p.sousGroupe) {
      warnings.push(`${loc} Groupe "it_sub" ne devrait pas avoir de sousGroupe`);
    }

    // Children valides
    if (p.children && Array.isArray(p.children)) {
      p.children.forEach((childId) => {
        if (!PROCESSES.find(pr => pr.id === childId)) {
          errors.push(`${loc} Enfant "${childId}" n'existe pas`);
        }
      });
    }

    // Annexes valides
    if (p.annexes && Array.isArray(p.annexes)) {
      p.annexes.forEach((annexeId) => {
        if (!ANNEXES || !ANNEXES[annexeId]) {
          errors.push(`${loc} Annexe ${annexeId} n'existe pas`);
        }
      });
    }
  });
}

// --- RACI ---
if (!Array.isArray(PROCESSES)) {
  errors.push('[RACI] Impossible de valider, PROCESSES manquant');
} else {
  PROCESSES.forEach((p) => {
    const loc = `[RACI ${p.code || p.id}]`;

    // Champs obligatoires
    if (!Array.isArray(p.responsables)) errors.push(`${loc} "responsables" doit être un tableau`);
    if (!Array.isArray(p.acteurs)) errors.push(`${loc} "acteurs" doit être un tableau`);
    if (!Array.isArray(p.contributeurs)) errors.push(`${loc} "contributeurs" doit être un tableau`);

    // Pas de "informes"
    if (p.informes !== undefined) {
      errors.push(`${loc} Le champ "informes" ne doit pas exister (supprimé en v1.1)`);
    }

    // Pas de rôle 'I'
    const allRoles = [...(p.responsables || []), ...(p.acteurs || []), ...(p.contributeurs || [])];
    allRoles.forEach((role) => {
      if (role && ROLE_CATEGORIES && !ROLE_CATEGORIES[role]) {
        errors.push(`${loc} Rôle inconnu: "${role}"`);
      }
    });
  });
}

// --- LIVRABLES ---
if (Array.isArray(PROCESSES)) {
  PROCESSES.forEach((p) => {
    if (p.livrables && Array.isArray(p.livrables)) {
      p.livrables.forEach((livrable) => {
        if (/✅|🟦|📥/.test(livrable)) {
          errors.push(`[LIVRABLE ${p.code || p.id}] Contient un ancien statut: "${livrable}"`);
        }
      });
    }
  });
}

// --- LOGIGRAMMES ---
if (LOGIGRAMMES && typeof LOGIGRAMMES === 'object') {
  Object.keys(LOGIGRAMMES).forEach((group) => {
    const lg = LOGIGRAMMES[group];
    if (!Array.isArray(lg)) {
      errors.push(`[LOGIGRAMMES] "${group}" doit être un tableau`);
      return;
    }
    
    lg.forEach((item, idx) => {
      const loc = `[LOGIGRAMMES ${group} #${idx}]`;
      
      if (!item.type) errors.push(`${loc} Pas de "type"`);
      
      if (item.type === 'step' && item.id) {
        if (!PROCESSES.find(p => p.id === item.id)) {
          errors.push(`${loc} Processus "${item.id}" n'existe pas`);
        }
      }
      
      if (item.type === 'branches' && item.branches) {
        item.branches.forEach((branch, bIdx) => {
          if (branch.ids && Array.isArray(branch.ids)) {
            branch.ids.forEach((id) => {
              if (!PROCESSES.find(p => p.id === id)) {
                errors.push(`${loc} Branche #${bIdx}: Processus "${id}" n'existe pas`);
              }
            });
          }
        });
      }
    });
  });
  stats.logigrammes = Object.keys(LOGIGRAMMES).length;
}

// --- ANNEXES ---
if (ANNEXES && typeof ANNEXES === 'object') {
  stats.annexes = Object.keys(ANNEXES).length;
  Object.keys(ANNEXES).forEach((n) => {
    const a = ANNEXES[n];
    if (!a.title || a.title.trim() === '') {
      errors.push(`[ANNEXE ${n}] Titre manquant`);
    }
  });
}

// --- GLOSSAIRE ---
if (GLOSSAIRE && Array.isArray(GLOSSAIRE)) {
  const sigles = new Set();
  GLOSSAIRE.forEach((g, idx) => {
    if (!g.sigle || g.sigle.trim() === '') errors.push(`[GLOSSAIRE #${idx}] Sigle manquant`);
    if (!g.def || g.def.trim() === '') errors.push(`[GLOSSAIRE ${g.sigle}] Définition manquante`);
    if (sigles.has(g.sigle)) errors.push(`[GLOSSAIRE] Sigle dupliqué: "${g.sigle}"`);
    else sigles.add(g.sigle);
  });
}

// --- MODALITES ---
if (MODALITES && typeof MODALITES === 'object') {
  if (MODALITES.raci) {
    if (MODALITES.raci.informes !== undefined) {
      errors.push('[MODALITES] Le champ "informes" du RACI ne doit pas exister');
    }
  }
}

// --- Affichage des résultats ---
function showResults() {
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✓ Validation réussie');
    console.log(`✓ ${stats.processes} processus contrôlés`);
    console.log('✓ RACI valide');
    console.log('✓ Références valides');
    console.log(`✓ ${stats.annexes} annexes valides`);
    console.log(`✓ ${stats.logigrammes} logigrammes valides`);
    console.log('✓ Livrables valides');
    console.log('✓ Rôles valides');
  } else {
    if (errors.length > 0) {
      console.log('✗ ERREUR(S)\n');
      errors.forEach((e) => console.log('  ' + e));
    }
    if (warnings.length > 0) {
      console.log('\n⚠ AVERTISSEMENT(S)\n');
      warnings.forEach((w) => console.log('  ' + w));
    }
  }
}

showResults();
process.exit(errors.length > 0 ? 1 : 0);
