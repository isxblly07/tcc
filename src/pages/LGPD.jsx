import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap'
import { FaShieldAlt, FaDownload, FaTrash, FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

const LGPD = () => {
  const { user } = useAuth()
  const [showDataModal, setShowDataModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [dataExport, setDataExport] = useState(null)

  const handleExportData = async () => {
    try {
      const userData = {
        pessoais: {
          nome: user.name,
          email: user.email,
          telefone: user.phone,
          dataCadastro: '2024-01-01'
        },
        agendamentos: [
          { id: 1, servico: 'Corte Feminino', data: '2024-01-15', status: 'completed' }
        ],
        pagamentos: [
          { id: 1, valor: 45.00, metodo: 'pix', data: '2024-01-15' }
        ],
        avaliacoes: [
          { id: 1, servico: 'Corte Feminino', nota: 5, comentario: 'Excelente!' }
        ]
      }
      
      setDataExport(userData)
      setShowDataModal(true)
    } catch (error) {
      toast.error('Erro ao exportar dados')
    }
  }

  const handleDownloadData = () => {
    const dataStr = JSON.stringify(dataExport, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `meus_dados_timeright_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Dados exportados com sucesso!')
  }

  const handleDeleteAccount = async () => {
    try {
      // Simular exclusão
      toast.success('Solicitação de exclusão enviada. Processamento em até 30 dias.')
      setShowDeleteModal(false)
    } catch (error) {
      toast.error('Erro ao solicitar exclusão')
    }
  }

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card>
            <Card.Header className="text-center">
              <h4>
                <FaShieldAlt className="me-2" />
                Proteção de Dados - LGPD
              </h4>
            </Card.Header>
            <Card.Body>
              <Alert variant="info">
                <strong>Seus direitos sob a LGPD:</strong><br />
                A Lei Geral de Proteção de Dados garante seus direitos sobre seus dados pessoais.
              </Alert>

              <div className="mb-4">
                <h5>Seus Direitos</h5>
                <ul>
                  <li><strong>Acesso:</strong> Saber quais dados temos sobre você</li>
                  <li><strong>Correção:</strong> Corrigir dados incorretos</li>
                  <li><strong>Exclusão:</strong> Solicitar remoção dos seus dados</li>
                  <li><strong>Portabilidade:</strong> Exportar seus dados</li>
                  <li><strong>Oposição:</strong> Opor-se ao tratamento</li>
                </ul>
              </div>

              <div className="d-grid gap-3">
                <Button 
                  variant="primary" 
                  onClick={handleExportData}
                  className="d-flex align-items-center justify-content-center"
                >
                  <FaEye className="me-2" />
                  Ver Meus Dados
                </Button>

                <Button 
                  variant="success" 
                  onClick={handleExportData}
                  className="d-flex align-items-center justify-content-center"
                >
                  <FaDownload className="me-2" />
                  Exportar Meus Dados
                </Button>

                <Button 
                  variant="danger" 
                  onClick={() => setShowDeleteModal(true)}
                  className="d-flex align-items-center justify-content-center"
                >
                  <FaTrash className="me-2" />
                  Solicitar Exclusão da Conta
                </Button>
              </div>

              <div className="mt-4">
                <h6>Como Usamos Seus Dados</h6>
                <p className="small text-muted">
                  • <strong>Dados de cadastro:</strong> Para identificação e contato<br />
                  • <strong>Histórico de agendamentos:</strong> Para prestação do serviço<br />
                  • <strong>Dados de pagamento:</strong> Para processamento financeiro<br />
                  • <strong>Avaliações:</strong> Para melhoria dos serviços<br />
                  • <strong>Logs de acesso:</strong> Para segurança do sistema
                </p>
              </div>

              <div className="mt-3">
                <h6>Compartilhamento</h6>
                <p className="small text-muted">
                  Seus dados não são vendidos ou compartilhados com terceiros para fins comerciais.
                  Compartilhamos apenas com processadores de pagamento e quando exigido por lei.
                </p>
              </div>

              <div className="mt-3">
                <h6>Contato do Encarregado</h6>
                <p className="small text-muted">
                  Para exercer seus direitos ou tirar dúvidas sobre proteção de dados:<br />
                  <strong>Email:</strong> lgpd@timeright.com<br />
                  <strong>Telefone:</strong> (11) 99999-9999
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de Visualização de Dados */}
      <Modal show={showDataModal} onHide={() => setShowDataModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Meus Dados Pessoais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataExport && (
            <div>
              <h6>Dados Pessoais</h6>
              <pre className="bg-light p-3 rounded small">
                {JSON.stringify(dataExport.pessoais, null, 2)}
              </pre>

              <h6>Agendamentos</h6>
              <pre className="bg-light p-3 rounded small">
                {JSON.stringify(dataExport.agendamentos, null, 2)}
              </pre>

              <h6>Pagamentos</h6>
              <pre className="bg-light p-3 rounded small">
                {JSON.stringify(dataExport.pagamentos, null, 2)}
              </pre>

              <h6>Avaliações</h6>
              <pre className="bg-light p-3 rounded small">
                {JSON.stringify(dataExport.avaliacoes, null, 2)}
              </pre>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDataModal(false)}>
            Fechar
          </Button>
          <Button variant="success" onClick={handleDownloadData}>
            <FaDownload className="me-1" />
            Baixar Dados
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão da Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <strong>Atenção!</strong> Esta ação é irreversível.
          </Alert>
          <p>
            Ao solicitar a exclusão da sua conta:
          </p>
          <ul>
            <li>Todos os seus dados serão removidos em até 30 dias</li>
            <li>Você não poderá mais acessar o sistema</li>
            <li>Histórico de agendamentos será perdido</li>
            <li>Esta ação não pode ser desfeita</li>
          </ul>
          <p>
            <strong>Tem certeza que deseja continuar?</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Confirmar Exclusão
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default LGPD