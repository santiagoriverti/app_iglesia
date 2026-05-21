import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../constants/theme';
import { fetchLecturasHoy, LecturasDiarias } from '../services/evangelioService';
import LoadingView from '../components/LoadingView';

const colorLiturgico: Record<string, string> = {
  rojo: colors.liturgicalRed,
  verde: colors.liturgicalGreen,
  blanco: colors.textMuted,
  morado: colors.liturgicalPurple,
  dorado: colors.liturgicalGold,
};

const nombreColorLiturgico: Record<string, string> = {
  rojo: 'Rojo',
  verde: 'Verde',
  blanco: 'Blanco',
  morado: 'Morado',
  dorado: 'Dorado',
};

export default function EvangelioScreen() {
  const [lecturas, setLecturas] = useState<LecturasDiarias | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [mostrarPrimera, setMostrarPrimera] = useState(false);

  const cargar = async () => {
    setCargando(true);
    setError(false);
    try {
      const datos = await fetchLecturasHoy();
      setLecturas(datos);
    } catch {
      setError(true);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  if (cargando) return <LoadingView mensaje="Cargando lecturas del día..." />;

  if (error || !lecturas) {
    return (
      <View style={styles.centrado}>
        <Ionicons name="wifi-outline" size={48} color={colors.textMuted} />
        <Text style={styles.errorTexto}>No se pudo cargar el evangelio</Text>
        <TouchableOpacity style={styles.botonReintentar} onPress={cargar}>
          <Text style={styles.botonReintentarTexto}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const colorActual = colorLiturgico[lecturas.colorLiturgico] || colors.textMuted;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Encabezado litúrgico */}
      <View style={[styles.encabezado, { borderLeftColor: colorActual }]}>
        <View style={styles.encabezadoFila}>
          <View style={[styles.puntoColor, { backgroundColor: colorActual }]} />
          <Text style={styles.colorTexto}>{nombreColorLiturgico[lecturas.colorLiturgico]}</Text>
        </View>
        <Text style={styles.diaLiturgico}>{lecturas.diaLiturgico}</Text>
      </View>

      {/* Primera Lectura (colapsable) */}
      <View style={styles.seccionCard}>
        <TouchableOpacity
          style={styles.seccionHeader}
          onPress={() => setMostrarPrimera(!mostrarPrimera)}
          activeOpacity={0.7}
        >
          <View>
            <Text style={styles.seccionLabel}>PRIMERA LECTURA</Text>
            <Text style={styles.seccionRef}>{lecturas.primeraLectura.referencia}</Text>
          </View>
          <Ionicons
            name={mostrarPrimera ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.textMuted}
          />
        </TouchableOpacity>
        {mostrarPrimera && (
          <Text style={styles.textoLectura}>{lecturas.primeraLectura.texto}</Text>
        )}
      </View>

      {/* Evangelio */}
      <View style={[styles.seccionCard, styles.evangelioCard]}>
        <View style={[styles.evangelioBorde, { backgroundColor: colorActual }]} />
        <Text style={styles.seccionLabel}>EVANGELIO</Text>
        <Text style={styles.seccionTitulo}>{lecturas.evangelio.titulo}</Text>
        <Text style={styles.evangelioRef}>{lecturas.evangelio.referencia}</Text>
        <Text style={styles.textoCruz}>✝</Text>
        <Text style={styles.textoEvangelio}>{lecturas.evangelio.texto}</Text>
      </View>

      {/* Nota al pie */}
      <View style={styles.notaPie}>
        <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
        <Text style={styles.notaTexto}>
          Texto tomado de la traducción Reina-Valera 1960. Para la lectura oficial en la Misa,
          consulte el Misal Romano.
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
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    gap: spacing.md,
  },
  errorTexto: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  botonReintentar: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    marginTop: spacing.sm,
  },
  botonReintentarTexto: {
    color: colors.white,
    fontWeight: '700',
  },
  encabezado: {
    margin: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  encabezadoFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  puntoColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  colorTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  diaLiturgico: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seccionCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seccionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  seccionRef: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 2,
  },
  textoLectura: {
    marginTop: spacing.md,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  evangelioCard: {
    overflow: 'hidden',
  },
  evangelioBorde: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
  },
  seccionTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  evangelioRef: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  textoCruz: {
    fontSize: 24,
    color: colors.accent,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  textoEvangelio: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  notaPie: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
    alignItems: 'flex-start',
  },
  notaTexto: {
    flex: 1,
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 16,
  },
});
