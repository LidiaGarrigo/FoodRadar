import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { BarcodeScanner } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

 codigo = 'https://world.openfoodfacts.org/api/v0/product[barcode].json';

  constructor() { }

  async startScan() {
    await this.checkPermission();
    // const { BarcodeScanner } = Plugins;
    BarcodeScanner.hideBackground(); // make background of WebView transparent
  
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
  
    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      return result.content;
    }
  };

  async checkPermission(){
    
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });
  
    if (status.granted) {
      // the user granted permission
      return true;
    }
  
    return false;
  };


}