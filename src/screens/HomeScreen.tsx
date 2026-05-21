import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, radius } from '../constants/theme';
import { eventos } from '../data/eventos';

const DIAS_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function formatearFecha(fecha: Date): string {
  return `${DIAS_ES[fecha.getDay()]}, ${fecha.getDate()} de ${MESES_ES[fecha.getMonth()]} de ${fecha.getFullYear()}`;
}

function getProximoEvento() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return eventos
    .filter((e) => new Date(e.fecha + 'T00:00:00') >= hoy)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))[0];
}

interface AccesoCardProps {
  icono: keyof typeof Ionicons.glyphMap;
  titulo: string;
  subtitulo: string;
  color: string;
  onPress: () => void;
}

function AccesoCard({ icono, titulo, subtitulo, color, onPress }: AccesoCardProps) {
  return (
    <TouchableOpacity style={[styles.card, { borderTopColor: color }]} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.cardIconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icono} size={28} color={color} />
      </View>
      <Text style={styles.cardTitulo}>{titulo}</Text>
      <Text style={styles.cardSubtitulo}>{subtitulo}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const hoy = new Date();
  const proximoEvento = getProximoEvento();

  const diasHastaEvento = proximoEvento
    ? Math.round(
        (new Date(proximoEvento.fecha + 'T00:00:00').getTime() - hoy.setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="add" size={0} />
        <Text style={styles.headerLabel}>✝  PARROQUIA</Text>
        <Text style={styles.headerNombre}>Nuestra Señora{'\n'}del Carmen</Text>
        <Text style={styles.headerFecha}>{formatearFecha(new Date())}</Text>
      </View>

      {/* Acceso rápido */}
      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>Acceso Rápido</Text>
        <View style={styles.grilla}>
          <AccesoCard
            icono="book-outline"
            titulo="Evangelio"
            subtitulo="Lectura del día"
            color={colors.primary}
            onPress={() => navigation.navigate('Evangelio')}
          />
          <AccesoCard
            icono="time-outline"
            titulo="Horarios"
            subtitulo="Misas y confesiones"
            color={colors.liturgicalGreen}
            onPress={() => navigation.navigate('Misas')}
          />
          <AccesoCard
            icono="person-outline"
            titulo="Santo del Día"
            subtitulo="Quién celebramos hoy"
            color={colors.accent}
            onPress={() => navigation.navigate('Santo')}
          />
          <AccesoCard
            icono="calendar-outline"
            titulo="Eventos"
            subtitulo="Próximas actividades"
            color={colors.liturgicalPurple}
            onPress={() => navigation.navigate('Eventos')}
          />
        </View>
      </View>

      {/* Próximo evento destacado */}
      {proximoEvento && (
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Próximo Evento</Text>
          <TouchableOpacity
            style={styles.eventoCard}
            onPress={() => navigation.navigate('Eventos')}
            activeOpacity={0.8}
          >
            <View style={styles.eventoFechaBadge}>
              <Text style={styles.eventoDiaNum}>
                {new Date(proximoEvento.fecha + 'T00:00:00').getDate()}
              </Text>
              <Text style={styles.eventoDiaMes}>
                {MESES_ES[new Date(proximoEvento.fecha + 'T00:00:00').getMonth()].slice(0, 3).toUpperCase()}
              </Text>
            </View>
            <View style={styles.eventoInfo}>
              <Text style={styles.eventoTitulo}>{proximoEvento.titulo}</Text>
              {proximoEvento.hora && (
                <Text style={styles.eventoHora}>
                  <Ionicons name="time-outline" size={12} color={colors.textMuted} /> {proximoEvento.hora}
                </Text>
              )}
              {diasHastaEvento !== null && (
                <Text style={styles.eventoDias}>
                  {diasHastaEvento === 0 ? '¡Hoy!' : diasHastaEvento === 1 ? 'Mañana' : `En ${diasHastaEvento} días`}
                </Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      )}

      {/* Pie */}
      <View style={styles.pie}>
        <Text style={styles.pieCita}>
          "Yo soy el camino, la verdad y la vida."{'\n'}— Juan 14:6
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  headerLabel: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: spacing.sm,
  },
  headerNombre: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
  },
  headerFecha: {
    color: colors.accentLight,
    fontSize: 13,
    marginTop: spacing.sm,
    textTransform: 'capitalize',
  },
  seccion: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  seccionTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  grilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    width: '48%',
    borderTopWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardSubtitulo: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  eventoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  eventoFechaBadge: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventoDiaNum: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 24,
  },
  eventoDiaMes: {
    color: colors.accentLight,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  eventoHora: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  eventoDias: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 3,
  },
  pie: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  pieCita: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
