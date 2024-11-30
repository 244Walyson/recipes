interface DataItem {
  id: string;
  name: string;
  values?: string | [number, number];
}

interface DataObject {
  title: string;
  data: DataItem[];
}

const createDataObject = (title: string, data: DataItem[]): DataObject => ({
  title,
  data,
});

export const trendingData = createDataObject("O que você prefere?", [
  { id: "1", name: "Mais curtidos", values: "favouriteCount" },
  { id: "2", name: "Mais vistos", values: "viewCount" },
  { id: "4", name: "Mais comentados", values: "commentCount" },
]);

export const timeData = createDataObject("Quanto tempo você tem?", [
  { id: "1", name: "Até 30 min", values: [0, 30] },
  { id: "2", name: "Até 1h", values: [0, 60] },
  { id: "3", name: "Até 2h", values: [0, 120] },
  { id: "4", name: "Mais de 2h", values: [120, 99999999] },
]);

export const priceData = createDataObject("Qual o seu orçamento?", [
  { id: "1", name: "Até R$ 50", values: [0, 50] },
  { id: "2", name: "De 50 á R$ 100", values: [50, 100] },
  { id: "3", name: "De 100 á R$ 200", values: [100, 200] },
  { id: "4", name: "Mais de R$ 200", values: [200, 99999999] },
]);

export const allergensData = createDataObject("Quais alergias você possui?", [
  { id: "1", name: "Glúten" },
  { id: "2", name: "Lactose" },
  { id: "3", name: "Ovo" },
  { id: "4", name: "Amendoim" },
  { id: "5", name: "Frutos do mar" },
  { id: "6", name: "Soja" },
  { id: "7", name: "Castanhas e nozes" },
  { id: "8", name: "Peixe" },
  { id: "9", name: "Trigo" },
  { id: "10", name: "Leite de vaca" },
  { id: "11", name: "Sésamo" },
  { id: "12", name: "Mostarda" },
  { id: "13", name: "Sulfitos" },
  { id: "14", name: "Celery (aipo)" },
  { id: "15", name: "Lupino" },
  { id: "16", name: "Moluscos" },
]);
