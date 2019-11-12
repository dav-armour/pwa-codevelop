const db = firebase.firestore();

// offline data
db.enablePersistence()
  .catch(err => {
    if (err.code === "failed-precondition") {
      // probably multiple tabs open at once
      console.log("persistance failed");
    } else if (err.code === "unimplemented") {
      // lack of browser support
      console.log("persistence is not available");
    }
  })

// real-time listener
db.collection("books").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added") {
      // add the document to the web page
      renderBook(change.doc.data(), change.doc.id);
    } else if (change.type === "removed") {
      // remove the document data from the web page
      removeBook(change.doc.id);
    }
  });
})

// add new book
const form = document.querySelector("form");

form.addEventListener("submit", event => {
  event.preventDefault();

  const book = {
    title: form.title.value,
    author: form.author.value
  }

  db.collection("books").add(book)
    .catch(err => console.log(err))

  form.title.value = "";
  form.author.value = "";
})

// delete a book
const bookContainer = document.querySelector(".books");
bookContainer.addEventListener("click", event => {
  if (event.target.tagName === "I") {
    const id = event.target.dataset.id;
    db.collection("books").doc(id).delete();
  }
})