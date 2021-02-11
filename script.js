const hit_sound= new Audio();
hit_sound.src='./sound/hit.wav';
const pulo_sound = new Audio();
pulo_sound.src='./sound/pulo.wav';
const sprites = new Image();

sprites.src ='./sprites.png';

let frames =0;
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


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
///chão
function criaChao(){
const chao ={
    spriteX:0,
    spriteY:610,
    largura:224,
    altura:112,
    x:0,
    y:canvas.height -112,
    atualiza(){
        const movimentoChao =1;
        const repete = chao.largura / 2;
        const movimentacao = chao.x - movimentoChao;

        chao.x =movimentacao % repete;
    },
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
return chao;
}

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
            if(colidir(flappyBird,globais.chao)){
                hit_sound.play()
                setTimeout(mudaTela(telas.inicio),500);;
                
                return;
            }
            
    
            flappyBird.velocidade = flappyBird.velocidade+flappyBird.gravidade;
            flappyBird.y = flappyBird.y+flappyBird.velocidade;
        },
        movimentos:[
            {spriteX:0,spriteY:0},//asa parte 1
            {spriteX:0,spriteY:26},//asa parte 2
            {spriteX:0,spriteY:52},//asa parte 3
            {spriteX:0,spriteY:26}//asa parte 2
        ],
        frameAtual:0,
        atualizaFrame(){
            const intervaloFrame = 10;
            const passouIntervalo = frames % intervaloFrame === 0;
        
        if(passouIntervalo){
            const baseIncrementa =1 ;
            const incremento= baseIncrementa + flappyBird.frameAtual;
            const baseRepetir = flappyBird.movimentos.length;
            flappyBird.frameAtual = incremento % baseRepetir;
        }
        },
        desenha(){
            flappyBird.atualizaFrame();
            const{spriteX,spriteY} = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage(
                sprites,
                spriteX,spriteY,
                flappyBird.largura,flappyBird.altura,
                flappyBird.x,flappyBird.y,
                flappyBird.largura,flappyBird.altura,
            );
        },
        voa(){
            flappyBird.velocidade = -flappyBird.voo ;
            pulo_sound.play(); 
        }
    };
    return flappyBird;  
}

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

//mensagem de Game Over
const gameOver ={
    sX:134,
    sY:153,
    w:226,
    h:200,
    x:(canvas.width/2) -226 /2,
    y:50,
    desenha(){
        contexto.drawImage(
            sprites,
            gameOver.sX,gameOver.sY,
            gameOver.w,gameOver.h,
            gameOver.x,gameOver.y,
            gameOver.w,gameOver.h
        );
    }
}

// criando Canos
function criaCanos(){
    const canos ={
        largura:52,
        altura:400,
        chao:{
            spriteX:0,
            spriteY:169,
        },
        ceu:{
            spriteX:52,
            spriteY:169,
        },
        espaco:80,
        desenha(){
            canos.pares.forEach(function(par){
                const yRandom = par.y;
                const espacoDosCanos = 90;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                // cano do céu;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX,canos.ceu.spriteY,
                    canos.largura,canos.altura,
                    canoCeuX,canoCeuY,
                    canos.largura,canos.altura
                );

                //cano do chao
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacoDosCanos+yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX,canos.chao.spriteY,
                    canos.largura,canos.altura,
                    canoChaoX,canoChaoY,
                    canos.largura,canos.altura
                );

                par.canoCeu={
                    x:canoCeuX,
                    y:canos.altura+canoCeuY
                }
                par.canoChao={
                    x:canoChaoX,
                    y:canoChaoY
                }
            })
        },
        colidirComBird(par){
            const cabecaDoFlappy = globais.flappyBird.y;
            const peDoFlappy = globais.flappyBird.y+globais.flappyBird.altura;

            if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
                if(cabecaDoFlappy <= par.canoCeu.y){
                    return true;
                }

                if(peDoFlappy >= par.canoChao.y){
                    return true;
                }
            }
            return false;
        },
        pares:[],
        atualiza(){
            const passou100Frames = frames % 100 === 0;
            if(passou100Frames){
                canos.pares.push({
                    x:canvas.width,
                    y:-150 *(Math.random()+1),
                });
            }

            canos.pares.forEach(function(par){
                par.x = par.x -2;

                if(canos.colidirComBird(par)){
                    hit_sound.play();
                    mudaTela(telas.gameOver);
                }

                if(par.x + canos.largura <= 0){
                    canos.pares.shift;
                }
            });
        }
    }
    return canos;
}

//Criando placar
function criarPlacar(){
    const placar={
        pontuacao:0,
        desenha(){
            contexto.font ='35px "VT323"';
            contexto.textAlign= 'right';
            contexto.fillStyle ='white';
            contexto.fillText(`${placar.pontuacao}`,canvas.width -10,35);
        },
        atualiza(){
            const intervaloFrame = 20;
            const passouIntervalo = frames % intervaloFrame === 0;

            if(passouIntervalo){
                placar.pontuacao = placar.pontuacao +1;
            }
        }
    }
    return placar;
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
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha(){
        planoDeFundo.desenha();
        
        globais.flappyBird.desenha();
        
        globais.chao.desenha();
        mensagem.desenha();
        },
        click(){
            mudaTela(telas.jogo);
        },
        atualiza(){
            globais.chao.atualiza();
        }
    }
};

telas.jogo = {
    iniciar(){
        globais.placar = criarPlacar();
    },
    desenha(){
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click(){
        globais.flappyBird.voa();
    },
    atualiza(){
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
    globais.placar.atualiza();    
    }
}

telas.gameOver={
    desenha(){
        gameOver.desenha();
    },
    atualiza(){

    },
    click(){
        mudaTela(telas.inicio);
    }
}

//loop do jogo

function loop(){
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames +1;
    requestAnimationFrame(loop);
}

window.addEventListener('click',function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaTela(telas.inicio)
loop();