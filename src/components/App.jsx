import { useState } from 'react';
import useLocalStorage from './hook/useLocalStorage';
import data from './data/data.json'
import Contacts from './Contacts';
import Forma from './Forma';
import { nanoid } from 'nanoid'
import { Notify } from 'notiflix';
import { Title } from './Wrapper/Wrapper.styled';
import Filter from './Filter';
import Wrapper from './Wrapper';

function App(){
    const [contacts, setContacts] = useLocalStorage(data);
  const [filter, setFilter] = useState('');

    // ! ====== Add contact to state ======
    const addNewContact = ({ nameNew, numberNew}) => {
      console.log("nameNew, numberNew", nameNew, numberNew);

    const newNameToLowerCase = nameNew.toLowerCase();

      let index = -1

     index = (contacts.findIndex(({ name, number }) => (name.toLowerCase() === newNameToLowerCase && number === numberNew)))
    if(index !== -1){
        Notify.failure(`${contacts[index].name} and number ${contacts[index].number}   is already in list contacts`);
        console.log("index >>>", index);
        return;
        }

    index = (contacts.findIndex(({ number }) => (number === numberNew)))
    if(index !== -1) {
        Notify.failure(`This number ${contacts[index].number} is already in list contacts ${contacts[index].name}`);
        return;
      }


    const newContact = {
      id: nanoid(),
      name: nameNew,
      number: numberNew,
    };

    setContacts(prevState =>
      [...prevState, newContact]
    );
  }

    // ! ====== Delete contact from state ======

    const deleteContact = id => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== id),

      );
    };


    // ! ====== Write a content of filter to state from user ======
    const valueInputFilter = event => {
      setFilter( event.currentTarget.value );
    };


    // ! ====== Function-filter contacts for render ======
    const visibleContacts = () => {
    console.log("visibleContacts was to work")
    // const { filter, contacts } = this.state;
    const seekLetterOfFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(seekLetterOfFilter)
    );
    };


      return (
        <Wrapper>
          <Title>Phonebook</Title>
          <Forma onSubmit={addNewContact} />
          <Title>Contacts</Title>
          <Filter value={filter} onChange={valueInputFilter} />
          <Contacts
            contacts={visibleContacts()}
            pressDeleteContact={deleteContact}
        />
        </Wrapper>

      )
    }

  export default App;

