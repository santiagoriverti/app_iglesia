# Parroquia del Carmen (Centro) — App Android

App móvil para la **Parroquia del Carmen (Centro)**, desarrollada con React Native + Expo.

## Funcionalidades

- **Evangelio del día** — Lectura diaria con color litúrgico y primera lectura
- **Horarios de Misa** — Horarios semanales, confesiones y datos de contacto
- **Santo del día** — Biografía y oración, con navegación por días
- **Eventos** — Próximas actividades litúrgicas y pastorales

## Stack

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) (SDK 56)
- [React Navigation](https://reactnavigation.org/) — navegación por pestañas
- [Firebase Firestore](https://firebase.google.com/docs/firestore) — datos en tiempo real
- TypeScript

## Estructura

```
src/
├── constants/theme.ts          # Colores y espaciado
├── data/                       # Datos locales de fallback
│   ├── misas.ts
│   ├── eventos.ts
│   └── santos.ts
├── services/
│   ├── firebase.ts             # Configuración Firebase
│   ├── firestoreService.ts     # Lectura de datos en tiempo real
│   └── evangelioService.ts     # Evangelio desde bible-api.com
├── screens/
│   ├── HomeScreen.tsx
│   ├── EvangelioScreen.tsx
│   ├── MisasScreen.tsx
│   ├── SantoScreen.tsx
│   └── EventosScreen.tsx
├── navigation/AppNavigator.tsx
└── components/LoadingView.tsx
```

## Instalación local

```bash
git clone https://github.com/santiagoriverti/app_iglesia.git
cd app_iglesia
npm install
npx expo start
```

## Generar APK

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

## Administración de contenido

Los horarios de misa y eventos se gestionan desde la consola de Firebase:

**[console.firebase.google.com](https://console.firebase.google.com)** → proyecto `parroquia-del-carmen` → Firestore Database

- `config/misas` — horarios y datos de contacto
- colección `eventos` — actividades próximas

Los cambios se reflejan automáticamente en la app sin necesidad de actualización.

## Contacto

**Parroquia del Carmen (Centro)**  
Rodríguez Peña 840, C1060 CABA  
Instagram: [@parroquiadelcarmenc](https://instagram.com/parroquiadelcarmenc)
