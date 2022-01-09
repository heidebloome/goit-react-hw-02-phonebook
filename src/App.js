import React, { Component, Fragment } from 'react';
import shortid from 'shortid';

import INITIAL_STATE from './data/initial-state.json';
import { Title } from './components/Title/Title.styled';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [...INITIAL_STATE],
    filter: '',
  };

  formSubmitHandler = (name, number) => {
    this.setState(prevState => {
      const id = shortid.generate();
      return { contacts: [...prevState.contacts, { id, name, number }] };
    });
  };

  filterChangeHandler = e => {
    this.setState({ filter: e.target.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  render() {
    const { filter } = this.state;

    return (
      <Fragment>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Title mt={7}>Contacts</Title>
        <Filter value={filter} onChange={this.filterChangeHandler} />
        <ContactList list={this.visibleContacts()} />
      </Fragment>
    );
  }
}

export default App;