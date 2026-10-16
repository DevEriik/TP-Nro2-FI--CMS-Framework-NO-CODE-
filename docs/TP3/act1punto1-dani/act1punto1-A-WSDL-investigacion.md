## 2. WSDL: descripción de servicios web

### 2.1. Definición y relación con SOAP

**WSDL** (*Web Services Description Language*) es un lenguaje basado en XML que permite describir técnicamente un servicio web. Funciona como un **contrato** entre el proveedor y el consumidor, ya que especifica qué operaciones ofrece el servicio, qué mensajes recibe y devuelve, qué tipos de datos utiliza y cuál es su punto de acceso.

Su relación con SOAP es complementaria:
* **SOAP** define cómo se estructuran y procesan los mensajes.
* **WSDL** describe cómo debe utilizarse el servicio.

Por ejemplo, WSDL puede especificar que *ExpertoYa* ofrece una operación llamada `obtenerProfesional`, que recibe un identificador numérico y devuelve información sobre el profesional consultado. De esta manera, una aplicación externa puede conocer cómo comunicarse con el servicio sin necesitar conocer todos los detalles internos de su implementación.

> WSDL 1.1 es una versión ampliamente utilizada en servicios SOAP tradicionales. También existe WSDL 2.0, que presenta diferencias en su estructura y terminología.

### 2.2. Elementos principales de WSDL

Un documento WSDL 1.1 incluye varios elementos que describen diferentes aspectos del servicio:

* **Tipos de datos (`types`):** definen la estructura y los tipos de la información que se intercambia, generalmente mediante XML Schema (XSD). En *ExpertoYa*, un identificador puede definirse como entero, nombre y oficio como texto, verificación de matrícula como booleano y calificación como decimal.
* **Mensajes (`message`):** describen la información que se envía o recibe. Un mensaje puede representar los parámetros de entrada de una solicitud o los datos de salida de una respuesta.
* **Operaciones (`operation`):** representan las acciones que ofrece el servicio. Cada operación puede definir mensajes de entrada, salida y errores.
* **Interfaz abstracta (`portType`):** agrupa las operaciones que ofrece el servicio y define sus intercambios de mensajes de forma abstracta.
* **Vinculación (`binding`):** establece cómo se implementa técnicamente la interfaz, especificando aspectos como el protocolo utilizado (ej. SOAP sobre HTTP) y el formato (`document/literal`).
* **Servicio y endpoint (`service` y `port`):** el elemento `service` agrupa los puntos de acceso, y `port` vincula una interfaz concreta con una dirección física de acceso (*endpoint*), indicada en el atributo `location` de `soap:address`.

### 2.3. Ejemplo aplicado a ExpertoYa

A continuación se presenta un contrato WSDL 1.1 simplificado para un servicio denominado `ProfesionalService`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions
    name="ProfesionalService"
    targetNamespace="https://expertoya.example/ws/profesional"
    xmlns="http://schemas.xmlsoap.org/wsdl/"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:tns="https://expertoya.example/ws/profesional">

    <!-- 1. TIPOS DE DATOS -->
    <types>
        <xsd:schema targetNamespace="https://expertoya.example/ws/profesional">

            <xsd:element name="ObtenerProfesionalRequest">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element name="idProfesional" type="xsd:int"/>
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>

            <xsd:element name="ObtenerProfesionalResponse">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element name="idProfesional" type="xsd:int"/>
                        <xsd:element name="nombre" type="xsd:string"/>
                        <xsd:element name="oficio" type="xsd:string"/>
                        <xsd:element name="matriculaVerificada" type="xsd:boolean"/>
                        <xsd:element name="calificacionPromedio" type="xsd:decimal"/>
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>

        </xsd:schema>
    </types>

    <!-- 2. MENSAJES -->
    <message name="ObtenerProfesionalIn">
        <part name="parameters" element="tns:ObtenerProfesionalRequest"/>
    </message>

    <message name="ObtenerProfesionalOut">
        <part name="parameters" element="tns:ObtenerProfesionalResponse"/>
    </message>

    <!-- 3. OPERACIÓN -->
    <portType name="ProfesionalPortType">
        <operation name="obtenerProfesional">
            <input message="tns:ObtenerProfesionalIn"/>
            <output message="tns:ObtenerProfesionalOut"/>
        </operation>
    </portType>

    <!-- 4. VINCULACIÓN CON SOAP -->
    <binding name="ProfesionalBinding" type="tns:ProfesionalPortType">
        <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="obtenerProfesional">
            <soap:operation soapAction="obtenerProfesional"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>

    <!-- 5. SERVICIO Y ENDPOINT -->
    <service name="ProfesionalService">
        <port name="ProfesionalPort" binding="tns:ProfesionalBinding">
            <soap:address location="https://api.expertoya.example/soap/profesional"/>
        </port>
    </service>

</definitions>
```

#### Identificación de elementos en el ejemplo

| Elemento | Ubicación en el ejemplo | Función dentro de ExpertoYa |
| :--- | :--- | :--- |
| **Tipos de datos** | `types` y sus elementos XSD | Define el identificador, nombre, oficio, matrícula y calificación. |
| **Mensajes** | `ObtenerProfesionalIn` y `ObtenerProfesionalOut` | Determina qué información se envía y qué información se recibe. |
| **Operación** | `obtenerProfesional` dentro de `portType` | Representa la acción de consultar un profesional. |
| **Endpoint** | `soap:address`, atributo `location` | Indica la dirección de red donde se encuentra el servicio. |
| **Vinculación** | `ProfesionalBinding` | Especifica cómo se comunica la operación mediante SOAP sobre HTTP. |

### 2.4. Consumo del servicio: solicitud y respuesta SOAP

Supongamos que una aplicación externa necesita consultar al profesional cuyo identificador es `1042`.

#### Solicitud SOAP
```xml
<soap:Envelope
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ex="https://expertoya.example/ws/profesional">

    <soap:Body>
        <ex:ObtenerProfesionalRequest>
            <ex:idProfesional>1042</ex:idProfesional>
        </ex:ObtenerProfesionalRequest>
    </soap:Body>

</soap:Envelope>
```

#### Respuesta SOAP
```xml
<soap:Envelope
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ex="https://expertoya.example/ws/profesional">

    <soap:Body>
        <ex:ObtenerProfesionalResponse>
            <ex:idProfesional>1042</ex:idProfesional>
            <ex:nombre>Carlos Méndez</ex:nombre>
            <ex:oficio>Plomero</ex:oficio>
            <ex:matriculaVerificada>true</ex:matriculaVerificada>
            <ex:calificacionPromedio>4.8</ex:calificacionPromedio>
        </ex:ObtenerProfesionalResponse>
    </soap:Body>

</soap:Envelope>
```

En la práctica, el consumidor podría obtener el WSDL agregando `?wsdl` a la URL del servicio (según la configuración del servidor) o importarlo en herramientas como **SoapUI** para generar pruebas automáticamente.
