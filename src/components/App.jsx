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
      const newNameToLowerCase = nameNew.toLowerCase();

    //  let index = -1
    //  index = (contacts.findIndex(({ name, number }) => (name.toLowerCase() === newNameToLowerCase && number === numberNew)))
    // if(index !== -1){
    //     Notify.failure(`${contacts[index].name} and number ${contacts[index].number}   is already in list contacts`);
    //     console.log("index >>>", index);
    //     return;
    //     }

    // index = (contacts.findIndex(({ number }) => (number === numberNew)))
    // if(index !== -1) {
    //     Notify.failure(`This number ${contacts[index].number} is already in list contacts ${contacts[index].name}`);
    //     return;
    //   }

// ! ====================== НОТАТКА ДЛЯ МЕНТОРА! =========================================
// ! Зверніть будь-ласка увагу, що я не використовую  метод для пошуку по масиву find з той причини, що
// ! результатом його роботи є перший знайдений елемент за умовою у колл-бек функції.
// ! Для відображення повідомлення користувачу з використанням  Notify, у якому відображаються
// ! ІМ'Я та НОМЕРУ З реально ІСНУЮЧОГО МАСИВА, я використовую метод findIndex,
// ! якій якраз і повертає номер знайденого індексу з масиву contacts,
// ! який як раз мені і потрібен для задуманого мною відпрацювання відображення повідомлення користувачу.
// ! Тому і в умові (nameAndNumberIsExistIndex >= 0) опретора if задається >=0 (а не просто if(nameAndNumberIsExistIndex)),
// ! бо якщо дійсно новий контакт заводиться, то вказана у nameAndNumberIsExistIndex умова в цьому разі поверне значення -1
// ! (індекс не знайдено), і тоді вираз у операторі if спрацює НЕКОРЕКТНО, бо не знайде елемент масиву з номером індексу -1.
// !
// ! Те саме стосується і перевірки введеного номеру телефону на існування у існуючому масиві.

      const nameAndNumberIsExistIndex = (contacts.findIndex(({ name, number }) => (name.toLowerCase() === newNameToLowerCase && number === numberNew)))
        if (nameAndNumberIsExistIndex >= 0) {
        Notify.failure(`${contacts[nameAndNumberIsExistIndex].name} and number ${contacts[nameAndNumberIsExistIndex].number}   is already in list contacts`);
        return;
        }

      const numberIsExistIndex = (contacts.findIndex(({ number }) => (number === numberNew)))
    if(numberIsExistIndex >= 0) {
        Notify.failure(`This number ${contacts[numberIsExistIndex].number} is already in list contacts ${contacts[numberIsExistIndex].name}`);
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

    // ! ====== Delete contact from state after click button 'Delete' ======

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

