import React, { useState, useEffect } from 'react';

import { Input } from '../../../../components/Input/styled';
import { Text } from '../../../../components/Text/styled';
import { Button } from '../../../../components/Button/styled';

import { POST, PUT, DELETE } from '../../../../services'

import { 
  Backdrop,  
  Modal,
  ContainerModal,
  ModalContainer,
  InputWrapper,
  FileWrapper,
  ModalHeader,
  ModalFooter,
  Error,
  ButtonEdit,
  ButtonDelete,
  File
} from './styled';

const ModalCrud = ({
  type,
  handleClose,
  dataEmpresa,
  handleType
}) => {
  const [empresaDetail, setEmpresaDetail] = useState({
    foto: dataEmpresa?.foto,
    nome: dataEmpresa?.nome,
    cnpj: dataEmpresa?.cnpj,
    demanda: dataEmpresa?.valor_monetario,
    faturamento: dataEmpresa?.faturamento_anual,
    sobre: dataEmpresa?.sobre
  });

  const [errorSubmit, setErrorSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fieldNome, setFieldNome] = useState('');
  const [fieldCnpj, setFieldCnpj] = useState('');
  const [fieldDemanda, setFieldDemanda] = useState('');
  const [fieldFaturamento, setFieldFaturamento] = useState('');
  const [fieldSobre, setFieldSobre] = useState('');

  useEffect(() => {
    if (type === 'create') {
      // ...
    } else if (type === 'edit' || type === 'read') {
      setFieldNome(empresaDetail.nome);
      setFieldCnpj(empresaDetail.cnpj);
      setFieldDemanda(empresaDetail.demanda);
      setFieldFaturamento(empresaDetail.faturamento);
      setFieldSobre(empresaDetail.sobre);
    } else if (type === 'delete') {
      // ...
    } else {
      console.log('TYPE MODAL CRUDO NOT DEFINED.');
    }
  }, [type])

  const handleSubmitConfirm = async () => {
    try {
      if (
        !fieldNome
        || !fieldCnpj
        || !fieldDemanda
        || !fieldFaturamento
        || !fieldSobre
      ) {
        setErrorSubmit(true);
        return false;
      }

      if (type === 'create' && !fieldFoto) {
        setErrorSubmit(true);
        return false;
      }

      setLoading(true);

      const dataPayload = {
        logo: fieldFoto || dataEmpresa?.logo,
        nome: fieldNome,
        cnpj: fieldCnpj,
        valor_monetario: fieldDemanda,
        faturamento_anual: fieldFaturamento,
        sobre: fieldSobre,
      }
      console.log('handleSubmitConfirm dataPayload:', dataPayload);

      // const response = null;
      if (type === 'create') {
        const response = await POST('empresas', dataPayload);
        console.log('handleSubmitConfirm response:', response);  

        if (response?.status === 200) {
          handleClose(true, 'Empresa criada com sucesso!');
        }
      } else if (type === 'edit') {
        const response = await PUT(`empresa/${dataEmpresa._id}`, dataPayload);
        console.log('handleSubmitConfirm response:', response);

        if (response?.status === 200) {
          handleClose(true, 'Empresa editada com sucesso!');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    try {
      const { value, name } = e?.target || {}

      switch (name) {
        case 'nome':
          setFieldNome(value);
          break;
        case 'cnpj':
          setFieldCnpj(value);
          break;
        case 'demanda':
          setFieldDemanda(value);
          break;
        case 'faturamento':
          setFieldFaturamento(value);
          break;
        case 'sobre':
          setFieldSobre(value);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [canDelete, setCanDelete] = useState(false);
  const handleDelete = async () => {
    try {
      setCanDelete(true);
      setTimeout(() => setCanDelete(false), 3000);

      if (canDelete) {
        setLoading(true);
        const response = await DELETE(`empresa/${dataEmpresa._id}`);
        console.log('handleDelete response:', response);

        if (response?.status === 200) {
          handleClose(true, 'Empresa deletada com sucesso!');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getBase64 = (file) => {
    return new Promise((res) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        res(e.target.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    });
  }

  const [fieldFoto, setFieldFoto] = useState('');
  const handleFile = async (e) => {
    const base64 = await getBase64(e.target.files[0]);
    console.log('handleFile base64:', base64);
    setFieldFoto(base64);
  };

  return (
    <>
      <Backdrop />
      <ContainerModal>
        <Modal>
          <ModalContainer>
            <ModalHeader>
              {type === 'read' && (<ButtonEdit disabled={loading} onClick={() => handleType('edit')}>Editar Dados</ButtonEdit>)}
              {dataEmpresa?._id && (<ButtonDelete disabled={loading} onClick={() => handleDelete()}>{!canDelete ? 'Deletar' : 'Click para Confirmar!'}</ButtonDelete>)}
            </ModalHeader>
            <InputWrapper>
              <Input disabled={(type === 'read')} placeholder="Nome" name="nome" value={fieldNome} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldNome && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <InputWrapper>
              <Input disabled={(type === 'read')} placeholder="CNPJ" name="cnpj" value={fieldCnpj} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldCnpj && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <InputWrapper>
              <Input disabled={(type === 'read')} placeholder="Demanda" name="demanda" value={fieldDemanda} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldDemanda && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <InputWrapper>
              <Input disabled={(type === 'read')} placeholder="Faturamento" name="faturamento" value={fieldFaturamento} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldFaturamento && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <InputWrapper>
              <Text disabled={(type === 'read')} placeholder="Sobre" name="sobre" value={fieldSobre} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldSobre && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <FileWrapper>
              <File type="file" disabled={(type === 'read')} placeholder="Foto" name="foto" onChange={handleFile} className={((type === 'create') && !fieldFoto && errorSubmit) ? 'error' : ''} />
            </FileWrapper>
            {errorSubmit && (<Error>Preencha os campos!</Error>)}
            <ModalFooter>
              <Button onClick={handleClose}>{type !== 'view' ? 'Cancelar' : 'Fechar'}</Button>
              {type === 'create' && (<Button disabled={loading} onClick={handleSubmitConfirm}>Cadastrar</Button>)}
              {type === 'edit' && (<Button disabled={loading} onClick={handleSubmitConfirm}>Editar</Button>)}
            </ModalFooter>
          </ModalContainer>
        </Modal>
      </ContainerModal>
    </>
  )
}

export default ModalCrud;