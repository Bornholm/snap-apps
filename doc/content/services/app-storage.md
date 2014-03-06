# Le service appStorage

Le service appStorage met a disposition des Apps une base de données clé/valeur dédiée.
Une App peut utiliser ce service afin de faire persister des informations entre plusieurs sessions de travail d'un utilisateur.

## Utilisation

```javascript
Snap.ready(function(err, services) {

  // Commencer à utiliser le service
  services.appStorage.get('my-key', function(err, value) {
    if(err) {
      // Quelque chose s'est mal passé...
    } else {
      // Faire quelque chose avec _value_
    }
  });

});
```

## Base de données utilisateur / partagée

Le service appStorage expose deux types de base de données: une base spécifique à l'utilisateur courant et une base partagée entre tous les utilisateurs.
Toutes les méthodes décrites ci-après ont une méthode 'jumelle' permettant de travailler avec la base de données partagée. Le nommage de ces méthodes suit le modèle `[nom méthode]() -> [nom méthode]Shared()`.

** Exemples **
- get() -> getShared()
- put() -> putShared()

## Méthodes

### appStorage.get(key, callback)

Retrouve une valeur associée à une clé dans la base de données

** Arguments **

  - `key` __String__  La clé associée à la valeur à retrouver
  - `callback(err, value)` __Function__ La fonction de rappel qui sera invoquée lors de la réponse du service
      - `err`  __Object__  Si différent de `null`, une erreur s'est produite lors de l'appel au service
      - `value`  __*__  La valeur associée à la clé dans la base de données

** Exemple **

```javascript
services.appStorage.get('my-key', function(err, value) {
  if(err) {
    throw err; // Une erreur s'est produite
  }
  console.log(value); // On affiche la valeur dans la console
});
```

### appStorage.put(key, value, callback)

Stocke une valeur associée à une clé dans la base de données

** Arguments **

  - `key` __String__  La clé associée à la valeur
  - `value` __Array | Object | String | Number__  La valeur à stocker
  - `callback(err)` __Function__ La fonction de rappel qui sera invoquée lors de la réponse du service
      - `err`  __Object__  Si différent de `null`, une erreur s'est produite lors de l'appel au service

** Exemple **

```javascript
var value = {
  foo: 'bar'
};
services.appStorage.put('my-key', value, function(err) {
  if(err) {
    throw err; // Une erreur s'est produite
  } else {
    // La valeur a été stockée
  }
});
```

### appStorage.del(key, callback)

Supprime une valeur associée à une clé dans la base de données

** Arguments **

  - `key` __String__  _La clé associée à la valeur_
  - `callback(err)` __Function__ La fonction de rappel qui sera invoquée lors de la réponse du service
      - `err`  __Object__  Si différent de `null`, une erreur s'est produite lors de l'appel au service

** Exemple **

```javascript
services.appStorage.del('my-key', function(err) {
  if(err) {
    throw err; // Une erreur s'est produite
  } else {
    // La valeur a été supprimée
  }
});
```

### appStorage.batch(batch, callback)

Effectue une série d'opérations put/del sur la base de données

** Arguments **

  - `batch` __Array[Object]__  Tableau des opérations à effectuer, voir ci dessous
  - `callback(err)` __Function__ La fonction de rappel qui sera invoquée lors de la réponse du service
      - `err`  __Object__  Si différent de `null`, une erreur s'est produite lors de l'appel au service

** Les opérations **

Une opération est un objet avec les propriétés suivantes

  - `type` __'del' | 'put'__ _Type d'opération à effectuer_
  - `key` __String__ _La clé sur laquelle effectuer l'opération_
  - `value` __Object | Number | String | Array__ Dans le cas d'une opération 'put', la valeur à affecter à la clé

** Exemple **

```javascript
var batch = [
  {type: 'put', key: 'my-key-1', value: {foo: 'bar'}},
  {type: 'del', key: 'my-key-2'},
  {type: 'put', key: 'my-key-3', value: "Hello world !"}
];

services.appStorage.batch(batch, function(err) {
  if(err) {
    throw err; // Une erreur s'est produite
  } else {
    // Les opérations ont été effectuées correctement
  }
});
```

### appStorage.find(filter, options, callback)

Effectue une recherche sur la base de données

** Arguments **

  - `filter` __Object__ Filtre au format [sift.js](https://github.com/crcn/sift.js)
  - `options` __Object__ Options à passer à la méthode [levelup.createReadStream()](https://github.com/rvagg/node-levelup#dbcreatereadstreamoptions)
  - `callback(err, results)` __Function__ La fonction de rappel qui sera invoquée lors de la réponse du service
      - `err`  __Object__  Si différent de `null`, une erreur s'est produite lors de l'appel au service
      - `results`  __Array[Object]__  Résultat de la requête, chaque entrée ayant les propriétés `key` et `value`

** Exemple **
```javascript
var filter = {
  amount: { $gte: 5 } // On veut récupérer toutes les entrées comportant une propriété amount >= 5
};

var options = {
  start: 'stock-' // On veut commencer la recherche sur les entrées ayant une clé commençant par 'stock-'
  end: 'stock.' // On arrête la recherche lorsque la clé ne commence plus par 'stock-' -> charCode('.') = charCode('-') + 1
};

services.appStorage.find(filter, options, function(err, results) {
  if(err) {
    throw err; // Une erreur s'est produite
  } else {
    console.log(results);
  }
});
```