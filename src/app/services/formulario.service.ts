import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
const CONTACTS = 'contactos';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

constructor() { }
contacts = [];

public async readStorage() {
  const contactList = await Storage.get({ key: CONTACTS });
  return JSON.parse(contactList.value) || [];

}

async writeStorage(contact){
  this.contacts.push(contact);
  console.log(this.contacts);
  
  Storage.set({
    key: CONTACTS,
    value: JSON.stringify(this.contacts) /* [this.contacts.length -1] */
  });

}

}
