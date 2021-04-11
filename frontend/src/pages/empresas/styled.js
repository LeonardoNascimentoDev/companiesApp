import styled from 'styled-components';

import { Input } from '../../components/Input/styled';

export const Title = styled.h1``;

export const Header = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  padding: 25px 10px;
  justify-content: space-between;
  background-color: #FFF;
`;

export const HeaderColLeft = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  width: 25%;
  flex-basis: 25%;

  @media (min-width: 35em) {
    width: 15%;
    flex-basis: 15%;
  }
`;

export const HeaderColCenter = styled.div`
  /* border: 1px solid blue; */
  position: relative;
  display: flex;
  justify-content: center;
  width: 50%;
  flex-basis: 50%;
  padding: 5px 50px;

  @media (min-width: 35em) {
    width: 70%;
    flex-basis: 70%;
  }
`;

export const HeaderColRight = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 25%;
  flex-basis: 25%;

  @media (min-width: 35em) {
    width: 15%;
    flex-basis: 15%;
  }
`;

export const Brand = styled.img`
  height: 60px;
  margin-left: 10px;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 35em) {
    flex-direction: row;
  }
`;

export const ProfileAvatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 25px;
  margin-right: 8px;
`;

export const ProfileUser = styled.span`
  font-size: 10px;
  text-overflow: ellipsis;
  width: 50px;
  white-space: nowrap;
  overflow: hidden;

  @media (min-width: 35em) {
    font-size: unset;
    width: 80px;
  }
`;

export const Search = styled(Input)``;

export const Body = styled.div`
  /* border: 2px solid blue; */
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-basis: 100%;
  height: 100%;
  background-color: #F2F2F2;
`;

export const BodyHeader = styled.div`
  /* border: 2px solid blue; */
  width: 100%;
  display: flex;
  height: 45px;
  margin: 10px 5px;
  padding: 0 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

export const BodyHeaderColLefth = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 50%;
  flex-basis: 50%;
`;

export const BodyHeaderColRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 50%;
  flex-basis: 50%;
`;

export const BodyHeaderTitle = styled.h1`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0;
`;

export const ContainerEmpresasList = styled.div`
  /* border: 2px solid red; */
  display: flex;
  flex-direction: row;
  align-content: start;
  flex-wrap: wrap;
  width: 100%;
  flex-basis: 100%;
  background-color: #FFF;
`;

export const ContainerEmpresasListWrapper = styled.div`
  /* border: 2px solid green; */
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-basis: 100%;
  height: 160px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;

  @media (min-width: 35em) {
    width: 25%;
    flex-basis: 25%;
  }
`;

export const ContentEmpresasListWrapper = styled.div`
  /* border: 2px solid green; */
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-basis: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

export const ContainerEmpresasListWrapperHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-basis: 100%;
  height: 100px;
`;

export const ContainerEmpresasListWrapperBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-basis: 100%;
  height: 50px;
  align-items: center;
`;

export const ContainerEmpresasListWrapperFoto = styled.img`
  width: 80px;
  flex-basis: 80px;
  height: max-content;
`;

export const ContainerEmpresasListWrapperTitle = styled.h2`
  width: 80%;
  margin: 0;
  flex-basis: 80%;
  font-size: 16px;
  line-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
`;

export const ContainerEmpresasListWrapperSobre = styled.p`
  width: 80%;
  margin: 0;
  flex-basis: 80%;
  font-size: 12px;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
`;

export const Message = styled.p`
  color: black;
  text-align: center;
  font-weight: bold;
  font-size: 17px;
`;

export const Paginate = styled.div`
  /* border: 2px solid red; */
  display: flex;
  flex-direction: row;
  align-content: start;
  flex-wrap: wrap;
  width: 100%;
  flex-basis: 100%;
  margin: 22px;
`;

export const PaginateItem = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-content: center;
  width: 35px;
  flex-basis: 35px;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  background-color: #FFF;
  border: 2px solid #000;
  cursor: pointer;
  padding: 5px;

  &.selected {
    background-color: #000;
    color: #FFF;
  }
`;

export const ResultSearch = styled.div`
  position: absolute;
  border: 1px solid #000;
  top: 57px;
  width: 82%;
  max-width: 100%;
  padding: 15px 10px;
  background-color: #F2F2F2;
`;

export const ResultSearchTitle = styled.h4`
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;

export const ResultSearchSobre = styled.p`
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;