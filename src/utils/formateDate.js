export const formatDate = (createdOn) => {
  const date = new Date(createdOn);
  const formatedDate = date
    .toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .join("-");

  return (
    formatedDate +
    ", " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
};
