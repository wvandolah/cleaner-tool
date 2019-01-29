import React, { useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Link } from 'react-router-dom';
import { PostRegister } from '../../pages/';
import { useFetch } from '../../helpers';
import { Container, Button } from '../../components/';
import { Card, Positioner, Header } from './Settings.styling';
import { RouteComponentProps } from 'react-router';

const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const Settings: React.SFC<RouteComponentProps> = (props) => {
  const clientId = process.env.REACT_APP_clientid;
  const [user, error, loading] = useFetch(`${url}/users`);

  useEffect(() => {
    const { search } = props.location;
    const params = search.match(/code=(.*)/);

    if (params !== null && params.length === 2) {
      const headers: AxiosRequestConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const authorizationCode = params[1];
      axios
        .post(`${url}connect`, { authorizationCode }, headers)
        .then((res) => {
          props.history.replace('/settings');
        })
        .catch((e) => e);
    }
  }, []);

  return (
    <Container>
      <Header>
        <h2>Account Settings</h2>
        <Card>
          <Positioner>
            <a
              /* tslint:disable-next-line */
              href={`https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write`}
            >
              <Button text='Connect with stripe' />
            </a>
          </Positioner>
          <Positioner>
            <h3>Contact Information</h3>
            <Button text='Update Contact Info' />
          </Positioner>
        </Card>
      </Header>
    </Container>
  );
};

export default Settings;
