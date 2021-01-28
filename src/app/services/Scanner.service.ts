/* import { HttpClient } from '@angular/common/http'; */
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
/* import { Observable } from 'rxjs'; */
const { BarcodeScanner } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

 codigo = 'https://world.openfoodfacts.org/api/v0/product[barcode].json';

//////////// FUNCIONALIDAD CÓDIGO DE BARRAS - LECTOR NUMEROS ////////////

/*  API_URL = "https://world.openfoodfacts.org/api/v0/${query}/.json"
    query = '';
  constructor(private http: HttpClient) { }
  getProducts(): Observable<any>{
    return this.http.get(this.API_URL);
  }
  searchProducts(query = ''){
    return this.http.get(`${this.API_URL}/${query}/`);
  } */
  
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
  }
  stopScanner(){
    const stopScan = () => {
      const { BarcodeScanner } = Plugins;
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
  };
}

}