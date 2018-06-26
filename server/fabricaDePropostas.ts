import { WSAEPROTONOSUPPORT } from "constants";
import { relative } from "path";

// Crawler para pegar as informações dos jogos.
export class fabricaDePropostas {

    Propor(jogos):any[]{
        let propostas: any[] = [];

        for(let j = 0; j < 14; j++) {

            console.log(porcentagemParaInteiro(jogos[j]));
            let proposta: any = this.calcularProp(porcentagemParaInteiro(jogos[j]));
            
            propostas.push({
                mandante: jogos[j].mandante,
                visitante: jogos[j].visitante,
                numeroJogo: "Jogo "+j+"",
                tipo_proposta: proposta.tipo,
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
        if(prob[0] > prob[2] && prob[1] > prob[2] && Math.abs(prob[0]-prob[1])<10){
            prop.push({
                tipo: "dupla",
                mandante: true,
                visitante: true,
                empate: false
            });
        }else if(prob[0] > prob[1] && prob[2] > prob[1] && Math.abs(prob[0]-prob[2])<10){
            prop.push({
                tipo: "dupla",
                mandante: true,
                visitante: false,
                empate: true
            });
        }else if(prob[1] > prob[0] && prob[2] > prob[0] && Math.abs(prob[1]-prob[2])<10){
            prop.push({
                tipo: "dupla",
                mandante: false,
                visitante: true,
                empate: true
            });
        }else if(prob[0] > prob[1] && prob[0] > prob[2]){
            prop.push({
                tipo: "simples",
                mandante: true,
                visitante: false,
                empate: false
            });
            
        }else if(prob[1]  > prob[0] && prob[1]  > prob[2]){
            prop.push({
                tipo: "simples",
                mandante: false,
                visitante: true,
                empate: false
            });
        }else if(prob[2] > prob[0] && prob[2] > prob[1]){
            prop.push({
                tipo: "simples",
                mandante: false,
                visitante: false,
                empate: true
            });
        }else{
            prop.push({
                tipo: "inválido",
                mandante: false,
                visitante: false,
                empate: false
            });
        }
        console.log(prop);
        return prop[0];
    }

}

function porcentagemParaInteiro(jogo){
    let posm = jogo.vitoriaMandante.indexOf("%");
    let posv = jogo.vitoriaVisitante.indexOf("%");
    let pose = jogo.empate.indexOf("%");
    
    //Eliminar o simbolo de porcentagem
    let jogoString: any[] = [];
    jogoString[0] = jogo.vitoriaMandante.toString().substring(0,posm);
    jogoString[1] = jogo.vitoriaVisitante.toString().substring(0,posv);
    jogoString[2] = jogo.empate.toString().substring(0,pose);

    //Transformar em numero inteiro
    let jogoInt: any[] = [];
    jogoInt[0] = parseInt(jogoString[0],10);
    jogoInt[1] = parseInt(jogoString[1],10);
    jogoInt[2] = parseInt(jogoString[2],10);

    return jogoInt;
    
}
