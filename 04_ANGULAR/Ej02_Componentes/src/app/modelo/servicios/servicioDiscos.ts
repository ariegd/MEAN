import { Disco } from "../entidades/disco";

export class ServicioDiscos {

    private discos:Disco[] = []

    public insertar(disco:Disco):void{
        disco.id = Date.now() //timestamp
        this.discos.push(disco)
    }

    public listar():Disco[]{
        //Truqui cutrecillo
        return JSON.parse(JSON.stringify(this.discos))
    }

}




