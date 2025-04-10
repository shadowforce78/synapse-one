# 🧠 Synapse One — Roadmap

> Une plateforme de productivité modulaire pour écrire, organiser, automatiser et apprendre.  
> Projet initié par Adam Planque — 2025.

---

## ✅ Phase 1 — Markdown Editor (MVP)

### Objectif
Créer un éditeur markdown fonctionnel, fluide, avec preview et export.

### Tâches principales
- [x] Interface avec éditeur Markdown + preview (split view)
- [x] Rendu live avec `markdown-it` ou `remark`
- [x] Mode clair / sombre
- [x] Sauvegarde locale (`.md`)
- [x] Chargement / ouverture d’un fichier `.md`
- [x] Ajout prise en charge de `Latex` pour les formules mathématiques
- [x] Export PDF (via `html2pdf` ou `jsPDF`)
- [x] UI simple, propre, inspiration Obsidian / Notion

---

## 🔁 Phase 2 — Gestion de contenu & Liens

### Objectif
Structurer, organiser, et relier les notes.

### Tâches principales
- [ ] Système de dossiers / catégories
- [ ] Tags + système de recherche
- [ ] Liens bi-directionnels entre notes
- [ ] Graph de notes (avec `react-force-graph` ou `vis.js`)
- [ ] Mini-index global des notes

---

## 📅 Phase 3 — Dashboard & Productivité

### Objectif
Ajouter un cockpit de productivité pour centraliser les tâches.

### Tâches principales
- [ ] To-do list avec priorités
- [ ] Suivi de projet (kanban ou timeline)
- [ ] Pomodoro intégré
- [ ] Bloc note rapide
- [ ] Intégration Google Calendar (optionnel)

---

## ⚙️ Phase 4 — Automatisations

### Objectif
Permettre la création de scripts personnalisés sur événements.

### Tâches principales
- [ ] Système de scripts (Node.js / Python)
- [ ] Déclencheurs : ouverture / sauvegarde / intervalle
- [ ] Interface simple pour ajouter / activer un script
- [ ] Exemple : exporter toutes les notes d’un dossier

---

## 🎓 Phase 5 — Apprentissage et révisions

### Objectif
Transformer les notes en flashcards et quizz interactifs.

### Tâches principales
- [ ] Générateur de flashcards (via `Q:` / `A:` ou balises)
- [ ] Algorithme de répétition espacée (SRS)
- [ ] Statistiques d’apprentissage
- [ ] Quiz auto-générés

---

## ☁️ Phase 6 — Sync & Collaboration (optionnel)

### Objectif
Permettre la collaboration et la synchronisation cloud.

### Tâches principales
- [ ] Création de comptes utilisateurs
- [ ] Synchronisation cloud (Nextcloud / Dropbox / serveur perso)
- [ ] Collaboration temps réel (via WebSocket ou CRDT)
- [ ] Chiffrement local + sync chiffrée

---

## 🚀 À venir
- Marketplace de modules communautaires ?
- Intelligence artificielle pour résumer / restructurer les notes ?
- Thèmes custom ?
