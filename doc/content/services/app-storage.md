## Le service `appStorage`

Le service `appStorage` met a disposition des Apps une 'micro' base de données.

### Utilisation

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
### Méthodes

- `appStorage.get(key, callback)`
- `appStorage.put(key, value, callback)`
- `appStorage.del(key, callback)`
- `appStorage.batch(batch, callback)`
- `appStorage.find(query, opts, callback)`