import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";
import "./css/Button.css";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<
    Array<{
      user_id: string;
      name: string;
      last_login: string;
      designation: string;
      bldg_no: string;
    }>
  >([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{
    user_id: string;
    name: string;
    designation: string;
    bldg_no: string;
    password?: string;
    confirmPassword?: string;
  } | null>(null);
  const [newUser, setNewUser] = useState<{
    user_id: string;
    name:string;
    designation: string;
    bldg_no: string;
    password: string;
    confirmPassword: string;
  }>({
    user_id: "",
    name: "",
    designation: "",
    bldg_no: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const API_URL = "http://127.0.0.1:8000/api";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/`);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleEdit = (user: {
    user_id: string;
    name: string;
    designation: string;
    bldg_no: string;
  }) => {
    setSelectedUser({ ...user, password: "", confirmPassword: "" });
    setShowModal(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}/`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedUser) {
        // Edit user
        const updateData: any = {
          name: selectedUser.name,
          designation: selectedUser.designation,
          bldg_no: selectedUser.bldg_no,
        };
        if (selectedUser.password) {
          if (selectedUser.password !== selectedUser.confirmPassword) {
            alert("Passwords do not match");
            return;
          }
          updateData.password = selectedUser.password;
        }
        await axios.put(
          `${API_URL}/users/${selectedUser.user_id}/`,
          updateData
        );
      } else {
        // Create new user
        if (newUser.password !== newUser.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        await axios.post(`${API_URL}/users/`, {
          user_id: newUser.user_id,
          name: newUser.name,
          designation: newUser.designation,
          bldg_no: newUser.bldg_no,
          password: newUser.password,
        });
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Failed to save user", error);
    }
  };

  return (
    <>
      <AppNavbar />
      <Container className="mt-5">
        <div className="d-flex justify-content-between">
          <h2>Admin Page</h2>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(true);
              setSelectedUser(null);
              setNewUser({
                user_id: "",
                name: "",
                designation: "",
                bldg_no: "",
                password: "",
                confirmPassword: "",
              });
            }}
          >
            Add User
          </Button>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Building No</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.designation}</td>
                <td>{user.bldg_no}</td>

                <td className="element-group">
                  <Button
                    className="edit-btn"
                    onClick={() => handleEdit(user)}
                    style={{ backgroundColor: "rgb(8, 156, 58)" }}
                  >
                    Edit
                  </Button>
                  
                </td>

                <td className="element-group">
                  <Button
                    className="edit-btn"
                    variant="danger"
                    onClick={() => handleDelete(user.user_id)}
                  >
                    Delete
                  </Button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser ? "Edit User" : "Add User"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUserId">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser ? selectedUser.user_id : newUser.user_id}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (selectedUser) {
                      setSelectedUser((prev) =>
                        prev ? { ...prev, user_id: value } : null
                      );
                    } else {
                      setNewUser((prev) => ({ ...prev, user_id: value }));
                    }
                  }}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser ? selectedUser.name : newUser.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (selectedUser) {
                      setSelectedUser((prev) =>
                        prev ? { ...prev, name: value } : null
                      );
                    } else {
                      setNewUser((prev) => ({ ...prev, name: value }));
                    }
                  }}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    selectedUser
                      ? selectedUser.designation
                      : newUser.designation
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (selectedUser) {
                      setSelectedUser((prev) =>
                        prev ? { ...prev, designation: value } : null
                      );
                    } else {
                      setNewUser((prev) => ({ ...prev, designation: value }));
                    }
                  }}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBldgNo">
                <Form.Label>Building No</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser ? selectedUser.bldg_no : newUser.bldg_no}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (selectedUser) {
                      setSelectedUser((prev) =>
                        prev ? { ...prev, bldg_no: value } : null
                      );
                    } else {
                      setNewUser((prev) => ({ ...prev, bldg_no: value }));
                    }
                  }}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={
                    selectedUser
                      ? selectedUser.password || ""
                      : newUser.password
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (selectedUser) {
                      setSelectedUser((prev) =>
                        prev ? { ...prev, password: value } : null
                      );
                    } else {
                      setNewUser((prev) => ({ ...prev, password: value }));
                    }
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={
                    selectedUser
                      ? selectedUser.confirmPassword || ""
                      : newUser.confirmPassword
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (selectedUser) {
                      setSelectedUser((prev) =>
                        prev ? { ...prev, confirmPassword: value } : null
                      );
                    } else {
                      setNewUser((prev) => ({
                        ...prev,
                        confirmPassword: value,
                      }));
                    }
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default AdminPage;
