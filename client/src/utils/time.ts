export const isPastDue = (dueDate: string) => {
  const dueDateTime = new Date(dueDate);
  const now = new Date();
  // return dueDateTime <= now;
  return dueDateTime > now; // FIXME!
};
