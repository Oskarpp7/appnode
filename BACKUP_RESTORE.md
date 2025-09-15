# Procediment de restauració des d'un backup Git

## 1. Localitza la branch de backup

La branch de backup creada automàticament segueix el format:

    backup/YYYYMMDD

Exemple: `backup/20250915`

## 2. Recupera l'estat del backup

Des de la línia de comandes, executa:

    git fetch origin
    git checkout backup/20250915

Això et situarà a la branch de backup amb l'estat exacte del moment del backup.

## 3. Opcions de restauració

- **Restaurar completament:** Pots continuar treballant sobre la branch de backup o fer merge/rebase cap a la branch principal:

      git checkout main
      git merge backup/20250915

- **Recuperar fitxers concrets:** Si només vols restaurar fitxers específics:

      git checkout backup/20250915 -- ruta/al/fitxer

## 4. Recomanacions

- No facis canvis directament a la branch de backup; crea una branch nova si cal fer modificacions.
- Elimina branches de backup antigues si ja no són necessàries per mantenir el repositori net.

## 5. Referència

- [Documentació oficial Git](https://git-scm.com/doc)
- [Procediments d'emergència](./DOCUMENTACIO_TECNICA.md)

---

*Documentat automàticament per GitHub Copilot el 15/09/2025.*
