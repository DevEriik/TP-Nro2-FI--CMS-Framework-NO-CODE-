# TP3 Actividad 1 Punto 3 - Dominios donde se prefiere SOAP frente a REST

## 1. Dominios elegidos

1. **Financiero / Bancario y pagos**
2. **Gobierno / Fiscal y tributario**
3. **Salud / Historia clínica interoperable**

Son dispares: dinero, estado y salud. Los 3 comparten: exigencia legal, datos sensibles y necesidad de contrato formal.

## 2. Análisis por dominio

### Dominio 1: Financiero (bancos, tarjetas, SWIFT)

**Ejemplo real:** Red SWIFT interbancaria, web services de bancos centrales, procesadoras de tarjetas. Operaciones `transferFunds, getBalance` con ACID.
**Requisitos que favorecen SOAP:**

- Transacciones atómicas y reversión (WS-AtomicTransaction). No se puede acreditar sin debitar.
- Seguridad mensaje a mensaje: WS-Security (firma + cifrado + timestamp + no repudio).
- Contrato WSDL+XSD estricto: valida montos, monedas ISO 4217, cuentas IBAN antes de ejecutar.
  **Ventaja SOAP / Límite vs REST:** Auditoría y cumplimiento PCI-DSS más simple con envelope firmado. REST con JSON+TLS es más liviano pero deja seguridad a la app y no garantiza entrega ordenada.
  **Límite de SOAP:** Verboso, más latencia para mobile banking de alto volumen.

### Dominio 2: Gobierno / Fiscal (AFIP, contrataciones, identidad)

**Ejemplo real:** AFIP WSFEv1 `FECAESolicitar` para CAE. También factura electrónica Chile SII, e-procurement estatal.
**Requisitos que favorecen SOAP:**

- Validez jurídica: certificado X.509 + CMS firmado + Token/Sign 12hs.
- Interoperabilidad entre organismos con stacks distintos (Java, .NET, PHP) gracias a WSDL estándar.
- Trazabilidad de errores formales `<Errors><Code><Msg>` exigida por RG.
  **Ventaja SOAP / Límite vs REST:** El estado impone el contrato, el privado solo lo consume sin ambigüedad. REST sería más simple pero permitiría payloads inválidos fiscalmente.
  **Límite de SOAP:** Homo/prod duplicados, alta fricción para desarrolladores chicos.

### Dominio 3: Salud (HCE, HL7, laboratorios)

**Ejemplo real:** HL7 v3 SOAP, IHE XDS.b para intercambio de historias clínicas, servicios de obras sociales para `getPatientRecord, createPrescription`.
**Requisitos que favorecen SOAP:**

- Confidencialidad + integridad por ley (datos sensibles). WS-Security con cifrado a nivel campo.
- Vocabularios controlados validados por XSD (CIE-10, SNOMED).
- Entrega confiable WS-ReliableMessaging: una receta no puede perderse.
  **Ventaja SOAP / Límite vs REST:** Interoperabilidad hospitalaria garantizada aunque cambie el vendor. REST/FHIR es más moderno y liviano, pero sin perfil estricto pierde seguridad formal.
  **Límite de SOAP:** Pesado para wearables/IoT en tiempo real.

## 3. Cuadro comparativo final

| Dominio    | Requisito crítico                   | Por qué SOAP conviene                                  | Por qué REST pierde                                    | Fuente                                  |
| ---------- | ----------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ | --------------------------------------- |
| Financiero | Atomicidad + no repudio + auditoría | WS-AtomicTransaction + WS-Security + WSDL estricto     | TLS solo a nivel transporte, sin firma por mensaje     | SWIFT Standards, PCI-DSS docs, W3C SOAP |
| Gobierno   | Validez legal + interop multi-stack | X.509 + CMS + contrato impuesto por Estado             | JSON flexible = riesgo fiscal                          | Manual AFIP WSFEv1 v4.0, doc WSAA       |
| Salud      | Privacidad + entrega garantizada    | Cifrado por campo + WS-ReliableMessaging + XSD clínico | FHIR/REST liviano pero exige perfilar seguridad aparte | HL7 v3, IHE XDS.b docs                  |

## 4. Conclusión fundamentada

Elegir SOAP cuando se cumplen 3 condiciones juntas:

1. **Contrato formal obligatorio:** un tercero (banco, estado, hospital) impone el esquema y no se puede negociar.
2. **Seguridad a nivel mensaje:** se exige firma, cifrado y no repudio más allá de HTTPS.
3. **Confiabilidad transaccional:** la operación no admite pérdida, duplicado o parcialidad (dinero, factura, receta).

Si falta alguna (ej: app pública de consulta sin valor legal), REST es mejor por ser liviano, cacheable y fácil en mobile. Por eso en ExpertoYa usamos REST para catálogo/reseñas, pero usaríamos SOAP para facturar ante AFIP.

## 5. Fuentes

1. W3C - SOAP 1.2 Primer / WS-Security.
2. AFIP - Manual WSFEv1 v4.0 y doc WSAA (enlace con issue #33).
3. SWIFT - Standards for financial messaging.
4. HL7 v3 / IHE ITI XDS.b - perfiles SOAP en salud.
5. Fielding - REST dissertation (para contraste liviano: JSON + HTTP + TLS).
