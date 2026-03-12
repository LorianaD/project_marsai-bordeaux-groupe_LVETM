-- Ajoute la colonne day (YYYY-MM-DD) pour grouper les créneaux par jour.
-- Exécuter une fois depuis la racine du back :
--   node -e "require('./src/db/index.js').pool.execute('ALTER TABLE conference_program ADD COLUMN day VARCHAR(10) NULL AFTER time').then(()=>{console.log('Migration OK');process.exit(0);}).catch(e=>{console.error(e);process.exit(1);})"
-- Ou en MySQL : ALTER TABLE conference_program ADD COLUMN day VARCHAR(10) NULL AFTER time;
ALTER TABLE conference_program ADD COLUMN day VARCHAR(10) NULL AFTER time;
