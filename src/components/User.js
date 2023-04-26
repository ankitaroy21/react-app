/* Card containing user data */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Modal, Form, Input } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "../styles/User.css";

const User = ({ user, deleteUser, updateUserData }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  //function to toggle like button
  const toggleLike = () => {
    setIsLiked((prevState) => !prevState);
  };
  //function to submit form
  const submitForm = () => {
    form.validateFields().then((values) => {
      updateUserData(user.id, values);
      closeModal();
    });
  };
  //function to open modal
  const openModal = () => {
    setModalOpen(true);
  };
  //function to close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card
        style={{ margin: 15 }}
        cover={
          <div className="user-avatar">
            <img
              className="avatar-img"
              src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
              alt="Avatar"
            />
          </div>
        }
        actions={[
          <Button
            type="text"
            icon={
              isLiked ? (
                <HeartFilled className="icon-heart" />
              ) : (
                <HeartOutlined className="icon-heart" />
              )
            }
            onClick={() => toggleLike()}
          />,
          <Button
            type="text"
            icon={<EditOutlined className="icon-font, icon-color" />}
            onClick={() => openModal()}
          />,
          <Button
            type="text"
            icon={<DeleteFilled className="icon-font, icon-color" />}
            onClick={() => deleteUser(user.id)}
          />,
        ]}>
        <h3>{user.name}</h3>
        <div className="user-details">
          <MailOutlined className="icon-font" />
          <p>{user.email}</p>
        </div>
        <div className="user-details">
          <PhoneOutlined className="icon-font" />
          <p>{user.phone}</p>
        </div>
        <div className="user-details">
          <GlobalOutlined className="icon-font" />
          <p>http://{user.website}</p>
        </div>
      </Card>
      <Modal
        title="Basic Modal"
        open={modalOpen}
        onOk={() => submitForm()}
        onCancel={() => closeModal()}>
        <Form
          labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
          form={form}>
          <Form.Item
            className="font-color"
            label="Name"
            name="name"
            style={{ margin: "0 0 24px" }}
            initialValue={user.name}
            rules={[{ required: true, message: "This field is required" }]}>
            <Input className="font-color" />
          </Form.Item>
          <Form.Item
            className="font-color"
            label="Email"
            name="email"
            style={{ margin: "0 0 24px" }}
            initialValue={user.email}
            rules={[
              { required: true, message: "This field is required" },
              { type: "email", message: "Invalid email" },
            ]}>
            <Input className="font-color" />
          </Form.Item>
          <Form.Item
            className="font-color"
            label="Phone"
            name="phone"
            style={{ margin: "0 0 24px" }}
            initialValue={user.phone}
            rules={[{ required: true, message: "This field is required" }]}>
            <Input className="font-color" />
          </Form.Item>
          <Form.Item
            className="font-color"
            label="Website"
            name="website"
            style={{ margin: "0 0 24px" }}
            initialValue={user.website}
            rules={[{ required: true, message: "This field is required" }]}>
            <Input className="font-color" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
};

export default User;
