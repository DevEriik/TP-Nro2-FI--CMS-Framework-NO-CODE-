## 4. Aspectos de seguridad del protocolo SOAP

### 4.1. Importancia de la seguridad

Los servicios web intercambian datos personales, credenciales y transacciones. Una brecha podría comprometer la privacidad o permitir operaciones indebidas. En *ExpertoYa*, un servicio de consulta debe asegurar que los perfiles públicos no se adulteren y que la información sensible (pagos, teléfonos, credenciales) esté estrictamente resguardada.

### 4.2. Seguridad a nivel de transporte: HTTPS y TLS

HTTPS aplica TLS (*Transport Layer Security*) para proteger el canal:
* **Confidencialidad:** Cifra la información transmitida entre cliente y servidor.
* **Integridad:** Detecta si los paquetes fueron manipulados en el canal.
* **Autenticación del servidor (y opcionalmente del cliente):** Valida la identidad mediante certificados digitales X.509.

> **Limitación:** TLS protege la conexión punto a punto. Si el mensaje pasa por proxies o intermediarios que terminan la sesión TLS, el mensaje queda expuesto en claro en dichos nodos.

### 4.3. Seguridad a nivel de mensaje: WS-Security

**WS-Security** incorpora mecanismos de seguridad directamente en las cabeceras (`soap:Header`) del mensaje XML:
* **Tokens y certificados:** Transporte de identidades mediante `UsernameToken`, certificados X.509 o tokens SAML.
* **XML Signature:** Firma digital de partes específicas del mensaje para garantizar su autoría e integridad de extremo a extremo, independientemente de los intermediarios.
* **XML Encryption:** Cifrado de elementos específicos dentro del `Body` o `Header`.
* **Timestamps y Nonces:** Inclusión de marcas temporales e identificadores únicos para mitigar ataques de repetición (*replay attacks*).

### 4.4. Principales propiedades de seguridad

* **Autenticación:** Verificar quién es el emisor (credenciales, certificados, tokens).
* **Autorización:** Comprobar si la identidad autenticada tiene permisos para invocar una operación o leer un recurso.
* **Integridad:** Garantizar que los datos no hayan sido modificados en tránsito.
* **Confidencialidad:** Impedir la lectura del mensaje a terceros no autorizados.
* **No repudio:** Imposibilitar que el emisor niegue haber enviado el mensaje (apoyado en firmas digitales y auditoría de claves).

### 4.5. Riesgos de seguridad y medidas preventivas

* **Acceso no autorizado:** Mitigado con esquemas robustos de autenticación y control de acceso basado en roles (RBAC).
* **Intercepción y manipulación:** Mitigado con HTTPS/TLS y XML Signature / Encryption.
* **Ataques de repetición:** Mitigado con marcas de tiempo (*timestamps*) y *nonces* de corta duración.
* **Ataques XML (XXE / DoS):** Inyección de entidades externas o estructuras recursivas (Billion Laughs). Se mitiga deshabilitando el procesamiento de `DTD` y entidades externas en el parser XML.
* **XML Signature Wrapping (XSW):** Manipulación de la envoltura XML donde se valida una firma pero se procesa un nodo diferente. Se previene validando rutas y esquemas estrictos sobre el payload consumido.
* **Exposición de información sensible:** Ocultar stack traces y detalles internos en los elementos `soap:Fault`.

### 4.6. Aplicación de la seguridad a ExpertoYa

En *ExpertoYa*, la seguridad debe implementarse en capas:
1. Transporte HTTPS obligatorio con certificados válidos.
2. Autenticación y autorización estricta para determinar qué campos puede ver cada consumidor (un cliente común ve oficio y calificación; un administrador puede acceder a auditoría de identidad).
3. Sanitización y validación del esquema XML para evitar inyecciones y ataques XXE.

