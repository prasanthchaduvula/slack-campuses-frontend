// get user
export const currentUser = fetchUser => {
  fetch('/api/v1/users/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.fomotoken
    }
  })
    .then(res => res.json())
    .then(data => {
      fetchUser(data);
    });
};

// get all  campuses
export const allCampuses = fetchAllcampuses => {
  fetch('/api/v1/campus')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      fetchAllcampuses(data);
    });
};
