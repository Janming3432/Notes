const addNote = (setObject, object) => {
  const date = new Date().toDateString().split(" ");
  setObject((current) => [
    ...current,
    {
      index: object.length === 0 ? 0 : object[object.length - 1].index + 1,
      Title: ``,
      content: ``,
      creationTime: `${date[1]} ${date[2]} ${date[3]}`,
      isLocked: false,
      password: "",
    },
  ]);
};

const deleteNote = (setObject, index) => {
  setObject((oldNote) => {
    return oldNote.filter((note) => note.index !== index);
  });
};

export { addNote, deleteNote };
