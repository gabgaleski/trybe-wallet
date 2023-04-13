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

  it('Verificar os inputs da pagina wallet junto com o header da tabela', () => {
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

    expect(screen.getByRole('columnheader', {
      name: /descrição/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('columnheader', {
      name: /tag/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('columnheader', {
      name: /método de pagamento/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('columnheader', {
      name: /câmbio utilizado/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('columnheader', {
      name: /valor convertido/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('columnheader', {
      name: /moeda de conversão/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('columnheader', {
      name: /editar\/excluir/i,
    })).toBeInTheDocument();

    userEvent.type(getValueInput, '3');
    userEvent.type(descriptionInput, 'chocolate');
    userEvent.click(getBtn);
  });
});

describe('Testando a funcionalidade do componente wallet', () => {
  it('Testa se é renderizado na tela uma nova despesa', async () => {
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

    const valueInput = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });

    const describeInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });

    const btn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '3');
    userEvent.type(describeInput, 'chocolate');
    userEvent.click(btn);

    expect(await screen.findByRole('cell', {
      name: /chocolate/i,
    }));

    expect(await screen.findByRole('cell', {
      name: /3\.00/i,
    }));

    const getDeletedBtn = await screen.findByRole('button', {
      name: /excluir/i,
    });

    userEvent.click(getDeletedBtn);
  });
});
