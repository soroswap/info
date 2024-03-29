type DataItem = {
  date: string;
  [key: string]: any;
};

/* Complete the data with all the dates between the first and last date
 * Useful for filling the gaps in a chart
 *
 *  Example:
 *      const rawData: DataItem[] = [
 *          { date: "2024-03-11", tvl: 2651.25 },
 *          ...
 *      ];
 *
 *  const completeData = fillDatesAndSort(rawData, "tvl");
 */
export function fillDatesAndSort(
  data: DataItem[],
  valueKey: string
): DataItem[] {
  const sortedData = data.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const completeData: DataItem[] = [];
  let currentDate = new Date(sortedData[0].date);

  sortedData.forEach((item, index) => {
    const itemDate = new Date(item.date);
    while (currentDate < itemDate) {
      const lastValue =
        completeData.length > 0
          ? completeData[completeData.length - 1][valueKey]
          : item[valueKey];
      completeData.push({
        date: currentDate.toISOString().split("T")[0],
        [valueKey]: lastValue,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    completeData.push({ ...item });
    currentDate.setDate(currentDate.getDate() + 1);
  });

  return completeData;
}
