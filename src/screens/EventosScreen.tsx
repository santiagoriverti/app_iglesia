import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../constants/theme';
import { MESES_ES, hoyMedianoche } from '../constants/locale';
import { Evento } from '../data/eventos';
import { useEventos } from '../hooks/useEventos';

const coloresTipo: Record<Evento['tipo'], string> = {
  liturgico: colors.primary,
  pastoral: colors.liturgicalGreen,
  social: colors.liturgicalGold,
  patronal: colors.accent,
  formacion: colors.liturgicalPurple,
};

const etiquetasTipo: Record<Evento['tipo'], string> = {
  liturgico: 'Litúrgico',
  pastoral: 'Pastoral',
  social: 'Social',
  patronal: 'Fiesta Patronal',
  formacion: 'Formación',
};

function TarjetaEvento({ evento, pasado }: { evento: Evento; pasado: boolean }) {
  const fechaObj = new Date(evento.fecha + 'T00:00:00');
  const colorTipo = coloresTipo[evento.tipo];
  const esHoy = fechaObj.getTime() === hoyMedianoche().getTime();

  return (
    <View style={[styles.eventoCard, pasado && styles.eventoCardPasado, evento.destacado && !pasado && styles.eventoCardDestacado]}>
      {evento.destacado && !pasado && <View style={[styles.topBorde, { backgroundColor: colorTipo }]} />}
      <View style={styles.eventoFila}>
        <View style={[styles.fechaBadge, { backgroundColor: pasado ? colors.border : colorTipo }]}>
          <Text style={[styles.fechaDia, pasado && styles.textoPasado]}>{fechaObj.getDate()}</Text>
          <Text style={[styles.fechaMes, pasado && styles.textoPasado]}>
            {MESES_ES[fechaObj.getMonth()].slice(0, 3).toUpperCase()}
          </Text>
        </View>
        <View style={styles.eventoInfo}>
          <View style={styles.eventoTituloFila}>
            <Text style={[styles.eventoTitulo, pasado && styles.textoPasado]} numberOfLines={2}>
              {evento.titulo}
            </Text>
            {esHoy && <View style={styles.badgeHoy}><Text style={styles.badgeHoyTexto}>HOY</Text></View>}
          </View>
          <View style={[styles.tipoBadge, { backgroundColor: colorTipo + '20' }]}>
            <Text style={[styles.tipoTexto, { color: colorTipo }]}>{etiquetasTipo[evento.tipo]}</Text>
          </View>
          {evento.hora && !pasado && (
            <View style={styles.horaFila}>
              <Ionicons name="time-outline" size={13} color={colors.textMuted} />
              <Text style={styles.horaTexto}>{evento.hora}</Text>
            </View>
          )}
          <Text style={[styles.eventoDesc, pasado && styles.textoPasado]} numberOfLines={2}>
            {evento.descripcion}
          </Text>
          {evento.fechaFin && (
            <Text style={styles.fechaFinTexto}>
              Hasta el {new Date(evento.fechaFin + 'T00:00:00').getDate()} de{' '}
              {MESES_ES[new Date(evento.fechaFin + 'T00:00:00').getMonth()]}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default function EventosScreen() {
  const listaEventos = useEventos();
  const [mostrarPasados, setMostrarPasados] = useState(false);

  const { proximos, pasados } = useMemo(() => {
    const hoy = hoyMedianoche();
    return {
      proximos: listaEventos
        .filter(e => new Date(e.fecha + 'T00:00:00') >= hoy)
        .sort((a, b) => a.fecha.localeCompare(b.fecha)),
      pasados: listaEventos
        .filter(e => new Date(e.fecha + 'T00:00:00') < hoy)
        .sort((a, b) => b.fecha.localeCompare(a.fecha)),
    };
  }, [listaEventos]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.encabezado}>
        <Ionicons name="calendar" size={24} color={colors.primary} />
        <View>
          <Text style={styles.encabezadoTitulo}>Próximas Actividades</Text>
          <Text style={styles.encabezadoSub}>Parroquia del Carmen (Centro)</Text>
        </View>
      </View>

      {proximos.length === 0 ? (
        <View style={styles.vacio}>
          <Ionicons name="calendar-outline" size={48} color={colors.border} />
          <Text style={styles.vacioTexto}>No hay eventos próximos</Text>
          <Text style={styles.vacioSub}>Los próximos eventos aparecerán aquí cuando sean publicados.</Text>
        </View>
      ) : (
        <View style={styles.lista}>
          {proximos.map(e => <TarjetaEvento key={e.id} evento={e} pasado={false} />)}
        </View>
      )}

      {pasados.length > 0 && (
        <TouchableOpacity style={styles.togglePasados} onPress={() => setMostrarPasados(!mostrarPasados)}>
          <Text style={styles.toggleTexto}>
            {mostrarPasados ? 'Ocultar eventos pasados' : `Ver ${pasados.length} eventos pasados`}
          </Text>
          <Ionicons name={mostrarPasados ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
        </TouchableOpacity>
      )}

      {mostrarPasados && (
        <View style={styles.lista}>
          {pasados.map(e => <TarjetaEvento key={e.id} evento={e} pasado={true} />)}
        </View>
      )}

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  encabezado: { flexDirection: 'row', gap: spacing.md, alignItems: 'center', margin: spacing.md, marginBottom: spacing.sm },
  encabezadoTitulo: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  encabezadoSub: { fontSize: 12, color: colors.textMuted },
  lista: { paddingHorizontal: spacing.md, gap: spacing.sm },
  eventoCard: {
    backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 2,
  },
  eventoCardPasado: { opacity: 0.65, elevation: 0, shadowOpacity: 0 },
  eventoCardDestacado: { shadowOpacity: 0.12, shadowRadius: 6, elevation: 4 },
  topBorde: { height: 3 },
  eventoFila: { flexDirection: 'row', padding: spacing.md, gap: spacing.md },
  fechaBadge: { width: 50, height: 56, borderRadius: radius.sm, justifyContent: 'center', alignItems: 'center' },
  fechaDia: { fontSize: 22, fontWeight: '800', color: colors.white, lineHeight: 24 },
  fechaMes: { fontSize: 10, fontWeight: '700', color: colors.white + 'CC', letterSpacing: 0.5 },
  eventoInfo: { flex: 1, gap: spacing.xs },
  eventoTituloFila: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.xs, flexWrap: 'wrap' },
  eventoTitulo: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.textPrimary, lineHeight: 20 },
  badgeHoy: { backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 10 },
  badgeHoyTexto: { color: colors.white, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  tipoBadge: { alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: 10 },
  tipoTexto: { fontSize: 11, fontWeight: '700' },
  horaFila: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  horaTexto: { fontSize: 12, color: colors.textMuted },
  eventoDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  fechaFinTexto: { fontSize: 11, color: colors.primary, fontStyle: 'italic' },
  textoPasado: { color: colors.textMuted },
  togglePasados: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.xs, margin: spacing.md, padding: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
  },
  toggleTexto: { color: colors.textMuted, fontSize: 14 },
  vacio: { alignItems: 'center', padding: spacing.xl * 2, gap: spacing.sm },
  vacioTexto: { color: colors.textSecondary, fontSize: 16, fontWeight: '600' },
  vacioSub: { color: colors.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 18 },
});
