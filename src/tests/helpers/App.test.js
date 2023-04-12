import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Realiza testes no App, se renderiza a pagina inicial e a passagem para a pagina wallet com o click do botao', () => {
  it('Verifica se os inputs de email, senha e o bottao estao na tela', () => {
    renderWithRouterAndRedux(<App />);

    const getInputEmail = screen.getByRole('textbox', {
      name: /email/i,
    });
    const getInputPassword = screen.getByLabelText(/senha/i);
    const getButton = screen.getByRole('button', {
      name: /Entrar/i,
    });

    expect(getInputEmail).toBeInTheDocument();
    expect(getButton).toBeInTheDocument();
    expect(getInputPassword).toBeInTheDocument();
  });

  it('testa se a pagina muda ao preencher os campos e clicar no bota', () => {
    renderWithRouterAndRedux(<App />);

    const getInputEmail = screen.getByRole('textbox', {
      name: /email/i,
    });
    const getInputPassword = screen.getByLabelText(/senha/i);
    const getButton = screen.getByRole('button', {
      name: /Entrar/i,
    });

    userEvent.type(getInputEmail, 'trybe@teste.com');
    userEvent.type(getInputPassword, '123123123');
    userEvent.click(getButton);

    expect(screen.getByText(/trybe@teste.com/i)).toBeInTheDocument();
    expect(screen.getByText(/despesa total:/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
  });

  it('Verificar os inputs da pagina wallet', () => {
    renderWithRouterAndRedux(<App />);

    const getInputEmail = screen.getByRole('textbox', {
      name: /email/i,
    });
    const getInputPassword = screen.getByLabelText(/senha/i);
    const getButton = screen.getByRole('button', {
      name: /Entrar/i,
    });

    userEvent.type(getInputEmail, 'trybe@teste.com');
    userEvent.type(getInputPassword, '123123123');
    userEvent.click(getButton);

    const getValueInput = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });

    const getBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(getValueInput, '3');
    userEvent.type(descriptionInput, 'chocolate');
    userEvent.click(getBtn);
  });
});
