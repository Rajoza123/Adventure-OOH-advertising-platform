import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';
import axios from 'axios';

export default function Requests() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillboardsAndNotifications = async () => {
      try {
        // Fetch the billboards
        const billboardResponse = await axios.get("http://127.0.0.1:8000/pub_billboards/", {
          headers: {
            'Authorization': localStorage.getItem('token'),
          }
        });

        // Assuming billboardResponse.data contains an array of billboards
        const billboards = billboardResponse.data;

        // Fetch billxcomp for each billboard
        const notificationsList = await Promise.all(billboards.map(async (billboard) => {
          const bookingsResponse = await axios.get(`http://127.0.0.1:8000/pub_requests/${billboard.id}/`, {
            
          });
          const bookings = bookingsResponse.data;

          // Map the bookings to notifications format
          return bookings.map(booking => ({
            id: booking.id,
            message: `New requested date on ${billboard.area} from ${booking.start_date} to ${booking.end_date}`,
            time: `${new Date(booking.booking_date).toLocaleString()}`,
          }));
        }));

        // Flatten the array of notifications and set state
        setNotifications(notificationsList.flat());
      } catch (error) {
        console.error('Error fetching notifications:', error);
        alert('Error fetching notifications, please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBillboardsAndNotifications();
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return <div>Loading...</div>; // Optionally add a loading state
  }

  return (
    <Card style={{ width: '60rem' }} className='container d-flex justify-content-start'>
      <Card.Header className="d-flex container justify-content-between align-items-center">
        <span>Order</span>
        <span>{notifications.length}</span>
      </Card.Header>
      <ListGroup variant="flush" className="container">
        {notifications.length > 0 ? notifications.map((notification) => (
          <ListGroup.Item key={notification.id} className="d-flex align-items-center container">
            <img src={notification.file} alt="" srcset="" />
            <div>
              <div>{notification.message}</div>
              <small className="text-muted">{notification.time}</small>
            </div>
          </ListGroup.Item>
        )) : (
          <ListGroup.Item>No notifications available.</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}
