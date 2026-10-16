## 1. SOAP: arquitectura y componentes principales

### 1.1. Definición y finalidad

**SOAP** (*Simple Object Access Protocol*) es un protocolo de comunicación que permite intercambiar información estructurada entre aplicaciones mediante mensajes en formato **XML** (*Extensible Markup Language*). Su finalidad es establecer reglas comunes para que distintos sistemas puedan comunicarse, independientemente del lenguaje de programación o de la plataforma en la que estén desarrollados.

Por ejemplo, una aplicación desarrollada en Java puede comunicarse con un servicio implementado en C# mediante SOAP, siempre que ambos sistemas respeten las especificaciones y el contrato de comunicación establecido.

SOAP se utiliza principalmente en servicios web que necesitan intercambiar información o ejecutar operaciones de manera estructurada. En *ExpertoYa*, una aplicación externa podría solicitar los datos de un profesional registrado en la plataforma. Para hacerlo, enviaría una solicitud con el identificador del profesional y recibiría una respuesta con información como su nombre, oficio, matrícula verificada y calificación promedio.

Entre las características principales de SOAP se encuentran:

* **Interoperabilidad:** permite la comunicación entre aplicaciones desarrolladas con tecnologías diferentes.
* **Estructura formal:** establece reglas para organizar las solicitudes, las respuestas y los errores.
* **Extensibilidad:** permite incorporar información adicional en las cabeceras, como elementos relacionados con la seguridad o el procesamiento del mensaje.
* **Tipado de datos:** puede utilizar XML Schema (XSD) para definir y validar los tipos y las estructuras de la información.
* **Contrato técnico:** puede complementarse con WSDL, que describe las operaciones disponibles y cómo invocarlas.
* **Flexibilidad de transporte:** puede utilizar HTTP o HTTPS y, según la implementación, otros mecanismos de transporte compatibles.

> **Nota:** SOAP define cómo se estructuran y procesan los mensajes, pero no establece por sí solo toda la lógica de negocio del servicio ni garantiza automáticamente la seguridad de la comunicación.

### 1.2. Arquitectura y funcionamiento

En una comunicación SOAP intervienen principalmente dos participantes:
* **Cliente o consumidor:** aplicación que solicita información o requiere la ejecución de una operación.
* **Servidor o proveedor:** sistema que recibe la solicitud, procesa la operación y devuelve una respuesta.

También pueden participar intermediarios que procesan determinadas partes del mensaje antes de que llegue al destinatario final.

El funcionamiento básico se desarrolla de la siguiente manera:
1. El cliente identifica la operación que necesita realizar y prepara una solicitud SOAP.
2. La solicitud se estructura mediante XML y se envía al *endpoint* del servicio utilizando un mecanismo de transporte compatible.
3. El servidor recibe el mensaje, verifica su estructura y procesa la operación solicitada.
4. El servidor genera una respuesta SOAP con el resultado o, si ocurre un problema, con información sobre el error.
5. El cliente recibe la respuesta y utiliza los datos obtenidos.

En el caso de *ExpertoYa*, el cliente podría solicitar el profesional con identificador `1042`. El servidor procesaría la consulta y devolvería los datos correspondientes, siempre que la solicitud esté autorizada y el profesional exista.

En la arquitectura tradicional de servicios web también se distinguen tres roles:
* **Proveedor:** publica y mantiene el servicio.
* **Consumidor:** busca y utiliza el servicio.
* **Registro:** permite localizar servicios publicados.

Estos roles se relacionan con las acciones de **publicar**, **buscar** y **enlazar**. UDDI puede cumplir la función de registro, WSDL describe técnicamente el servicio y SOAP permite intercambiar los mensajes.

No obstante, esta arquitectura no exige utilizar UDDI en todos los casos. Un consumidor también puede obtener el WSDL directamente del proveedor.

### 1.3. Componentes principales de un mensaje SOAP

Un mensaje SOAP es un documento XML que posee una estructura definida. Sus componentes principales son los siguientes:

1. **Envelope (envoltura):** es el elemento raíz del mensaje. Identifica el documento como un mensaje SOAP y contiene los demás elementos. Es obligatorio.
2. **Header (cabecera):** es un elemento opcional que permite incluir información complementaria, como credenciales, firmas digitales, datos de seguridad o instrucciones de procesamiento.
3. **Body (cuerpo):** contiene la información principal de la solicitud o respuesta. Puede incluir la operación que se desea ejecutar, los parámetros enviados o los resultados obtenidos. Es obligatorio.
4. **Fault (error):** es un elemento especial que se incorpora dentro del cuerpo cuando se necesita informar un error de procesamiento. Puede indicar, por ejemplo, que la solicitud tiene una estructura incorrecta o que no se pudo completar una operación.

Un mensaje SOAP simplificado tiene la siguiente estructura:

```xml
<soap:Envelope
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">

    <soap:Header/>

    <soap:Body>
        <!-- Datos de la solicitud o respuesta -->
    </soap:Body>

</soap:Envelope>
```

En este ejemplo, `Envelope` contiene todo el mensaje, `Header` está vacío y `Body` representa la parte en la que se incorporaría la información de la operación. La estructura exacta del espacio de nombres depende de la versión de SOAP utilizada (el ejemplo anterior corresponde al espacio de nombres de SOAP 1.1).

### 1.4. XML y protocolos de transporte

XML permite organizar la información mediante etiquetas y estructuras jerárquicas. SOAP utiliza este formato para representar los datos de manera estandarizada.

Por ejemplo, el nombre de un profesional puede representarse como:
```xml
<nombre>Carlos Méndez</nombre>
```
Esto facilita que diferentes aplicaciones interpreten la información de acuerdo con un esquema común.

Para definir los tipos de datos y las restricciones que deben cumplir los documentos XML, se puede utilizar **XML Schema (XSD)**. Este mecanismo permite establecer, por ejemplo, que un identificador sea un número entero, que un nombre sea una cadena de texto o que una calificación tenga un valor decimal.

SOAP también puede utilizar distintos protocolos de transporte. HTTP y HTTPS son los más habituales en los servicios web, aunque existen implementaciones que emplean otros mecanismos compatibles (SMTP, JMS, etc.).

En conclusión, SOAP proporciona una estructura formal para el intercambio de información y facilita la interoperabilidad entre aplicaciones que respetan sus especificaciones.