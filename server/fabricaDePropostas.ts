import { WSAEPROTONOSUPPORT } from "constants";
import { relative } from "path";

// Crawler para pegar as informações dos jogos.
export class fabricaDePropostas {

    Propor(jogos):any[]{
        let propostas: any[] = [];
        //console.log(jogos);
        for(let j = 0; j < 14; j++) {

            let posm = jogos[j].vitoriaMandante.indexOf("%");
            let posv = jogos[j].vitoriaVisitante.indexOf("%");
            let pose = jogos[j].empate.indexOf("%");

            let proposta: any = this.calcularProp([jogos[j].vitoriaMandante.substring(0,posm),
                                                    jogos[j].vitoriaVisitante.toString().substring(0,posv),
                                                     jogos[j].empate.toString().substring(0,pose)]);
            
            console.log(proposta);
            propostas.push({
                mandante: jogos[j].mandante,
                visitante: jogos[j].visitante,
                numeroJogo: "Jogo "+j+"",
                //data: jogos[j].data,
                prop_Mandante: proposta.mandante,
                prop_Visitante:proposta.visitante,
                prop_Empate: proposta.empate
            });
        }
        console.log(propostas);
        return propostas;
    }

    calcularProp(prob){
        let prop: any[] = [];
        console.log(prob);
        if(parseInt(prob[0],10) > parseInt(prob[1],10) && parseInt(prob[0],10) > parseInt(prob[2],10)){
            prop.push({
                mandante: true,
                visitante: false,
                empate: false
            });
            
        }else if(parseInt(prob[1],10)  > parseInt(prob[0],10) && parseInt(prob[1],10)  > prob[2]){
            prop.push({
                mandante: false,
                visitante: true,
                empate: false
            });
        }else if(parseInt(prob[2],10) > parseInt(prob[0],10) && prob[2] > parseInt(prob[1],10) ){
            prop.push({
                mandante: false,
                visitante: false,
                empate: true
            });
        }else{
            prop.push({
                mandante: false,
                visitante: false,
                empate: false
                });
        }
        //console.log(prop);
        return prop[0];
    }

}
