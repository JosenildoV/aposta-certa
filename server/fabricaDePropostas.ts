import { WSAEPROTONOSUPPORT } from "constants";
import { relative } from "path";

const diferencaMaxima = 10;
// Crawler para pegar as informações dos jogos.
export class fabricaDePropostas {

    Propor(jogos):any[]{
        let propostas: any[] = [];

        for(let j = 0; j < 14; j++) {

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

        if(prob[0] > prob[2] && prob[1] > prob[2] && Math.abs(prob[0]-prob[1])<diferencaMaxima){
            prop.push(ColocarProposta("dupla", true, true, false));

        }else if(prob[0] > prob[1] && prob[2] > prob[1] && Math.abs(prob[0]-prob[2])<diferencaMaxima){
            prop.push(ColocarProposta("dupla", true, false, true));

        }else if(prob[1] > prob[0] && prob[2] > prob[0] && Math.abs(prob[1]-prob[2])<diferencaMaxima){
            prop.push(ColocarProposta("dupla", false, true, true));

        }else if(prob[0] > prob[1] && prob[0] > prob[2]){
            prop.push(ColocarProposta("simples", true, false, false));
            
        }else if(prob[1]  > prob[0] && prob[1]  > prob[2]){
            prop.push(ColocarProposta("simples", false, true, false));

        }else if(prob[2] > prob[0] && prob[2] > prob[1]){
            prop.push(ColocarProposta("simples", false, false, true));

        }else{
            prop.push(ColocarProposta("invalido", false, false, false));
            
        }
        console.log(prop);
        return prop[0];
    }

}

function ColocarProposta(tipo: String, mandante: boolean, visitante: boolean, empate: boolean){
    let proposta: any = {tipo,mandante,visitante,empate};
    return proposta;
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
