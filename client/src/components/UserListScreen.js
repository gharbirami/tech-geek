import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../redux/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../redux/constants/userConstants';

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>NAME</th>
              <th style={{textAlign:'center'}}>EMAIL</th>
              <th style={{textAlign:'center'}}>IS ADMIN</th>
              <th style={{textAlign:'center'}}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            { users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td style={{textAlign:'center'}}>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td style={{textAlign:'center'}}>
                <button
                    style={{ padding:'5px 15px'}}
                      type="button"
                      className="small edit"
                      onClick={() => props.history.push(`/user/${user._id}/edit`)}
                      
                    >
                      <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                    </button>
                    <button
                     style={{ padding:'5px 15px'}}
                      type="button"
                      className="small delet"
                      onClick={() => deleteHandler(user)}
                    >
                      <i class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
                    </button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
