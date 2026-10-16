## 3. UDDI: registro y descubrimiento de servicios web

### 3.1. Definición y fundamento principal

**UDDI** (*Universal Description, Discovery and Integration*) es un estándar concebido para publicar, registrar y descubrir servicios web mediante un directorio organizado.

Tradicionalmente se comparaba con una «guía telefónica» que permitía encontrar organizaciones, identificar los servicios ofrecidos y consultar los datos técnicos de acceso.

### 3.2. Información que almacena UDDI

Un registro UDDI organiza los datos en las siguientes estructuras:

* **BusinessEntity:** representa al proveedor u organización que ofrece los servicios.
* **BusinessService:** describe un servicio o familia de servicios ofrecidos por la organización.
* **BindingTemplate:** contiene información técnica de acceso a una implementación (endpoints y referencias).
* **tModel:** representa referencias técnicas a especificaciones, interfaces WSDL o categorizaciones del servicio.

### 3.3. Relación entre UDDI, WSDL y SOAP

Las tres tecnologías forman la tríada clásica de servicios web basada en el ciclo **Publicar $\rightarrow$ Buscar $\rightarrow$ Enlazar**:

```
 [ Consumidor ]  --- 2. Buscar (UDDI) ---->  [ Registro UDDI ]
       |                                             ^
       |                                             | 1. Publicar (UDDI / WSDL)
       | <------- 3. Obtener WSDL -------------------+
       |
       +--------- 4. Invocar con SOAP -------------> [ Proveedor ]
       <--------- 5. Respuesta SOAP -----------------+
```

1. **Publicación:** *ExpertoYa* registra información del servicio en el directorio UDDI.
2. **Descubrimiento:** Una aplicación externa consulta UDDI buscando un servicio de profesionales.
3. **Descripción:** El consumidor obtiene el WSDL con los tipos, mensajes y endpoint.
4. **Consumo:** La aplicación prepara una solicitud SOAP y la envía al endpoint.
5. **Respuesta:** El proveedor procesa y devuelve los datos en SOAP.

### 3.4. Ejemplo y estado actual en ExpertoYa

Si una organización externa quisiera integrar su sistema con *ExpertoYa*, podría haber usado UDDI para localizar el WSDL del servicio. 

Sin embargo, **UDDI no es obligatorio** y su adopción en la industria fue sumamente limitada. En la actualidad, el descubrimiento de servicios se gestiona mediante catálogos de API, portales para desarrolladores, registros privados o documentación directa (como Swagger/OpenAPI). Para *ExpertoYa*, mantener un registro UDDI resultaría innecesario si las aplicaciones ya disponen de endpoints conocidos y documentación centralizada.
