import React from 'react';

import { isAuth } from '../../helpers/auth';

import Loader from '../../components/Loader';

import { Page } from '../../components/Page/styled';
import { Container } from '../../components/Container/styled';
import { Input } from '../../components/Input/styled';
import { Button } from '../../components/Button/styled';
import * as LoginStyle from './styled';

const LoginPage = () => {
  if (!isAuth()) {
    return <Loader />
  }

  return (
    <Page>
      <Container>
        <LoginStyle.ContainerLogin>
          <LoginStyle.RowLogin>
            <Input type="text" placeholder="Usuário" />
          </LoginStyle.RowLogin>
          <LoginStyle.RowLogin>
            <Input type="password" placeholder="Senha" />
          </LoginStyle.RowLogin>
          <LoginStyle.RowLogin>
            <Button type="button">ENTRAR</Button>
          </LoginStyle.RowLogin>
        </LoginStyle.ContainerLogin>
      </Container>
    </Page>
  )
}

export default LoginPage;