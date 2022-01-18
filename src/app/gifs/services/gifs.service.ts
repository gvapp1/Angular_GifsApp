import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' // PERMITE DE QUE LOS SERVICOS PUEDAN ESTAR DEFINIDOS EN EL MOMENTO QUE SE CONSTRUYE EL BONO DE LA APP
                    // AL ESPECIFICAR EL PROIVDE IN ROOT EN EL DECORADOR LE DICE A ANGULAR, NO IMPORTA EN QUE PARTE DE LA APP
                    //SE ENCUENTRE EL SERVIDOR VA A SER UNICO Y DE MANERA GLOBAL EN EL ROOT, EVITA ESPECIFICARLO EN LOS PROVIDES DEL MODULE.
                    //ANGULAR LO ELEVA A UN NIVEL GLOBAL DE LA APP
})
export class GifsService {

private apiKey : string = 'ltfs5pmOFmgxW23A5J8SuOkGbrEOaQPw';
private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];
  //TODO: Ccambiar any por su tipo correspondiente
  public resultados:Gif[] = [];

  get historial(){
    return [...this._historial];
  }
  
  //El servicio se llama una sola vez, independiente de cuantas veces se llame en la app
  constructor(private http: HttpClient){
this._historial = JSON.parse(localStorage.getItem('historial')!) || []
this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []


    //  if(localStorage.getItem('historial')){
    //    this._historial = JSON.parse(localStorage.getItem('historial')!);
    //  }
  }

  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){ //Si no lo incluye, si no lo existe
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); // solo crea 10 y se va reinicinado.
      
      //gfabando en el localstorage
      localStorage.setItem('historial',JSON.stringify(this._historial));

    }
    
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',query);
    
    
    //Observables, mas poderosos que las promesas, tienen mayor control que las promesas
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`,{params})
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;      
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    })//Sejecuta cuando tenemos la resolución del get, cuando tenemos la respuesta

    //esto es javascritp, es una promesa
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=ltfs5pmOFmgxW23A5J8SuOkGbrEOaQPw&q=dragon ball z&limit=10')
    // .then(resp => {
    //   resp.json().then(data =>{
    //     console.log(data);
        
    //   })
    // })
    

  }
}
