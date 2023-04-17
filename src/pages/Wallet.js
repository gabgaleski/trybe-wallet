import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <section className="main-container">
        <Header />
        <WalletForm />
        <Table />
      </section>
    );
  }
}

export default connect()(Wallet);
