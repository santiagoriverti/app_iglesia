import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../constants/theme';
import { horariosOrdinarios, contacto } from '../data/misas';

function FilaHorario({ dia, horarios, nota }: { dia: string; horarios: string[]; nota?: string }) {
  const esDomingo = dia === 'Domingo';
  return (
    <View style={[styles.filaHorario, esDomingo && styles.filaDestacada]}>
      <View style={styles.filaDia}>
        <Text style={[styles.diaNombre, esDomingo && styles.diaDestacado]}>{dia}</Text>
        {esDomingo && <Text style={styles.badgePrincipal}>Principal</Text>}
      </View>
      <View style={styles.filaHorarios}>
        {horarios.map((h) => (
          <View key={h} style={styles.horarioBadge}>
            <Text style={styles.horarioTexto}>{h}</Text>
          </View>
        ))}
      </View>
      {nota && <Text style={styles.notaTexto}>{nota}</Text>}
    </View>
  );
}

export default function MisasScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Misas semanales */}
      <View style={styles.seccion}>
        <View style={styles.seccionHeader}>
          <Ionicons name="people-outline" size={20} color={colors.primary} />
          <Text style={styles.seccionTitulo}>Horarios de Misa</Text>
        </View>
        <View style={styles.card}>
          {horariosOrdinarios.map((h) => (
            <FilaHorario key={h.dia} dia={h.dia} horarios={h.horarios} nota={h.nota} />
          ))}
        </View>
      </View>

      {/* Confesiones */}
      <View style={styles.seccion}>
        <View style={styles.seccionHeader}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.liturgicalPurple} />
          <Text style={styles.seccionTitulo}>Sacramento de la Confesión</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.confFila}>
            <Ionicons name="time-outline" size={18} color={colors.textMuted} />
            <Text style={styles.confTexto}>30 minutos antes de cada Misa</Text>
          </View>
        </View>
      </View>

      {/* Contacto */}
      <View style={styles.seccion}>
        <View style={styles.seccionHeader}>
          <Ionicons name="location-outline" size={20} color={colors.liturgicalGreen} />
          <Text style={styles.seccionTitulo}>Contacto y Ubicación</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.filaContacto}>
            <Ionicons name="location-outline" size={18} color={colors.textMuted} />
            <Text style={styles.contactoTexto}>{contacto.direccion}</Text>
          </View>
          <View style={styles.filaContacto}>
            <Ionicons name="logo-instagram" size={18} color={colors.textMuted} />
            <Text style={styles.contactoTexto}>{contacto.instagram}</Text>
          </View>
          <View style={[styles.filaContacto, { borderBottomWidth: 0 }]}>
            <Ionicons name="business-outline" size={18} color={colors.textMuted} />
            <View>
              <Text style={styles.contactoLabel}>Secretaría</Text>
              <Text style={styles.contactoTexto}>{contacto.horarioSecretaria}</Text>
            </View>
          </View>
        </View>
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
  seccion: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  seccionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  filaHorario: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filaDestacada: {
    backgroundColor: colors.primary + '08',
  },
  filaDia: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  diaNombre: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  diaDestacado: {
    color: colors.primary,
    fontWeight: '700',
  },
  badgePrincipal: {
    backgroundColor: colors.primary + '20',
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  filaHorarios: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  horarioBadge: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  horarioTexto: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  notaTexto: {
    marginTop: spacing.sm,
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  confFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  confTexto: {
    fontSize: 15,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  filaContacto: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'flex-start',
  },
  contactoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 1,
  },
  contactoTexto: {
    fontSize: 14,
    color: colors.textPrimary,
  },
});
