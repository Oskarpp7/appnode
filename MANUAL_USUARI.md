# 📖 Manual d'Usuari - Sistema de Gestió Escolar

## 🏠 Pàgina Principal i Navegació

### Accés al Sistema
1. **URL:** http://localhost:5173
2. **Login:** Utilitza les credencials proporcionades pel centre
3. **Dashboard:** Cada rol té un dashboard personalitzat

### Navegació Principal
- **Logo:** Torna a la pàgina principal
- **Menú Superior:** Navegació entre seccions
- **Avatar Usuari:** Menú desplegable amb opcions de perfil

---

## 👤 Dashboards per Rol

### 🔧 SUPER_ADMIN
- **Gestió de Tenants:** Crear i configurar centres educatius
- **Monitorització Global:** Estadístiques de tots els centres
- **Configuració del Sistema:** Paràmetres globals

### 🏢 ADMIN_CENTRE
- **Gestió d'Usuaris:** Crear coordinadors, monitors i famílies
- **Configuració del Centre:** Horaris, serveis, grups
- **Informes Globals:** Estadístiques del centre complet

### 📋 COORDINADOR
- **Gestió d'Estudiants:** Crear, editar i eliminar estudiants
- **Assignació de Grups:** Organització acadèmica
- **Coordinació de Monitors:** Supervisió del personal

### 👨‍🏫 MONITOR
- **Consulta d'Estudiants:** Veure informació dels seus estudiants
- **Registre d'Assistència:** Marcar presència/absència
- **Comunicació amb Famílies:** Missatges i notificacions

### 👨‍👩‍👧‍👦 FAMILIA
- **Informació dels Fills:** Dades acadèmiques i mèdiques
- **Comunicació amb el Centre:** Missatges del personal
- **Documentació:** Descarregar informes i documents

---

## 🎓 Gestió d'Estudiants

### Crear Nou Estudiant
1. **Accés:** Menú "Estudiants" → "Afegir Nou"
2. **Informació Bàsica:**
   - Nom complet obligatori
   - Data de naixement
   - Lloc de naixement
   - Sexe i documentació

3. **Dades de Contacte:**
   - Adreça completa
   - Telèfons de contacte
   - Email (opcional)

4. **Informació Acadèmica:**
   - Curs actual
   - Grup/Classe
   - Necessitats educatives especials

### Gestió de Tutors
1. **Afegir Tutor:**
   - Botó "Afegir Tutor" al formulari
   - Completa informació personal
   - Selecciona relació familiar
   - Configura autoritzacions

2. **Tipus d'Autoritzacions:**
   - ✅ **Recollir l'estudiant**
   - ✅ **Decisions mèdiques**
   - ✅ **Contacte d'emergència**
   - ✅ **Comunicacions del centre**

3. **Validacions:**
   - DNI/NIE format correcte
   - No duplicats dins del sistema
   - Telèfon obligatori per emergències

### Informació Mèdica
1. **Dades Sanitàries:**
   - Targeta sanitària (CIP)
   - Centre de salut assignat
   - Al·lèrgies conegudes

2. **Gestió d'Al·lèrgies:**
   - Sistema de tags dinàmic
   - Nivell de gravetat
   - Protocol d'actuació

3. **Medicaments:**
   - Llista de medicaments habituals
   - Dosis i freqüència
   - Observacions especials

### Sistema de Documents
1. **Tipus de Documents:**
   - 📄 DNI/NIE
   - 🏥 Targeta sanitària
   - 📋 Informes mèdics
   - ✍️ Autoritzacions
   - 📸 Fotografies

2. **Pujar Documents:**
   - Drag & drop o selecció
   - Formats acceptats: PDF, JPG, PNG
   - Mida màxima: 5MB per fitxer
   - Validació automàtica

3. **Gestió de Documents:**
   - Previsualització automàtica
   - Control d'expiració
   - Estats: Pendent → Verificat → Caducat

---

## 🔍 Funcionalitats Avançades

### Cerca i Filtres
- **Cerca General:** Nom, DNI, curs
- **Filtres per Curs:** Selecció múltiple
- **Filtres per Grup:** Organització específica
- **Estat del Documenti:** Verificats, pendents, caducats

### Validacions en Temps Real
- **DNI/NIE:** Format espanyol estàndard
- **Emails:** Validació RFC completa
- **Telèfons:** Formats nacionals i internacionals
- **Dates:** Control de lògica temporal

### Sistema de Notificacions
- **Documents Caducats:** Alertes automàtiques
- **Informació Incompleta:** Avisos prioritaris
- **Canvis Importants:** Notificació a tutors

---

## ⚙️ Configuració i Preferències

### Configuració de Perfil
1. **Dades Personals:** Nom, email, telèfon
2. **Preferències:** Idioma, notificacions
3. **Seguretat:** Canvi de contrasenya

### Configuració del Centre (Admins)
1. **Informació Bàsica:** Nom, adreça, contacte
2. **Horaris:** Configuració d'horaris d'obertura
3. **Serveis:** Menjador, transport, extraescolars
4. **Cursos i Grups:** Estructura acadèmica

---

## 🔒 Seguretat i Privacitat

### Control d'Accés
- **Sessions Temporitzades:** Caducitat automàtica
- **Rols Estrictes:** Accés només a dades autoritzades
- **Auditoria:** Registre de totes les accions

### Protecció de Dades (RGPD)
- **Consentiment Informat:** Autoritzacions específiques
- **Dret a l'Oblit:** Eliminació completa de dades
- **Portabilitat:** Exportació de dades personals
- **Transparència:** Informació sobre ús de dades

---

## 🆘 Resolució de Problemes

### Problemes Comuns

#### ❌ Error de Login
**Símptomes:** No es pot accedir al sistema
**Solucions:**
1. Verificar credencials
2. Comprovar connexió a internet
3. Contactar amb l'administrador

#### ❌ Document No es Puja
**Símptomes:** Error al carregar fitxers
**Solucions:**
1. Verificar mida del fitxer (< 5MB)
2. Comprovar format (PDF, JPG, PNG)
3. Provar amb un altre navegador

#### ❌ Informació No es Guarda
**Símptomes:** Canvis es perden
**Solucions:**
1. Completar tots els camps obligatoris
2. Esperar confirmació de "Guardat"
3. Actualitzar la pàgina i provar de nou

### Contacte amb Suport
- **Email:** suport@centreeducatiu.cat
- **Telèfon:** 93 123 45 67
- **Horari:** Dilluns a Divendres, 9:00-17:00

---

## 📱 Ús en Dispositius Mòbils

### Navegadors Compatibles
- ✅ Safari (iOS 12+)
- ✅ Chrome (Android 8+)
- ✅ Firefox (versions recents)
- ✅ Edge (versions recents)

### Funcionalitats Mòbils
- **Responsive Design:** Adaptació automàtica
- **Touch Gestures:** Navegació tàctil optimitzada
- **Fotos de Documents:** Càmera integrada per pujar documents

---

## 📊 Informes i Estadístiques

### Informes Disponibles
- **Llistat d'Estudiants:** Export CSV/PDF
- **Estat de Documentació:** Documents pendents/caducats
- **Contactes d'Emergència:** Informació actualitzada
- **Estadístiques de Curs:** Números i tendències

### Com Generar Informes
1. Anar a la secció "Informes"
2. Seleccionar tipus d'informe
3. Configurar filtres i paràmetres
4. Descarregar en format desitjat

---

## 🎯 Consells i Bones Pràctiques

### Per Administradors
- **Revisions Regulars:** Comprovar documents caducats mensualment
- **Còpies de Seguretat:** Exportar dades importants regularment
- **Formació del Personal:** Assegurar que tots coneguin el sistema

### Per Famílies
- **Mantenir Dades Actualitzades:** Notificar canvis de contacte
- **Documentació al Dia:** Renovar documents abans de la caducitat
- **Comunicació Activa:** Revisar missatges del centre regularment

### Per Monitors
- **Consultes Regulars:** Revisar informació dels estudiants abans de les classes
- **Comunicació Efectiva:** Utilitzar les eines de missatgeria del sistema
- **Actualitzacions Immediates:** Informar de qualsevol incidència

---

## 🔄 Actualitzacions del Sistema

### Notificacions d'Actualitzacions
- **Noves Funcionalitats:** Avisos automàtics
- **Millores de Seguretat:** Actualitzacions prioritàries
- **Correccions d'Errors:** Patches regulars

### Històric de Versions
- **v1.0.0-fase1:** Sistema base de gestió d'estudiants
- **v1.1.0 (planificat):** Sistema d'assistència amb QR
- **v1.2.0 (planificat):** Automatització de facturació

---

<div align="center">

**📞 Necessites ajuda?**

Contacta amb l'equip de suport per rebre assistència personalitzada

📧 suport@centreeducatiu.cat | ☎️ 93 123 45 67

</div>
