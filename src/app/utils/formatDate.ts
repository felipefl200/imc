export function formatDate(date: string): string {
  let dataCriada = new Date(date);
  let dataFormatada = dataCriada.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
  console.log(dataFormatada);
  return dataFormatada;
}
