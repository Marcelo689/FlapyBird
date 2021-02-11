const hit_sound= new Audio();
hit_sound.src='./sound/hit.wav';

const sprites = new Image();

sprites.src ='./sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

///chão
const chao ={
    spriteX:0,
    spriteY:610,
    largura:224,
    altura:112,
    x:0,
    y:canvas.height -112,
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX,chao.spriteY,//posicao inicial da imagem
            chao.largura,chao.altura,//corte de altura e lagura da imagem
            chao.x,chao.y,//posição da imagem no canvas
            chao.largura,chao.altura//tamanho da imagem no canvas
            );
    
        contexto.drawImage(
                sprites,
                chao.spriteX,chao.spriteY,//posicao inicial da imagem
                chao.largura,chao.altura,//corte de altura e lagura da imagem
                (chao.x+chao.largura),chao.y,//posição da imagem no canvas
                chao.largura,chao.altura//tamanho da imagem no canvas
                );
        },
};

// Plano de fundo

const planoDeFundo ={
    spriteX:390,
    spriteY:0,
    largura:275,
    altura:204,
    x:0,
    y:canvas.height-204,
    desenha(){
        contexto.fillStyle= '#70c5ce';
        contexto.fillRect(0,0,canvas.width,canvas.height);


        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY,
            planoDeFundo.largura,planoDeFundo.altura,
            planoDeFundo.x,planoDeFundo.y,
            planoDeFundo.largura,planoDeFundo.altura,
            );
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY,
            planoDeFundo.largura,planoDeFundo.altura,
            planoDeFundo.largura,planoDeFundo.y,
            planoDeFundo.largura,planoDeFundo.altura,
            ); 
    },
};

// mensagem de pronto
const mensagem ={
    sX:134,
    sY:0,
    w:174,
    h:152,
    x:(canvas.width / 2) - 174 / 2,
    y:50,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagem.sX,mensagem.sY,
            mensagem.w,mensagem.h,
            mensagem.x,mensagem.y,
            mensagem.w,mensagem.h,
        );
    },
};
//colisoes
function colidir(flappyBird,chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){
        return true;
    }else{
        return false;
    }
}
// flappyBird no inicio do jogo
function criaFlappyBird(){
    const flappyBird ={
        spriteX:0,
        spriteY:0,
        largura:33,
        altura:24,
        x:10,
        y:50,
        voo:4.6,
        gravidade:0.25,
        velocidade:0,
        atualiza(){
            if(colidir(flappyBird,chao)){
                hit_sound.play()
                setTimeout(mudaTela(telas.inicio),500);;
                
                return;
            }
            
    
            flappyBird.velocidade = flappyBird.velocidade+flappyBird.gravidade;
            flappyBird.y = flappyBird.y+flappyBird.velocidade;
        },
        desenha(){
        contexto.drawImage(sprites,
        flappyBird.spriteX,flappyBird.spriteY,// sx, sy posiçoes do sprite
        flappyBird.largura,flappyBird.altura,//sWidth, sHeight, tamanhos do recorte na imagem sprite
        flappyBird.x,flappyBird.y, //dx, dy, posição dentro do canvas
        flappyBird.largura,flappyBird.altura//dWidth, dHeight
                );
        },
        voa(){
        flappyBird.velocidade = -flappyBird.voo ;
        }
    };
    return flappyBird;  
}

//passarinho
const flappyBird ={
    spriteX:0,
    spriteY:0,
    largura:33,
    altura:24,
    x:10,
    y:50,
    voo:4.6,
    gravidade:0.25,
    velocidade:0,
    atualiza(){
        if(colidir(flappyBird,chao)){
            mudaTela(telas.inicio);
            return;
        }
        

        flappyBird.velocidade = flappyBird.velocidade+flappyBird.gravidade;
        flappyBird.y = flappyBird.y+flappyBird.velocidade;
    },
    desenha(){
    contexto.drawImage(sprites,
    flappyBird.spriteX,flappyBird.spriteY,// sx, sy posiçoes do sprite
    flappyBird.largura,flappyBird.altura,//sWidth, sHeight, tamanhos do recorte na imagem sprite
    flappyBird.x,flappyBird.y, //dx, dy, posição dentro do canvas
    flappyBird.largura,flappyBird.altura//dWidth, dHeight
            );
    },
    voa(){
    flappyBird.velocidade = -flappyBird.voo ;
    }
};


//globais
const globais= {};

//Telas de jogo

let telaAtiva ={};
    function mudaTela(novaTela){
        telaAtiva = novaTela;
    if(telaAtiva.iniciar){
        telaAtiva.iniciar();
    }
};

const telas = {
    inicio:{
        iniciar(){
            globais.flappyBird =criaFlappyBird();
        },
        desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
        mensagem.desenha();
        },
        click(){
            mudaTela(telas.jogo);
        },
        atualiza(){

        }
    }
};

telas.jogo = {
    desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
    },
    click(){
        globais.flappyBird.voa();
    },
    atualiza(){
    globais.flappyBird.atualiza();    
    }
}

//loop do jogo

function loop(){
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop);
}

window.addEventListener('click',function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});
window.addEventListener('click',function(){
    if(flappyBird.velocidade>0){
    telaAtiva.click();
    }
});

mudaTela(telas.inicio)
loop();