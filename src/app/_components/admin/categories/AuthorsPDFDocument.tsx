import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface Author {
  id: string;
  name: string;
}

interface AuthorsPDFDocumentProps {
  authors: Author[];
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  header: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
});

export function AuthorsPDFDocument({ authors }: AuthorsPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Zoznam Autorov</Text>
          {authors.map((author) => (
            <View key={author.id} style={styles.row}>
              <Text>{author.name}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
