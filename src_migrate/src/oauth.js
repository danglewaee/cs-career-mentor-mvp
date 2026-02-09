const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      console.log(user);
      // Redirect user or set session as needed
    } catch (error) {
      console.error(error.message);
    }
  };
  