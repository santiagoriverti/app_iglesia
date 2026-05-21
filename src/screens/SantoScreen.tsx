import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../constants/theme';
import { getSantoDelDia } from '../data/santos';

const MESES_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

export default function SantoScreen() {
  const hoy = new Date();
  const [fechaOffset, setFechaOffset] = useState(0);

  const fechaVista = new Date(hoy);
  fechaVista.setDate(hoy.getDate() + fechaOffset);

  const santo = getSantoDelDia(fechaVista);

  const cambiarDia = (delta: number) => {
    const nuevo = fechaOffset + delta;
    if (nuevo >= -7 && nuevo <= 7) setFechaOffset(nuevo);
  };

  const etiquetaDia =
    fechaOffset === 0 ? 'Hoy' : fechaOffset === 1 ? 'Mañana' : fechaOffset === -1 ? 'Ayer' : '';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Selector de fecha */}
      <View style={styles.selectorFecha}>
        <TouchableOpacity onPress={() => cambiarDia(-1)} style={styles.botonNavFecha}>
          <Ionicons name="chevron-back" size={20} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.fechaInfo}>
          {etiquetaDia ? <Text style={styles.etiquetaDia}>{etiquetaDia}</Text> : null}
          <Text style={styles.fechaTexto}>
            {fechaVista.getDate()} de {MESES_ES[fechaVista.getMonth()]}
          </Text>
        </View>
        <TouchableOpacity onPress={() => cambiarDia(1)} style={styles.botonNavFecha}>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tarjeta del santo */}
      <View style={styles.santoCard}>
        <View style={styles.iconoContainer}>
          <Text style={styles.icono}>✝</Text>
        </View>

        <Text style={styles.fiestaLabel}>FIESTA DEL DÍA</Text>
        <Text style={styles.nombreSanto}>{santo.nombre}</Text>
        <Text style={styles.fechaFiesta}>{santo.fiesta}</Text>

        {santo.patrono && (
          <View style={styles.patronoBadge}>
            <Ionicons name="shield-outline" size={14} color={colors.accent} />
            <Text style={styles.patronoTexto}>Patrono de: {santo.patrono}</Text>
          </View>
        )}
      </View>

      {/* Biografía */}
      <View style={styles.seccionCard}>
        <View style={styles.seccionHeader}>
          <Ionicons name="book-outline" size={18} color={colors.primary} />
          <Text style={styles.seccionTitulo}>Vida y Testimonio</Text>
        </View>
        <Text style={styles.bioTexto}>{santo.biografia}</Text>
      </View>

      {/* Oración */}
      <View style={[styles.seccionCard, styles.oracionCard]}>
        <Text style={styles.oracionLabel}>ORACIÓN DEL DÍA</Text>
        <Text style={styles.oracionTexto}>
          Señor y Dios nuestro, que hoy celebramos la memoria de {santo.nombre}, concédenos que,
          siguiendo su ejemplo de vida cristiana, podamos glorificarte con obras y palabras,
          y llegar con su intercesión a la vida eterna. Por Jesucristo, nuestro Señor. Amén.
        </Text>
        <Text style={styles.oracionCierre}>✝ Amén</Text>
      </View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  selectorFecha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  botonNavFecha: {
    padding: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
  },
  fechaInfo: {
    alignItems: 'center',
  },
  etiquetaDia: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  fechaTexto: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  santoCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.accent + '30',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent + '60',
  },
  icono: {
    fontSize: 32,
    color: colors.accent,
  },
  fiestaLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.accentLight,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  nombreSanto: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 28,
  },
  fechaFiesta: {
    fontSize: 14,
    color: colors.accentLight,
    marginTop: spacing.xs,
    textTransform: 'capitalize',
  },
  patronoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.accent + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.accent + '40',
  },
  patronoTexto: {
    fontSize: 12,
    color: colors.accentLight,
    fontStyle: 'italic',
  },
  seccionCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  seccionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  seccionTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bioTexto: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  oracionCard: {
    backgroundColor: colors.surfaceAlt,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  oracionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  oracionTexto: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  oracionCierre: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
