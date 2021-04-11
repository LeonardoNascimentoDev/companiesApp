import React, { useEffect, useState } from 'react';

import { isAuth } from '../../helpers/auth';

import { Page } from '../../components/Page/styled';
import { Container } from '../../components/Container/styled';
import Loader from '../../components/Loader';
import { Button } from '../../components/Button/styled';

import { 
  Header, 
  Body, 
  BodyHeader, 
  HeaderColLeft,
  HeaderColCenter,
  HeaderColRight, 
  Brand, 
  Search,
  Profile,
  ProfileAvatar,
  ProfileUser,
  BodyHeaderColLefth,
  BodyHeaderColRight,
  BodyHeaderTitle,
  ContainerEmpresasList,
  ContainerEmpresasListWrapper,
  ContentEmpresasListWrapper,
  ContainerEmpresasListWrapperFoto,
  ContainerEmpresasListWrapperHeader,
  ContainerEmpresasListWrapperBody,
  ContainerEmpresasListWrapperTitle,
  ContainerEmpresasListWrapperSobre,
  Message,
  Paginate,
  PaginateItem,
  ResultSearch,
  ResultSearchTitle,
  ResultSearchSobre
} from './styled';

import ModalCrud from './components/ModalCrud';
import { GET } from '../../services';

const EmpresasPage = () => {

  const [searchValue, setSearchValue] = useState(null);
  const [resultSearch, setResultSearch] = useState(null);
  const handleSearch = async () => {
    try {
      console.log('handleSearch target...');
      if (searchValue) {
        const response = await GET(`empresas/search/${searchValue}`);
        const responseResult = await response.json();
        console.log('handleSearch responseResult:', responseResult);
        setResultSearch(responseResult);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchValue) handleSearch();
  }, [searchValue])

  const [paginate, setPaginate] = useState(null);
  const [empresasList, setEmpresasList] = useState([]);
  const [empresasResponse, setEmpresasResponse] = useState([]);

  const perPage = 10;

  const handleGetEmpresas = async () => {
    try {
      const response = await GET('empresas');
      console.log('handleGetEmpresas response:', response);
      const responseResolved = await response.json();
      console.log('handleGetEmpresas responseResolved:', responseResolved);
      setEmpresasResponse(responseResolved);

      if (responseResolved?.length) {
        // Resolve a paginação
        const currentPage = 1;
        const numPages = Math.ceil(responseResolved.length / perPage);
        console.log('handleGetEmpresas numPages:', numPages);
        const pages = []
        console.log('handleGetEmpresas pages:', pages);

        for (let index = 1; index < numPages; index++) {
          pages.push({text: index});
        }

        const init = 0; // currentPage * perPage;
        const end = init + perPage
        console.log('handleGetEmpresas init:', init);
        console.log('handleGetEmpresas end:', end);
        const result = responseResolved.slice(init, end);
        console.log('handleGetEmpresas result:', result);

        setPaginate({
          pages,
          currentPage
        });

        // Set resultado inicial
        setEmpresasList(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetEmpresas();
  }, []);

  const [viewModalCrud, setViewModalCrud] = useState(false);
  const [typeModalCrud, setTypeModalCrud] = useState(null);
  const [dataEmpresa, setDataEmpresa] = useState(null);
  const handleOpenModalCrud = (type, empresa) => {
    setViewModalCrud(true);
    setTypeModalCrud(type);
    if (empresa) setDataEmpresa(empresa);
  }

  const [message, setMessage] = useState(null);
  const handleCloseModalCrud = (refresh, messageCrud) => {
    setViewModalCrud(false);
    setTypeModalCrud(null);

    if (messageCrud) {
      setMessage(messageCrud);
      setTimeout(() => setMessage(null), 3000);
      window.scrollTo(0, 0);
    }

    if (refresh) handleGetEmpresas();
  }

  const handlePaginate = (page) => {
    try {
      console.log('handlePaginate paginate:', paginate);
      const init = page * perPage;
      const end = init + perPage
      console.log('handleGetEmpresas init:', init);
      console.log('handleGetEmpresas end:', end);
      const result = empresasResponse.slice(init, end);
      console.log('handleGetEmpresas result:', result);

      setPaginate({
        ...paginate,
        currentPage: page
      })

        // Set resultado inicial
        setEmpresasList(result);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Render
  */
  if (!isAuth()) {
    return <Loader />
  }

  return (
    <Page>
      <Container>
        <Header>
          <HeaderColLeft>
            <Brand src="http://localhost:3000/logo192.png" alt="Brand" />
          </HeaderColLeft>
          <HeaderColCenter>
            <Search placeholder="Pesquisar..." onChange={(e) => setSearchValue(e?.target?.value)}/>
            {resultSearch && (
              <ResultSearch onClick={() => handleOpenModalCrud('read', resultSearch)}>
                <ResultSearchTitle>{resultSearch?.nome}</ResultSearchTitle>
                <ResultSearchSobre>{resultSearch?.sobre}</ResultSearchSobre>
              </ResultSearch>
            )}
          </HeaderColCenter>
          <HeaderColRight>
             <Profile>
              <ProfileAvatar src="http://localhost:3000/logo192.png" alt="Profile user avatar" />
              <ProfileUser>Murilo BrBatel</ProfileUser>
             </Profile>
          </HeaderColRight>
        </Header>
        <Body>
          <BodyHeader>
            <BodyHeaderColLefth>
              <BodyHeaderTitle>Empresas</BodyHeaderTitle>
            </BodyHeaderColLefth>
            <BodyHeaderColRight>
              <Button onClick={() => handleOpenModalCrud('create')}>ADICIONAR</Button>
            </BodyHeaderColRight>
          </BodyHeader>

          {message && (<Message>{message}</Message>)}
          
          <ContainerEmpresasList>
            {empresasList.map((empresa, i) => (
              <ContainerEmpresasListWrapper key={String(i)} onClick={() => handleOpenModalCrud('read', empresa)}>
                <ContentEmpresasListWrapper>
                  <ContainerEmpresasListWrapperHeader>
                    <ContainerEmpresasListWrapperFoto src={empresa.logo || 'http://localhost:3000/empresa-default.png'} />
                  </ContainerEmpresasListWrapperHeader>
                  <ContainerEmpresasListWrapperBody>
                    <ContainerEmpresasListWrapperTitle>{empresa.nome}</ContainerEmpresasListWrapperTitle>
                    <ContainerEmpresasListWrapperSobre>{empresa.sobre}</ContainerEmpresasListWrapperSobre>
                  </ContainerEmpresasListWrapperBody>
                  </ContentEmpresasListWrapper>
              </ContainerEmpresasListWrapper>
            ))}
          </ContainerEmpresasList>
        </Body>

        {!!paginate?.pages?.length && (
          <Paginate className='paginate'>
            {paginate.pages.map((item, i) => (
              <PaginateItem key={i} className={paginate.currentPage === item.text ? 'selected' : ''} onClick={() => handlePaginate(item.text)}>{item.text}</PaginateItem>
            ))}
          </Paginate>
        )}
      </Container>

      {viewModalCrud && (
        <ModalCrud 
          type={typeModalCrud}
          handleType={setTypeModalCrud}
          handleClose={handleCloseModalCrud}
          dataEmpresa={dataEmpresa}
          />
      )}
    </Page>
  )
}

export default EmpresasPage;