# API 1 Geolocalización - Comparativa y justificación

| Criterio              | Google Maps Platform                       | Mapbox                          | Leaflet + OSM (elegida)                    |
| --------------------- | ------------------------------------------ | ------------------------------- | ------------------------------------------ |
| Funcionalidad         | Maps, Places, Routes, Geocoding            | Maps, Geocoding, Directions, GL | Mapa, marcadores, geocoding vía Nominatim  |
| Precisión / Cobertura | Máxima global + Street View                | Muy buena, estilo vectorial     | Buena en Neuquén/Cipolletti, suficiente TP |
| Integración React     | @react-google-maps/api, requiere loader    | mapbox-gl, requiere token       | react-leaflet, 2 líneas                    |
| Costo                 | 200 USD crédito, luego paga, exige tarjeta | 50k loads gratis, luego paga    | 100% gratis, sin tarjeta                   |
| Límites               | Cuota por SKU, bloquea sin billing         | Rate limit por token            | Política Nominatim 1 req/s                 |
| Acceso                | API Key + billing + restricciones HTTP     | Access Token + scopes           | Sin key                                    |

**Justificación ExpertoYa:** somos 3 estudiantes sin billing. Google/Mapbox frenan la demo si se acaba el crédito. OSM cumple ver profesionales + cercanos sin costo y sin exponer claves. Para el informe igual comparamos Google vs Mapbox como pide la issue y elegimos OSM por costo/restricción.
