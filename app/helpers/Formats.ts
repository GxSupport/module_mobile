export function FormatTime(dateString: string) {
  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${hours}:${minutes}  ${day}.${month}.${year}`;
}

export const getColor = (index:number) => {
  const colors = [
    'blue-400',
    'green-400',
    'red-400',
    'yellow-400',
    'pink-400',
    'purple-400',
    'indigo-400',
    'teal-400',
    'lime-400',
  ];
  return colors[index % colors.length];
};
