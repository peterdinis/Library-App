import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface Genre {
  id: string;
  name: string;
}

interface GenresPDFDocumentProps {
  genres: Genre[];
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  header: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
});

export function GenresPDFDocument({ genres }: GenresPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Zoznam Žánrov</Text>
          {genres.map((genre) => (
            <View key={genre.id} style={styles.row}>
              <Text>{genre.name}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
