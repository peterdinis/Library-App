import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface Category {
  name: string;
  description?: string;
}

interface CategoriesPDFDocumentProps {
  categories: Category[];
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  section: { marginBottom: 5 },
});

export function CategoriesPDFDocument({
  categories,
}: CategoriesPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Zoznam kategórií</Text>
        {categories.map((category, index) => (
          <View key={index} style={styles.section}>
            <Text>
              {index + 1}. {category.name} - {category.description || "Bez popisu"}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}