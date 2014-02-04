## Le fichier manifeste

Une application peut exposer un fichier `manifest.json` à la racine de son répertoire.
Ce fichier permet à l'application d'exposer certaines informations au conteneur SNAP, comme l'icone à utiliser, la version de l'application, etc.

Le format est très fortement inspiré des fichiers `package.json` des modules NodeJS. 

**Exemple**
```json
{
  "name": "Mon Application SNAP",
  "version": "v0.0.0",
  "developpers": [
    "William PETIT <william.petit@lookingfora.name>",
  ],
  "icons": {
    "16": "icons/icon16x16.png",
    "32": "icons/icon32x32.png"
  },
  "repository": "https://github.com/Bornholm/snap.git"
}
```