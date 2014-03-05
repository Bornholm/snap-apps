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

  - `key` __String__  _La clé associée à la valeur à retrouver_
  - `callback(err, value)` __Function__ _La fonction de rappel qui sera invoquée lors de la réponse du service_
      - `err`  __Object__  _Si différent de `null`, une erreur s'est produite lors de l'appel au service_
      - `value`  __*__  _La valeur associée à la clé dans la base de données_

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

  - `key` __String__  _La clé associée à la valeur_
  - `value` __Array | Object | String | Number__  _La valeur à stocker_
  - `callback(err)` __Function__ _La fonction de rappel qui sera invoquée lors de la réponse du service_
      - `err`  __Object__  _Si différent de `null`, une erreur s'est produite lors de l'appel au service_

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
  - `callback(err)` __Function__ _La fonction de rappel qui sera invoquée lors de la réponse du service_
      - `err`  __Object__  _Si différent de `null`, une erreur s'est produite lors de l'appel au service_

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

Effectue une série d'opérations put/del sur la base de donnée

** Arguments **

  - `batch` __Array[Object]__  _Tableau des opérations à effectuer, voir ci dessous_
  - `callback(err)` __Function__ _La fonction de rappel qui sera invoquée lors de la réponse du service_
      - `err`  __Object__  _Si différent de `null`, une erreur s'est produite lors de l'appel au service_

** Les opérations **

Une opération est un objet avec les propriétés suivantes

  - `type` __'del' | 'put'__ _Type d'opération à effectuer_
  - `key` __String__ _La clé sur laquelle effectuer l'opération_
  - `value` __*__ Dans le cas d'une opération 'put', la valeur à affecter à la clé

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

### appStorage.find(query, opts, callback)