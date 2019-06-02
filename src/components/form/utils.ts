export default function toJsonSchame(array: any[]) {
  const schame = {
    type: "object",
    properties: {}
  };

  array
    .filter(item => item.type !== "id")
    .map(item => {
      schame.properties[item.name] = {
        type: item.type,
        title: item.capion
      };
    });
  return schame;
}
