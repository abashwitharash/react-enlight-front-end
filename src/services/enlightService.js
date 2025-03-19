const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/enlights`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (enlightId) => {
    try {
      const res = await fetch(`${BASE_URL}/${enlightId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const create = async (enlightFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enlightFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const createComment = async (enlightId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${enlightId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEnlight = async (enlightId) => {
    try {
      const res = await fetch(`${BASE_URL}/${enlightId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  export { 
    index,
    show,
    create,
    createComment, 
    deleteEnlight,
  };