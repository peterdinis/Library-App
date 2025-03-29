import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface BooksPDFDocumentProps {
  books: { title: string; author: string }[];
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  section: { marginBottom: 5 },
});

export function BooksPDFDocument({ books }: BooksPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Zoznam kníh</Text>
        {books.map((book, index) => (
          <View key={index} style={styles.section}>
            <Text>
              {index + 1}. {book.title} - {book.author}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
