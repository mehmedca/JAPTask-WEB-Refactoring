export let configuration = {
  endpoints: {
    auth: {
      login: 'auth/login',
      register: 'auth/register',
    },
    actors: {
      index: 'investors',
      addPhoto: 'add-photo'
    },
    movies: {
      index: 'movies',
      getRatings: 'get-ratings',
      addRating: 'add-rating',
      addPhoto: 'add-photo',
    },
    roles: {
      index: 'roles',
    },
    users: {
      index: 'users',
      addPhoto: 'add-photo',
    }
  },
};

export const roleIds = {
  ADMIN_ROLE_ID: {
    id: '8cdd8900-b5a2-41ef-bd55-2a4215f04c48',
  },
  MODERATOR_ROLE_ID: {
    id: "3cf0bbae-1fc5-4ca2-9eb4-1557aed94397"
  },
  USER_ROLE_ID: {
    id: "0ee2b0b2-e5f4-4bab-b7aa-bc6d6237efd0"
  }
};
