import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeleteBillBoard = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const deleteBillboard = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/billboard/${id}/`, {
        headers: { 'Authorization': localStorage.getItem("token") }
      });
      setSuccess(true);
      console.log(response.data);
    } catch (error) {
      setError(error);
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    deleteBillboard();
  };

  return (
    <div>
      {loading ? (
        <p>Loading...
             <button onClick={deleteBillboard} className='btn btn-danger'> Confirm Delete </button>
        </p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : success ? (
        <p>Billboard deleted successfully!</p>
      ) : (
        <button onClick={handleDelete}>Delete Billboard</button>
      )}
    </div>
  );
};

export default DeleteBillBoard;